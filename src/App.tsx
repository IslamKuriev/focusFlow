import { useEffect } from "react";
import styles from "./App.module.css";
import Controls from "./components/Control/Controls";
import CurrentTask from "./components/CurrentTask/CurrentTask";
import TaskList from "./components/TasksList/TasksList";
import TimerDisplay from "./components/Timer/TimerDisplay";
import TimeSettings from "./components/TimeSettings/TimeSettings";
import { tick } from "./features/timer/timerSlice";
import { useAppDispatch, useAppSelector } from "./app/hook";
import Stats from "./components/Stats/Stats";
import HistoryPanel from "./components/History/HistoryPanel";

function App() {
  const dispatch = useAppDispatch();
  const { isRunning } = useAppSelector((s) => s.timer);
  useEffect(() => {
    let timer: number | undefined;
    if (isRunning) {
      timer = window.setInterval(() => {
        dispatch(tick());
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <div className={styles.app}>
      <header className={styles.header}>FocusFlow ⏱️</header>

      <main className={styles.main}>
        <div className={styles.left}>
          <Stats />
          <HistoryPanel />
        </div>

        <div className={styles.center}>
          <TimerDisplay />
          <div className={styles.bottomBlock}>
            <Controls />
            <CurrentTask />
          </div>
        </div>

        <div className={styles.right}>
          <TaskList />
          <TimeSettings />
        </div>
      </main>
    </div>
  );
}

export default App;