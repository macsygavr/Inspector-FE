import { ProgressLevel } from "../ProgressBar/ProgressBar";

export const getProgressBarLevel = (value?: number | null) => {
  return !value && value !== 0
    ? ProgressLevel.None
    : value <= 3
    ? ProgressLevel.Low
    : value <= 6
    ? ProgressLevel.Medium
    : ProgressLevel.High;
};
