import { useAppDispatch, useAppSelector } from "../../app/hook";
import { setFocusDuration, setBreakDuration } from "../../features/timer/timerSlice";
import styles from "./TimeSettings.module.css";

const TimeSettings = () => {
  const dispatch = useAppDispatch();
  const { focusDuration, breakDuration } = useAppSelector((s) => s.timer);

  return (
    <div className={styles.box}>
      <h3 className={styles.title}>⏱️ Настройки времени</h3>

      <label className={styles.row}>
        <span>Фокус (мин):</span>
        <input
          type="number"
          min={5}
          max={90}
          value={Math.floor(focusDuration / 60)}
          onChange={(e) =>
            dispatch(setFocusDuration(Number(e.target.value) * 60))
          }
        />
      </label>

      <label className={styles.row}>
        <span>Перерыв (мин):</span>
        <input
          type="number"
          min={1}
          max={30}
          value={Math.floor(breakDuration / 60)}
          onChange={(e) =>
            dispatch(setBreakDuration(Number(e.target.value) * 60))
          }
        />
      </label>
    </div>
  );
};

export default TimeSettings;
