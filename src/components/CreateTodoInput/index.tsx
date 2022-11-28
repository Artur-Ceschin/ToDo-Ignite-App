import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { task } from 'src/pages/toDoApp';
import { v4 as uuid } from 'uuid';
import plusIcon from '../../assets/plus-icon.svg';

import styles from './createTodoInput.module.css';

interface createTodoInputProps {
  tasks: task[];
  setTasks: Dispatch<SetStateAction<task[]>>;
}

export function CreateTodoInput({ tasks, setTasks }: createTodoInputProps) {
  const [taskInfo, setTaskInfo] = useState('');

  function handleCreateTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newTask = {
      id: uuid(),
      title: taskInfo,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);

    setTaskInfo('');
  }

  return (
    <form className={styles.inputContainer} onSubmit={handleCreateTask}>
      <input
        type='text'
        placeholder='Adicione uma nova tarefa'
        onChange={(e) => setTaskInfo(e.target.value)}
        value={taskInfo}
      />
      <button type='submit' disabled={!taskInfo}>
        Criar <img src={plusIcon} alt='ícone de adição' />
      </button>
    </form>
  );
}
