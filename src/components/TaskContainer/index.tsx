import { NumberDisplay } from 'src/components/NumberDisplay';
import { CompletedTasks } from '../CompletedTasks';
import { TaskItens } from '../TaskItens';
import styles from './taskContainer.module.css';

export function TaskContainer() {
  return (
    <div className={styles.tasksContainer}>
      <div>
        <div className={styles.containerHeader}>
          <NumberDisplay number={10} />
          <CompletedTasks />
        </div>
        <div className={styles.headerSeparator}></div>
      </div>
      <TaskItens />
    </div>
  );
}
