import emptyCheck from '../../assets/empty-check.svg';
import filledCheck from '../../assets/filled-check.svg';
import trashIcon from '../../assets/trash-icon.svg';
import styles from './task.module.css';

interface taskProps {
  id: string;
  title: string;
  isCompleted: boolean;
  handleDeleteTask: (id: string) => void;
  handleCompleteTask: (id: string) => void;
}

export function Task({
  id,
  title,
  isCompleted,
  handleCompleteTask,
  handleDeleteTask,
}: taskProps) {
  return (
    <div className={styles.taskStyle}>
      <img
        src={isCompleted ? filledCheck : emptyCheck}
        alt='Check vazio'
        onClick={() => handleCompleteTask(id)}
        className={styles.checkIcon}
      />
      <div className={styles.textContainer}>
        <p className={isCompleted ? styles.taskStyleCompleted : ''}>{title}</p>
      </div>
      <img
        src={trashIcon}
        alt='Ícone de lixo'
        onClick={() => handleDeleteTask(id)}
        className={styles.trashIcon}
      />
    </div>
  );
}
