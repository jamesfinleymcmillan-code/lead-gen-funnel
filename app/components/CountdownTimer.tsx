'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  onExpire?: () => void;
  className?: string;
}

export default function CountdownTimer({ onExpire, className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Check for existing timer in localStorage
    const storedStart = localStorage.getItem('countdown_start');
    const now = Date.now();

    let startTime: number;

    if (storedStart) {
      startTime = parseInt(storedStart);
    } else {
      // First visit - set timer for 48 hours from now
      startTime = now;
      localStorage.setItem('countdown_start', startTime.toString());
    }

    // Calculate time remaining (48 hours = 172800000 ms)
    const endTime = startTime + 172800000; // 48 hours
    const remaining = endTime - now;

    if (remaining <= 0) {
      setIsExpired(true);
      if (onExpire) onExpire();
      return;
    }

    setTimeLeft(remaining);

    // Update countdown every second
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const newRemaining = endTime - currentTime;

      if (newRemaining <= 0) {
        setIsExpired(true);
        setTimeLeft(0);
        clearInterval(interval);
        if (onExpire) onExpire();
      } else {
        setTimeLeft(newRemaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [onExpire]);

  // Format time as HH:MM:SS
  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Check if time is running low (less than 6 hours)
  const isLowTime = timeLeft < 6 * 60 * 60 * 1000;

  if (isExpired) {
    return null; // Don't show timer if expired
  }

  return (
    <div className={className}>
      <span className={`font-mono font-bold ${isLowTime ? 'text-red-500 animate-pulse' : 'text-blue-400'}`}>
        {formatTime(timeLeft)}
      </span>
    </div>
  );
}

// Helper function to check if discount is active
export const isDiscountActive = (): boolean => {
  if (typeof window === 'undefined') return false;

  const storedStart = localStorage.getItem('countdown_start');
  if (!storedStart) return true; // First visit, discount active

  const startTime = parseInt(storedStart);
  const now = Date.now();
  const endTime = startTime + 172800000; // 48 hours

  return now < endTime;
};
