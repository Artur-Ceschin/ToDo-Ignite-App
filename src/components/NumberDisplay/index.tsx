import styles from './numberDisplay.module.css';

interface NumberDisplayProps {
  number: number;
}

export function NumberDisplay({ number = 0 }: NumberDisplayProps) {
  return <div className={styles.numberBackground}>{number}</div>;
}
