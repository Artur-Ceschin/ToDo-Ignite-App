import plusIcon from '../../assets/plus-icon.svg';

import styles from './createTodoInput.module.css';

export function CreateTodoInput() {
  return (
    <div className={styles.inputContainer}>
      <input type='text' placeholder='Adicione uma nova tarefa' />
      <button>
        Criar <img src={plusIcon} alt='ícone de adição' />
      </button>
    </div>
  );
}
