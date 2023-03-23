import { addDoc, collection } from 'firebase/firestore';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { db } from 'src/config/firebase';
import { task } from 'src/pages/ToDoApp';
import { v4 as uuid } from 'uuid';
import plusIcon from '../../assets/plus-icon.svg';

import styles from './createTodoInput.module.css';

interface createTodoInputProps {
  tasks: task[];
  setTasks: Dispatch<SetStateAction<task[]>>;
}

export function CreateTodoInput() {
  const [taskInfo, setTaskInfo] = useState('');

  async function handleCreateTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await addDoc(collection(db, 'todos'), {
      title: taskInfo,
      isCompleted: false
    })

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
