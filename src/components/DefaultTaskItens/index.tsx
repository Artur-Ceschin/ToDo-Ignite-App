import clipBoardImg from '../../assets/clipboard.png';
import styles from './taskItensContainer.module.css';

export function DefaultTaskItens() {
  return (
    <div className={styles.taskItensDefaultContainer}>
      <img src={clipBoardImg} alt='Imagem Clipboard' />
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  );
}
