import { useEffect, useState, useCallback } from 'react';
import { soundFx } from '../services/soundFx';

export function useSound() {
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.getMuted());

  useEffect(() => {
    const unsubscribe = soundFx.subscribe((muted) => {
      setIsMuted(muted);
    });
    return unsubscribe;
  }, []);

  const toggleMute = useCallback(() => {
    soundFx.toggleMute();
  }, []);

  const setMuted = useCallback((muted: boolean) => {
    soundFx.setMuted(muted);
  }, []);

  const playClick = useCallback(() => soundFx.playClick(), []);
  const playPageTransition = useCallback(() => soundFx.playPageTransition(), []);
  const playNodeSelect = useCallback(() => soundFx.playNodeSelect(), []);
  const playAlert = useCallback(() => soundFx.playAlert(), []);
  const playIsolate = useCallback(() => soundFx.playIsolate(), []);
  const playSuccess = useCallback(() => soundFx.playSuccess(), []);
  const playRadarPing = useCallback(() => soundFx.playRadarPing(), []);
  const playHover = useCallback(() => soundFx.playHover(), []);
  const playKeypress = useCallback(() => soundFx.playKeypress(), []);

  return {
    isMuted,
    toggleMute,
    setMuted,
    playClick,
    playPageTransition,
    playNodeSelect,
    playAlert,
    playIsolate,
    playSuccess,
    playRadarPing,
    playHover,
    playKeypress,
  };
}
