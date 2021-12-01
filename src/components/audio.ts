import { AUDIO_FILE } from '../constants';

export const playAlertSound = function (): void {
  const audio = new Audio(AUDIO_FILE);
  audio.play();
};
