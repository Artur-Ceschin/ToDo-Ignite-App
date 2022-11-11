import { NumberDisplay } from '../NumberDisplay';

import styles from './completedTasks.module.css';

export function CompletedTasks() {
  return (
    <div className={styles.completedTasksStyles}>
      <h3>Concluídas</h3>
      <NumberDisplay number={0} />
    </div>
  );
}
