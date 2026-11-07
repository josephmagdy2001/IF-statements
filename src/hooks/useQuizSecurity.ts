import { useEffect, useRef, useState, useCallback } from 'react';
import { soundFx } from '../utils/sound';
import { announcer } from '../utils/speech';

interface QuizSecurityProps {
  enabled: boolean;
  lives: number;
  onDeductLife: (reason: string) => void;
  onGameOver: () => void;
}

export function useQuizSecurity({
  enabled,
  lives,
  onDeductLife,
  onGameOver,
}: QuizSecurityProps) {
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Debounce ref to prevent duplicate triggers (blur + visibilitychange fired simultaneously)
  const lastViolationTimeRef = useRef<number>(0);
  const livesRef = useRef(lives);

  useEffect(() => {
    livesRef.current = lives;
  }, [lives]);

  const triggerViolation = useCallback((reason: string) => {
    if (!enabled) return;
    const now = Date.now();
    // Cooldown window of 2000ms prevents double penalty for paired blur + visibilitychange events
    if (now - lastViolationTimeRef.current < 2000) {
      return;
    }
    lastViolationTimeRef.current = now;

    // Play warning sound & voice
    soundFx.playWarning();
    announcer.announceLifeLost();

    setWarningMessage(reason);
    setShowWarningModal(true);

    onDeductLife(reason);

    if (livesRef.current <= 1) {
      // Last life lost
      onGameOver();
    }
  }, [enabled, onDeductLife, onGameOver]);

  const requestFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch (e) {
      console.warn('Fullscreen request denied or not allowed by browser', e);
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (e) {
      console.warn('Exit fullscreen error', e);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Check initial fullscreen
    setIsFullscreen(Boolean(document.fullscreenElement));

    // 1. Visibility change listener (tab switch, window minimize)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerViolation('Tab switched or browser minimized!');
      }
    };

    // 2. Window Blur listener
    const handleWindowBlur = () => {
      triggerViolation('Focus lost! Left the quiz window.');
    };

    // 3. Fullscreen change listener
    const handleFullscreenChange = () => {
      const isFull = Boolean(document.fullscreenElement);
      setIsFullscreen(isFull);
      if (!isFull && enabled) {
        triggerViolation('Exited fullscreen mode!');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [enabled, triggerViolation]);

  const dismissWarning = useCallback(() => {
    setShowWarningModal(false);
    setWarningMessage(null);
    // Attempt re-entering fullscreen if not in it
    if (!document.fullscreenElement) {
      requestFullscreen();
    }
  }, [requestFullscreen]);

  return {
    isFullscreen,
    showWarningModal,
    warningMessage,
    dismissWarning,
    requestFullscreen,
    exitFullscreen,
  };
}

