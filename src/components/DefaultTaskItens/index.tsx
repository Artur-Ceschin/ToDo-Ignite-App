import clipBoardImg from '../../assets/clipboard.png';
import styles from './taskItensContainer.module.css';

export function DefaultTaskItens() {
  return (
    <div className={styles.taskItensDefaultContainer}>
      <img src={clipBoardImg} alt='Imagem Clipboard' />
      <strong>You still don't have any tasks</strong>
      <p>Create tasks and organize your to-do items</p>
    </div>
  );
}
