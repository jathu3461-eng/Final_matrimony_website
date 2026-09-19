import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, X, Play, RefreshCcw, Check } from 'lucide-react';
import Button from './Button';

export default function IntroVideoStep({ 
  hasExisting, 
  onVideoSelected, 
  error 
}) {
  const [mode, setMode] = useState(null); // 'record', 'preview', null
  const [stream, setStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [duration, setDuration] = useState(0); // in seconds
  const [previewUrl, setPreviewUrl] = useState(null);
  
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
      alert('Camera access denied or not available. Please use "Choose from device".');
    }
  };

  const startRecording = () => {
    setRecording(true);
    setRecordedChunks([]);
    setDuration(0);
    
    // Check supported types
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
      if (e.data.size > 0) {
        setRecordedChunks((prev) => [...prev, e.data]);
      }
    };
    
    mediaRecorder.onstop = () => {
      // It takes a tick for chunks to flush
      setTimeout(() => {
        setMode('preview');
      }, 100);
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start(1000); // chunk every second

    timerRef.current = setInterval(() => {
      setDuration(prev => {
        if (prev >= 179) {
          stopRecording(); // Auto stop at 3 min
          return 180;
        }
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

  // Convert chunks to a File on transition to preview
  useEffect(() => {
    if (mode === 'preview' && recordedChunks.length > 0 && !previewUrl) {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      
      const file = new File([blob], 'intro-video.webm', { type: 'video/webm' });
      onVideoSelected(file, duration);
    }
  }, [mode, recordedChunks]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      alert('Video file is too large (max 50MB). Please choose a smaller video.');
      return;
    }

    // Check duration by loading it into a video element
    const url = URL.createObjectURL(file);
    const tempVideo = document.createElement('video');
    tempVideo.preload = 'metadata';
    tempVideo.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      const vidDuration = Math.round(tempVideo.duration);
      
      if (vidDuration < 60) {
        alert('Your introduction video must be at least 1 minute long.');
        return;
      }
      if (vidDuration > 180) {
        alert('Your introduction video must not exceed 3 minutes.');
        return;
      }
      
      setPreviewUrl(URL.createObjectURL(file));
      setDuration(vidDuration);
      setMode('preview');
      onVideoSelected(file, vidDuration);
    };
    tempVideo.src = url;
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const cancelAndReset = () => {
    stopCamera();
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setRecordedChunks([]);
    setDuration(0);
    setMode(null);
    onVideoSelected(null, 0);
  };

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-6 mb-6">
        <div className="flex gap-4 mb-4">
          <div className="w-10 h-10 rounded-full grad-primary flex items-center justify-center text-white shrink-0">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--ink)]">Introduction Video</h3>
            <p className="text-sm text-[var(--ink-soft)] mt-1">
              Please upload a short introduction video between <strong>1 and 3 minutes</strong>.
            </p>
          </div>
        </div>

        <div className="bg-[var(--warning-soft)] border border-[var(--warning-strong)] p-4 rounded-xl flex items-start gap-3 mb-6">
          <span className="text-xl">🔒</span>
          <p className="text-[13px] text-[var(--warning-strong)] leading-relaxed font-medium">
            This video will be reviewed only by our administrators for verification and will <strong>NOT</strong> be visible to other users. It is completely private.
          </p>
        </div>

        {error && (
          <p className="text-[13px] font-semibold text-[var(--error)] mb-4" role="alert">
            {error}
          </p>
        )}

        {/* DEFAULT VIEW */}
        {!mode && (
          <div className="space-y-4">
            {hasExisting && (
              <div className="bg-[var(--success-soft)] text-[var(--success)] p-4 rounded-xl flex justify-between items-center mb-6 border border-[var(--success)]/20">
                <span className="font-bold flex items-center gap-2"><Play className="w-4 h-4" /> Valid video already uploaded</span>
                <span className="text-xs">You can replace it below</span>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[var(--primary)] bg-[var(--primary-soft)] rounded-xl cursor-pointer hover:bg-[var(--primary)] hover:bg-opacity-10 transition-colors">
                <Upload className="w-8 h-8 text-[var(--primary-strong)] mb-2" />
                <span className="font-bold text-[var(--primary-strong)]">Choose from device</span>
                <span className="text-[11px] text-[var(--primary-strong)] opacity-80 mt-1">MP4, MOV up to 50MB</span>
                <input 
                  type="file" 
                  accept="video/mp4,video/quicktime,video/webm" 
                  className="hidden" 
                  onChange={handleFileChange} 
                />
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

        {/* RECORDING VIEW */}
        {mode === 'record' && (
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-lg aspect-video bg-black rounded-xl overflow-hidden mb-4">
              <video 
                ref={videoRef} 
                className="w-full h-full object-cover" 
                muted 
                playsInline 
              />
              {recording && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  {formatTime(duration)} / 03:00
                </div>
              )}
            </div>

            <div className="flex gap-4">
              {!recording ? (
                <>
                  <Button type="button" onClick={startRecording} variant="primary">
                    Start Recording
                  </Button>
                  <Button type="button" onClick={cancelAndReset} variant="secondary">
                    Cancel
                  </Button>
                </>
              ) : (
                <Button type="button" onClick={stopRecording} className="bg-red-500 hover:bg-red-600 text-white">
                  Stop Recording
                </Button>
              )}
            </div>
            
            {recording && duration < 60 && (
              <p className="text-[12px] text-[var(--ink-faint)] mt-3">
                Please record for at least 1 minute. ({60 - duration}s remaining)
              </p>
            )}
          </div>
        )}

        {/* PREVIEW VIEW */}
        {mode === 'preview' && (
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-lg aspect-video bg-black rounded-xl overflow-hidden mb-4 border border-[var(--border)]">
              <video 
                src={previewUrl} 
                className="w-full h-full object-contain" 
                controls 
                playsInline 
              />
            </div>
            
            <div className="w-full max-w-lg bg-[var(--surface)] border border-[var(--border)] p-4 rounded-xl flex items-center justify-between mb-6">
              <div>
                <p className="font-bold text-sm text-[var(--ink)]">Video Preview</p>
                <p className="text-xs text-[var(--ink-faint)] mt-0.5">Duration: {formatTime(duration)}</p>
              </div>
              <div className="flex items-center gap-1.5">
                {duration >= 60 && duration <= 180 ? (
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

            <div className="flex gap-4">
              <Button type="button" onClick={cancelAndReset} variant="secondary">
                <RefreshCcw className="w-4 h-4 mr-2" />
                Replace Video
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
