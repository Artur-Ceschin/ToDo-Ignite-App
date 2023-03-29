import { User } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from 'src/config/firebase';
import { task } from 'src/pages/ToDoApp';
import { v4 as uuid } from 'uuid';
import plusIcon from '../../assets/plus-icon.svg';

import styles from './createTodoInput.module.css';

interface createTodoInputProps {
  tasks: task[];
  setTasks: Dispatch<SetStateAction<task[]>>;
}

export function CreateTodoInput({user}: {user:User | null}) {
  const [taskInfo, setTaskInfo] = useState('');

  async function handleCreateTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await addDoc(collection(db, 'todos'), {
      userId: user?.uid,
      title: taskInfo,
      isCompleted: false,
      createdAt: serverTimestamp()
    })

    setTaskInfo('');
  }

  return (
    <form className={styles.inputContainer} onSubmit={handleCreateTask}>
      <input
        type='text'
        placeholder='Add a new task'
        onChange={(e) => setTaskInfo(e.target.value)}
        value={taskInfo}
      />
      <button type='submit' disabled={!taskInfo}>
        Create <img src={plusIcon} alt='Add Icon' />
      </button>
    </form>
  );
}
