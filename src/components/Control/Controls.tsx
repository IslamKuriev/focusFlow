import { useAppDispatch, useAppSelector } from "../../app/hook";
import { pauseTimer, resetTimer, startTimer } from "../../features/timer/timerSlice";
import styles from "./Controls.module.css";

const Controls = () => {
  const dispatch = useAppDispatch()
  const { isRunning } = useAppSelector((s) => s.timer)
  return (
    <div className={styles.container}>
      {!isRunning ? (
        <button className={`${styles.button} ${styles.start}`} onClick={() => dispatch(startTimer())}>
          ▶ Start
        </button>
      ) : (
        <button className={`${styles.button} ${styles.pause}`} onClick={() => dispatch(pauseTimer())}>
          ⏸ Pause
        </button>
      )}
      <button className={`${styles.button} ${styles.reset}`} onClick={() => dispatch(resetTimer())}>
        🔁 Reset
      </button>
    </div>
  )
}

export default Controls