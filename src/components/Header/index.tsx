import todoLogo from '../../assets/todo-logo.svg';
import styles from './header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <img src={todoLogo} alt='Logotipo do app toDo' />
    </header>
  );
}
