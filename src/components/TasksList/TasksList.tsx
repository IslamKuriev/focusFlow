import { useState } from "react";
import styles from "./TasksList.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { addTask, toggleTask, deleteTask } from "../../features/tasks/tasksSlice";

const TaskList = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((s) => s.tasks.list);
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTask(text.trim()));
      setText("");
    }
  };

  return (
    <div className={styles.box}>
      <h3 className={styles.title}>📝 Задачи</h3>

      <div className={styles.addRow}>
        <input
          className={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Новая задача..."
          required
        />
        <button className={styles.btn} onClick={handleAdd}>+</button>
      </div>

      <ul className={styles.list}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.item}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleTask(task.id))}
              />
              <span className={task.completed ? styles.done : ""}>
                {task.text}
              </span>
            </label>
            <button className={styles.delete} onClick={() => dispatch(deleteTask(task.id))}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
