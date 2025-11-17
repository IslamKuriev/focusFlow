import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

function loadState() {
  try {
    const saved = localStorage.getItem("focusflow-state");
    if (!saved) return null;
    return JSON.parse(saved);
  } catch {
    return null;
  }
}


interface TimerState {
  timeLeft: number
  isRunning: boolean
  mode: "focus" | "break"
  completedCycles: number
  focusDuration: number
  breakDuration: number
}

const savedState = loadState();

const initialState: TimerState = savedState ?? {
  timeLeft: 25 * 60,
  isRunning: false,
  mode: "focus",
  completedCycles: 0,
  focusDuration: 25 * 60,
  breakDuration: 5 * 60
}

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
    },
    pauseTimer: (state) => {
      state.isRunning = false;
    },
    resetTimer: (state) => {
      state.timeLeft = state.mode === "focus" ? state.focusDuration : state.breakDuration;
      state.isRunning = false;
    },
    tick: (state) => {
      if (state.isRunning && state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
      else if (state.isRunning && state.timeLeft === 0) {
        const audio = new Audio('/src/assets/sounds/ding.mp3');
        audio.play();

        if (state.mode === "break") {
          state.completedCycles += 1;
        }

        state.mode = state.mode === "focus" ? "break" : "focus";

        state.timeLeft = state.mode === "focus"
          ? state.focusDuration
          : state.breakDuration;
      }
    },
    setFocusDuration: (state, action: PayloadAction<number>) => {
      state.focusDuration = action.payload
      if (state.mode === 'focus') {
        state.timeLeft = state.focusDuration
      }
    },
    setBreakDuration: (state, action: PayloadAction<number>) => {
      state.breakDuration = action.payload
      if (state.mode === 'break') {
        state.timeLeft = state.breakDuration
      }
    }
  },
}
)

export const { startTimer, pauseTimer, resetTimer, tick, setFocusDuration, setBreakDuration } = timerSlice.actions;
export default timerSlice.reducer;
export const persistState = (state: RootState) => {
  const dataToSave = {
    ...state.timer,
    isRunning: false,
  };
  localStorage.setItem("focusflow-state", JSON.stringify(dataToSave));
};