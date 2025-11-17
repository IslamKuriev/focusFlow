import { configureStore } from "@reduxjs/toolkit";
import timerReducer, { persistState } from "../features/timer/timerSlice";
import tasksReducer from "../features/tasks/tasksSlice";

export const store = configureStore({
    reducer: {
        timer: timerReducer,
        tasks: tasksReducer
    },
})

store.subscribe(() => {
  persistState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;