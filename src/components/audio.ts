import { AUDIO_FILE } from '../model/constants';

export const playAlertSound = (): void => {
  const audio = new Audio(AUDIO_FILE);
  audio.play();
};
