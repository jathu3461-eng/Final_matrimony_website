import assert from 'node:assert/strict';
import test from 'node:test';
import {
  MAX_INTRO_VIDEO_DURATION_SECONDS,
  MIN_INTRO_VIDEO_DURATION_SECONDS,
  getIntroVideoDurationError,
} from './introVideoDuration.ts';

test('rejects durations below 30 seconds without rounding them up', () => {
  assert.equal(getIntroVideoDurationError(29), 'Video must be at least 30 seconds long.');
  assert.equal(getIntroVideoDurationError(29.9), 'Video must be at least 30 seconds long.');
});

test('accepts exact and fractional durations within 30 seconds through 2 minutes', () => {
  for (const duration of [30, 45, 67, 119, 119.9, MAX_INTRO_VIDEO_DURATION_SECONDS]) {
    assert.equal(getIntroVideoDurationError(duration), null, `${duration} seconds should be valid`);
  }
});

test('rejects durations above two minutes without rounding them down', () => {
  assert.equal(getIntroVideoDurationError(120.1), 'Video must not exceed 2 minutes.');
  assert.equal(getIntroVideoDurationError(121), 'Video must not exceed 2 minutes.');
});

test('uses the requested duration boundaries', () => {
  assert.equal(MIN_INTRO_VIDEO_DURATION_SECONDS, 30);
  assert.equal(MAX_INTRO_VIDEO_DURATION_SECONDS, 120);
});
