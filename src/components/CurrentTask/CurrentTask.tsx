import { motion, AnimatePresence } from "framer-motion";
import styles from "./CurrentTask.module.css";
import { useAppSelector } from "../../app/hook";

const CurrentTask = () => {
  const { list, currentTaskId } = useAppSelector((s) => s.tasks);
  const current = list.find((t) => t.id === currentTaskId);

  return (
    <div className={styles.wrapper}>
      <AnimatePresence mode="wait">
        {current ? (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={styles.container}
          >
            <span className={styles.label}>🎯 Текущая задача:</span>
            <span className={styles.text}>{current.text}</span>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.empty}
          >
            🎯 Нет активной задачи
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CurrentTask;
