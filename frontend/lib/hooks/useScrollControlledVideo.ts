"use client";

import { useCallback, useEffect, useRef } from "react";

const SCROLL_STOP_DELAY_MS = 150;
const SEEK_THRESHOLD = 0.04;

function getMaxScroll() {
  return Math.max(
    document.documentElement.scrollHeight - window.innerHeight,
    1,
  );
}

function getTargetTime(
  scrollY: number,
  anchorScrollY: number,
  anchorVideoTime: number,
  duration: number,
) {
  const maxScroll = getMaxScroll();
  const scrollDelta = scrollY - anchorScrollY;
  if (scrollDelta >= 0) {
    const scrollDownRange = Math.max(maxScroll - anchorScrollY, 1);
    const videoDownRange = Math.max(duration - anchorVideoTime, 0);
    return Math.min(
      anchorVideoTime + (scrollDelta / scrollDownRange) * videoDownRange,
      duration - 0.001,
    );
  }
  const scrollUpRange = Math.max(anchorScrollY, 1);
  return Math.max(
    anchorVideoTime + (scrollDelta / scrollUpRange) * anchorVideoTime,
    0,
  );
}

export function useScrollControlledVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollControlActive = useRef(false);
  const anchorScrollY = useRef(0);
  const anchorVideoTime = useRef(0);
  const ticking = useRef(false);
  const stopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activateScrollControl = useCallback(() => {
    const video = videoRef.current;
    if (!video || scrollControlActive.current) return;
    scrollControlActive.current = true;
    anchorScrollY.current = window.scrollY;
    anchorVideoTime.current = video.currentTime;
    video.pause();
  }, []);
  const syncVideoToScroll = useCallback(() => {
    ticking.current = false;
    const video = videoRef.current;
    if (!video || !scrollControlActive.current) return;
    const duration = video.duration;
    if (!duration || Number.isNaN(duration)) return;
    if (video.seeking) return;
    const targetTime = getTargetTime(
      window.scrollY,
      anchorScrollY.current,
      anchorVideoTime.current,
      duration,
    );
    if (Math.abs(video.currentTime - targetTime) < SEEK_THRESHOLD) return;
    video.pause();
    video.currentTime = targetTime;
  }, []);
  const requestSync = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(syncVideoToScroll);
  }, [syncVideoToScroll]);
  const handleScroll = useCallback(() => {
    activateScrollControl();
    requestSync();
    if (stopTimer.current) clearTimeout(stopTimer.current);
    stopTimer.current = setTimeout(() => {
      videoRef.current?.pause();
    }, SCROLL_STOP_DELAY_MS);
  }, [activateScrollControl, requestSync]);
  useEffect(() => {
    const onScroll = () => handleScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (stopTimer.current) clearTimeout(stopTimer.current);
    };
  }, [handleScroll]);
  return videoRef;
}
