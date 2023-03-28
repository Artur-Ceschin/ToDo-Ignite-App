import { NumberDisplay } from '../NumberDisplay';

import styles from './completedTasks.module.css';

interface completedTasksProps {
  totalCompleted: number;
}

export function CompletedTasks({ totalCompleted = 0 }: completedTasksProps) {
  return (
    <div className={styles.completedTasksStyles}>
      <h3>Completed</h3>
      <NumberDisplay number={totalCompleted} />
    </div>
  );
}
