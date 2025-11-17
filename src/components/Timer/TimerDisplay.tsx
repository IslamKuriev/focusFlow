import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { setCurrentTask } from '../../features/tasks/tasksSlice';
import styles from './TimerDisplay.module.css'
import  { motion } from 'framer-motion';

const TimerDisplay = () => {
  const { mode, timeLeft, focusDuration, breakDuration } = useAppSelector((s) => s.timer)
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");

  const totalTime = mode === "focus" ? focusDuration : breakDuration;
  const progress = (timeLeft / totalTime) * 100;

  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("MODE CHANGED:", mode);

    if (mode === "focus") {
      dispatch(setCurrentTask());
      console.log("Dispatching setCurrentTask()");

    }
  }, [mode, dispatch]);

  return (
    <div className={styles.wrapper}>
      <motion.div
        key={mode} 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`${styles.circle} ${mode === "focus" ? styles.focus : styles.break}`}
        style={{
          background: `conic-gradient(${mode === "focus" ? "#4ade80" : "#60a5fa"
            } ${progress * 3.6}deg, #ddd 0)`,
          boxShadow:
            mode === "focus"
              ? "0 0 25px rgba(74, 222, 128, 0.5)"
              : "0 0 25px rgba(96, 165, 250, 0.5)",
          transition: "all 0.5s ease",
        }}
      >
        <div className={styles.inner}>
          <span className={styles.time}>
            {minutes}:{seconds.toString().padStart(2, "0")}
          </span>
          <span className={styles.label}>
            {mode === "focus" ? "Фокус" : "Перерыв"}
          </span>
        </div>
      </motion.div>

    </div>
  )
}

export default TimerDisplay