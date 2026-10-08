export const MIN_INTRO_VIDEO_DURATION_SECONDS = 30;
export const MAX_INTRO_VIDEO_DURATION_SECONDS = 120;

export function getIntroVideoDurationError(durationSeconds: number): string | null {
  if (!Number.isFinite(durationSeconds)) return 'Unable to read video duration.';
  if (durationSeconds < MIN_INTRO_VIDEO_DURATION_SECONDS) {
    return 'Video must be at least 30 seconds long.';
  }
  if (durationSeconds > MAX_INTRO_VIDEO_DURATION_SECONDS) {
    return 'Video must not exceed 2 minutes.';
  }
  return null;
}

export function formatIntroVideoDuration(durationSeconds: number): string {
  const wholeSeconds = Math.floor(Math.max(0, durationSeconds));
  const minutes = Math.floor(wholeSeconds / 60);
  const seconds = wholeSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
