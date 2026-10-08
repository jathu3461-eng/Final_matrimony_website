import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, X, Play, RefreshCcw, Check, Loader2 } from 'lucide-react';
import Button from './Button';
import api from '../../api';

const MIN_INTRO_VIDEO_SIZE = 1 * 1024 * 1024;
const MAX_INTRO_VIDEO_SIZE = 3 * 1024 * 1024 * 1024;
const VIDEO_EXTENSIONS = new Set([
  '.3g2', '.3gp', '.asf', '.avi', '.divx', '.f4v', '.flv', '.m2t', '.m2ts', '.m2v', '.m4v',
  '.mkv', '.mod', '.mov', '.mp4', '.mpe', '.mpeg', '.mpg', '.mts', '.ogv', '.ts', '.vob',
  '.webm', '.wmv', '.xvid',
]);

const isVideoFile = (file) => VIDEO_EXTENSIONS.has(`.${file.name.split('.').pop().toLowerCase()}`)
  && !/^(text\/|image\/|application\/(x-msdownload|x-executable|x-sh|x-bat|javascript|x-javascript|x-httpd-php))/i.test(file.type);

function getVideoSignatureFormat(header) {
  const ascii = (start, end) => String.fromCharCode(...header.slice(start, end));
  if (header.length >= 12 && ascii(4, 8) === 'ftyp') return 'isobmff';
  if (header.length >= 12 && ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'AVI ') return 'avi';
  if (header.length >= 4 && header[0] === 0x1a && header[1] === 0x45 && header[2] === 0xdf && header[3] === 0xa3) {
    const marker = ascii(0, header.length).toLowerCase();
    return marker.includes('webm') ? 'webm' : marker.includes('matroska') ? 'matroska' : 'ebml';
  }
  if (header.length >= 3 && ascii(0, 3) === 'FLV') return 'flv';
  if (header.length >= 16 && Array.from(header.slice(0, 16)).map((byte) => byte.toString(16).padStart(2, '0')).join('') === '3026b2758e66cf11a6d900aa0062ce6c') return 'asf';
  if (header.length >= 4 && header[0] === 0 && header[1] === 0 && header[2] === 1 && [0xb3, 0xba, 0xb8].includes(header[3])) return 'mpeg';
  return null;
}

function isSignatureCompatible(extension, format) {
  if (format === 'isobmff') return ['.mp4', '.mov', '.m4v', '.3gp', '.3g2'].includes(extension);
  if (format === 'avi') return ['.avi', '.divx', '.xvid'].includes(extension);
  if (format === 'matroska' || format === 'ebml') return ['.mkv', '.webm'].includes(extension);
  if (format === 'webm') return extension === '.webm';
  if (format === 'flv') return extension === '.flv';
  if (format === 'asf') return ['.asf', '.wmv'].includes(extension);
  if (format === 'mpeg') return ['.mpeg', '.mpg', '.mpe', '.m2v', '.vob', '.mod'].includes(extension);
  return false;
}

function formatBytes(bytes) {
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(1)} GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

