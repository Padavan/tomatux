export type Theme = "system" | "light" | "dark";

export interface PomodoroSettings {
  pomodoro: number;
  pause: number;
  theme: Theme;
}
