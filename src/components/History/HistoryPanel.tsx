import { useAppSelector, useAppDispatch } from "../../app/hook";
import { clearHistory } from "../../features/tasks/tasksSlice";
import styles from "./HistoryPanel.module.css";

const HistoryPanel = () => {
  const history = useAppSelector(s => s.tasks.history);
  const dispatch = useAppDispatch();

  if (history.length === 0) {
    return (
      <div className={styles.panel}>
        <h3>История завершённых задач</h3>
        <p className={styles.empty}>Пока пусто...</p>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <h3>История завершённых задач</h3>

      <ul className={styles.list}>
        {history.map(task => (
          <li key={task.id} className={styles.item}>
            <span>{task.text}</span>
            <small>
              {new Date(task.finishedAt!).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>

      <button
        className={styles.clearBtn}
        onClick={() => dispatch(clearHistory())}
      >
        Очистить историю
      </button>
    </div>
  );
};

export default HistoryPanel;
