import { useAppSelector } from "../../app/hook";
import styles from "./Stats.module.css";

const Stats = () => {
  const completedCycles = useAppSelector((state) => state.timer.completedCycles);

  return (
    <div className={styles.box}>
      <h3 className={styles.title}>📊 Прогресс</h3>
      <p className={styles.value}>{completedCycles}</p>
      <p className={styles.label}>Завершённых циклов</p>
    </div>
  );
};

export default Stats;