export default function IntroVideoStep({ 
  hasExisting, 
  onVideoSelected,
  onSkip,
  isSkipped,
  error 
}) {
  const [mode, setMode] = useState(null); // 'record', 'preview', null
  const [stream, setStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [duration, setDuration] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [cameraError, setCameraError] = useState(null); // null | 'denied' | 'unavailable' | 'https'
  
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadBytes, setUploadBytes] = useState(0);
  const [uploadId, setUploadId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [tempKey, setTempKey] = useState(null);

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      stopCamera();
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, []);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (timerRef.current) clearInterval(timerRef.current);
    setRecording(false);
  };

  const startCamera = async () => {
    setCameraError(null);

    // Camera won't work on non-secure HTTP origins
    if (location.protocol === 'http:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
      setCameraError('https');
      return;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('unavailable');
      return;
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      setMode('record');
      setRecordedChunks([]);
      setDuration(0);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
    } catch (err) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('denied');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError('unavailable');
      } else {
        setCameraError('unavailable');
      }
    }
  };

  const startRecording = () => {
    setRecording(true);
    setRecordedChunks([]);
    setDuration(0);
    
    let options = { mimeType: 'video/webm;codecs=vp9,opus' };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      options = { mimeType: 'video/webm;codecs=vp8,opus' };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options = { mimeType: 'video/webm' };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          options = { mimeType: '' };
        }
      }
    }

    const mediaRecorder = new MediaRecorder(stream, options);
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) setRecordedChunks((prev) => [...prev, e.data]);
    };
    mediaRecorder.onstop = () => setTimeout(() => setMode('preview'), 100);
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start(1000);

    timerRef.current = setInterval(() => {
      setDuration(prev => {
        if (prev >= 179) { stopRecording(); return 180; }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    stopCamera();
  };

  const uploadVideoFile = async (file, durationVal) => {
    if (!Number.isFinite(durationVal)) {
      setUploadError('Unable to read video duration.');
      return;
    }
    if (durationVal < 30) {
      setUploadError('Video must be at least 30 seconds long.');
      return;
    }
    if (durationVal > 120) {
      setUploadError('Video must not exceed 2 minutes.');
      return;
    }
    if (file.size < MIN_INTRO_VIDEO_SIZE) {
      setUploadError('Video must be at least 1 MB.');
      return;
    }
    if (file.size > MAX_INTRO_VIDEO_SIZE) {
      setUploadError('Video size must not exceed 3 GB.');
      return;
    }
    setUploading(true);
    setUploadProgress(0);
    setUploadBytes(0);
    setUploadError('');
    setTempKey(null);
    let currentUploadId = uploadId;
    
    try {
      const CHUNK_SIZE = 512 * 1024;
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
      const fileName = file.name || 'video.mp4';
      const mimeType = file.type || '';
      if (!currentUploadId) {
        currentUploadId = window.crypto.randomUUID();
        setUploadId(currentUploadId);
      }
      const metadata = { uploadId: currentUploadId, totalChunks, fileName, fileSize: file.size, mimeType };
      let receivedChunks = new Set();
      try {
        const status = await api.get(`/profiles/upload-status/${currentUploadId}`, { params: metadata });
        if (status.data.completedKey) {
          setTempKey(status.data.completedKey);
          setUploadId(null);
          setUploadProgress(100);
          setUploadBytes(file.size);
          setUploading(false);
          onVideoSelected(null, durationVal, status.data.completedKey);
          return;
        }
        receivedChunks = new Set(status.data.receivedChunks);
      } catch (err) {
        if (err.response?.status !== 404) throw err;
        currentUploadId = window.crypto.randomUUID();
        setUploadId(currentUploadId);
        metadata.uploadId = currentUploadId;
      }

      let uploadedBytes = Array.from(receivedChunks).reduce((sum, index) => sum + Math.min(CHUNK_SIZE, file.size - index * CHUNK_SIZE), 0);
      const reportProgress = () => {
        setUploadBytes(uploadedBytes);
        setUploadProgress(Math.min(100, Math.floor((uploadedBytes / file.size) * 100)));
      };
      reportProgress();

      for (let i = 0; i < totalChunks; i++) {
        if (receivedChunks.has(i)) continue;
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);
        let chunkUploaded = false;
        for (let attempt = 0; attempt < 3 && !chunkUploaded; attempt++) {
          const fd = new FormData();
          fd.append('chunk', chunk, fileName);
          try {
            await api.post('/profiles/upload-chunk', fd, {
              params: { ...metadata, chunkIndex: i },
              timeout: 120000,
              onUploadProgress: (event) => {
                const inFlight = Math.min(end - start, event.loaded);
                setUploadProgress(Math.min(100, Math.floor(((uploadedBytes + inFlight) / file.size) * 100)));
              },
            });
            uploadedBytes += end - start;
            chunkUploaded = true;
            reportProgress();
          } catch (err) {
            const status = err.response?.status;
            const retryable = !status || status === 408 || status === 429 || status >= 500;
            if (!retryable || attempt === 2) throw err;
            await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
          }
        }
      }

      const response = await api.post('/profiles/upload-complete', metadata, { timeout: 30 * 60 * 1000 });
      setTempKey(response.data.temp_video_key);
      setUploadId(null);
      setUploading(false);
      onVideoSelected(null, durationVal, response.data.temp_video_key);
    } catch (err) {
      console.error(err);
      const status = err.response?.status;
      const code = err.response?.data?.code;
      const resumable = !status || status === 408 || status === 429 || status >= 500 || code === 'VIDEO_CHUNK_MISSING' || code === 'VIDEO_SIZE_MISMATCH';
      if (!resumable && currentUploadId) {
        await api.delete(`/profiles/upload-chunks/${currentUploadId}`).catch(() => {});
        setUploadId(null);
      }
      const backendError = err.response?.data?.error;
      setUploadError(backendError || (status === 401
        ? 'Your session has expired. Please log in again.'
        : !status
          ? 'Upload interrupted. Check your connection and retry.'
          : 'Unable to upload the video right now. Please try again.'));
      setUploading(false);
      onVideoSelected(null, 0, null);
    }
  };

  useEffect(() => {
    if (mode === 'preview' && recordedChunks.length > 0 && !previewUrl) {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      const file = new File([blob], 'intro-video.webm', { type: 'video/webm' });
      setSelectedFile(file);
      uploadVideoFile(file, duration);
    }
  }, [mode, recordedChunks]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size < MIN_INTRO_VIDEO_SIZE) { alert('Video must be at least 1 MB.'); return; }
    if (file.size > MAX_INTRO_VIDEO_SIZE) { alert('Video size must not exceed 3 GB.'); return; }
    if (!isVideoFile(file)) { alert('This video format is not supported.'); return; }
    setSelectedFile(file);
    const signature = new Uint8Array(await file.slice(0, 4096).arrayBuffer());
    const extension = `.${file.name.split('.').pop().toLowerCase()}`;
    if (!isSignatureCompatible(extension, getVideoSignatureFormat(signature))) {
      alert('This video format is not supported.');
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setMode('preview');
    setDuration(0);
    let uploadStarted = false;
    const startUpload = (durationSeconds) => {
      if (uploadStarted) return;
      uploadStarted = true;
      clearTimeout(uploadFallback);
      setDuration(durationSeconds);
      uploadVideoFile(file, durationSeconds);
    };
    const uploadFallback = setTimeout(() => startUpload(0), 3000);
    const tempVideo = document.createElement('video');
    tempVideo.preload = 'metadata';
    tempVideo.onloadedmetadata = () => {
      const videoDuration = tempVideo.duration;
      if (!Number.isFinite(videoDuration)) {
        uploadStarted = true;
        clearTimeout(uploadFallback);
        setUploadError('Unable to read video duration.');
        return;
      }
      if (videoDuration < 30) {
        uploadStarted = true;
        clearTimeout(uploadFallback);
        setUploadError('Video must be at least 30 seconds long.');
        return;
      }
      if (videoDuration > 120) {
        uploadStarted = true;
        clearTimeout(uploadFallback);
        setUploadError('Video must not exceed 2 minutes.');
        return;
      }
      startUpload(videoDuration);
    };
    tempVideo.onerror = () => startUpload(0);
    tempVideo.src = url;
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const cancelAndReset = () => {
    if (uploadId) api.delete(`/profiles/upload-chunks/${uploadId}`).catch(() => {});
    stopCamera();
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setMode(null);
    setRecordedChunks([]);
    setDuration(0);
    setTempKey(null);
    setUploadProgress(0);
    setUploadBytes(0);
    setUploading(false);
    setUploadId(null);
    setSelectedFile(null);
    setUploadError('');
    onVideoSelected(null, 0, null);
  };

  const CAMERA_ERROR_INFO = {
    denied: {
      icon: '🔐',
      title: 'Camera Access Blocked',
      desc: 'Your browser has blocked camera access. Follow these steps to enable it:',
      steps: [
        'Click the 🔒 lock icon (or camera icon) in the address bar at the top.',
        'Find "Camera" and "Microphone" in the permissions list.',
        'Change both from "Block" to "Allow".',
        'Refresh this page and try again.',
      ],
      retry: true,
    },
    unavailable: {
      icon: '📷',
      title: 'No Camera Found',
      desc: 'No camera was detected on your device. Please upload a pre-recorded video instead.',
      steps: [],
      retry: false,
    },
    https: {
      icon: '🔒',
      title: 'Secure Connection Required',
      desc: 'Camera recording requires a secure HTTPS connection. Please upload a pre-recorded video instead.',
      steps: [],
      retry: false,
    },
  };

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-6 mb-6">

        {/* Header */}
        <div className="flex gap-4 mb-4">
          <div className="w-10 h-10 rounded-full grad-primary flex items-center justify-center text-white shrink-0">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--ink)]">Introduction Video</h3>
            <p className="text-sm text-[var(--ink-soft)] mt-1">
              Please upload a short introduction video between <strong>30 seconds and 2 minutes</strong>.
            </p>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-[var(--warning-soft)] border border-[var(--warning-strong)] p-4 rounded-xl flex items-start gap-3 mb-6">
          <span className="text-xl">🔒</span>
          <p className="text-[13px] text-[var(--warning-strong)] leading-relaxed font-medium">
            This video will be reviewed only by our administrators for verification and will <strong>NOT</strong> be visible to other users. It is completely private.
          </p>
        </div>

        {error && (
          <p className="text-[13px] font-semibold text-[var(--error)] mb-4" role="alert">{error}</p>
        )}

        {/* ── CAMERA ERROR STATE ── */}
        {cameraError && (() => {
          const info = CAMERA_ERROR_INFO[cameraError];
          return (
            <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-5 mb-4">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl shrink-0">{info.icon}</span>
                <div>
                  <p className="font-bold text-amber-800 text-sm">{info.title}</p>
                  <p className="text-amber-700 text-[13px] mt-1 leading-relaxed">{info.desc}</p>
                </div>
              </div>

              {info.steps.length > 0 && (
                <ol className="space-y-2 mt-3 ml-9">
                  {info.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] text-amber-800">
                      <span className="w-5 h-5 rounded-full bg-amber-300 text-amber-900 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              )}

              <div className="flex flex-wrap gap-3 mt-4 ml-9">
                {info.retry && (
                  <button
                    type="button"
                    onClick={() => { setCameraError(null); startCamera(); }}
                    className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition-colors"
                  >
                    <Camera className="w-4 h-4" /> Try Camera Again
                  </button>
                )}
                <label className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl bg-[var(--primary)] text-white cursor-pointer hover:opacity-90 transition-opacity">
                  <Upload className="w-4 h-4" /> Upload Video Instead
                  <input
                    type="file"
                    accept="video/*,.3gp,.m4v,.avi,.mkv,.webm,.wmv,.flv,.mpeg,.mpg,.mov,.mp4"
                    className="hidden"
                    onChange={(e) => { setCameraError(null); handleFileChange(e); }}
                  />
                </label>
              </div>
            </div>
          );
        })()}

        {/* ── DEFAULT VIEW ── */}
        {!mode && !cameraError && (
          <div className="space-y-4">
            {hasExisting && (
              <div className="bg-[var(--success-soft)] text-[var(--success)] p-4 rounded-xl flex justify-between items-center mb-6 border border-[var(--success)]/20">
                <span className="font-bold flex items-center gap-2"><Play className="w-4 h-4" /> Valid video already uploaded</span>
                <span className="text-xs">You can replace it below</span>
              </div>
            )}
            {isSkipped && (
              <div className="bg-amber-50 text-amber-700 p-4 rounded-xl flex justify-between items-center mb-2 border border-amber-200">
                <span className="font-bold flex items-center gap-2">⚠️ Video skipped — you can still upload one</span>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[var(--primary)] bg-[var(--primary-soft)] rounded-xl cursor-pointer hover:bg-[var(--primary)] hover:bg-opacity-10 transition-colors">
                <Upload className="w-8 h-8 text-[var(--primary-strong)] mb-2" />
                <span className="font-bold text-[var(--primary-strong)]">Choose from device</span>
                <span className="text-[11px] text-[var(--primary-strong)] opacity-80 mt-1">Supported video formats, 1 MB–3 GB</span>
                <input type="file" accept="video/*,.3gp,.m4v,.avi,.mkv,.webm,.wmv,.flv,.mpeg,.mpg,.mov,.mp4" className="hidden" onChange={handleFileChange} />
              </label>

              <button
                type="button"
                onClick={startCamera}
                className="flex flex-col items-center justify-center p-6 border-2 border-[var(--border-strong)] rounded-xl bg-[var(--surface)] hover:border-[var(--primary)] transition-colors"
              >
                <Camera className="w-8 h-8 text-[var(--ink-soft)] mb-2" />
                <span className="font-bold text-[var(--ink)]">Record a Video</span>
                <span className="text-[11px] text-[var(--ink-faint)] mt-1">Use your webcam</span>
              </button>
            </div>
          </div>
        )}

        {/* ── RECORDING VIEW ── */}
        {mode === 'record' && (
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-lg aspect-video bg-black rounded-xl overflow-hidden mb-4">
              <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
              {recording && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  {formatTime(duration)} / 02:00
                </div>
              )}
            </div>
            <div className="flex gap-4">
              {!recording ? (
                <>
                  <Button type="button" onClick={startRecording} variant="primary">Start Recording</Button>
                  <Button type="button" onClick={cancelAndReset} variant="secondary">Cancel</Button>
                </>
              ) : (
                <Button type="button" onClick={stopRecording} className="bg-red-500 hover:bg-red-600 text-white">Stop Recording</Button>
              )}
            </div>
            {recording && duration < 30 && (
              <p className="text-[12px] text-[var(--ink-faint)] mt-3">
                Please record for at least 30 seconds. ({30 - duration}s remaining)
              </p>
            )}
          </div>
        )}

        {/* ── PREVIEW VIEW ── */}
        {mode === 'preview' && (
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-lg aspect-video bg-black rounded-xl overflow-hidden mb-4 border border-[var(--border)]">
              <video src={previewUrl} className="w-full h-full object-contain" controls playsInline />
              
              {uploading && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-6 z-10">
                  <Loader2 className="w-10 h-10 text-[var(--primary)] animate-spin mb-4" />
                  <p className="text-white font-bold mb-2">Uploading Video...</p>
                  <div className="w-full max-w-xs bg-slate-700 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-[var(--primary)] font-bold mt-2 text-lg">{uploadProgress}%</p>
                  <p className="text-white text-xs mt-1">{formatBytes(uploadBytes)} / {formatBytes(selectedFile?.size || 0)}</p>
                </div>
              )}
            </div>
            
            <div className="w-full max-w-lg bg-[var(--surface)] border border-[var(--border)] p-4 rounded-xl flex items-center justify-between mb-2">
              <div>
                <p className="font-bold text-sm text-[var(--ink)]">Video Preview</p>
                <p className="text-xs text-[var(--ink-faint)] mt-0.5">Duration: {formatTime(duration)}</p>
              </div>
              <div className="flex items-center gap-1.5">
                {duration >= 30 && duration <= 120 ? (
                  <span className="text-xs font-bold text-[var(--success)] flex items-center gap-1 bg-[var(--success-soft)] px-2 py-1 rounded-md">
                    <Check className="w-3.5 h-3.5" /> Valid
                  </span>
                ) : (
                  <span className="text-xs font-bold text-[var(--error)] flex items-center gap-1 bg-[var(--error-soft)] px-2 py-1 rounded-md">
                    <X className="w-3.5 h-3.5" /> Invalid Duration
                  </span>
                )}
              </div>
            </div>
            
            {uploadError && (
              <div className="mt-2 mb-4 p-3 w-full max-w-lg bg-red-50 text-red-600 text-sm font-semibold rounded-lg border border-red-200 text-center">
                {uploadError}
              </div>
            )}

            {uploadError && selectedFile && !uploading && (
              <Button type="button" onClick={() => uploadVideoFile(selectedFile, duration)} variant="primary">
                Retry upload
              </Button>
            )}
            
            <div className="flex gap-4">
              <Button type="button" onClick={cancelAndReset} variant="secondary" disabled={uploading}>
                <RefreshCcw className="w-4 h-4 mr-2" /> Replace Video
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
