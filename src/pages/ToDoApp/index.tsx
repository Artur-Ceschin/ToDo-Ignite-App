import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { CreateTodoInput } from 'src/components/CreateTodoInput';
import { Header } from 'src/components/Header';
import { Spinner } from 'src/components/Spinner';
import { TaskContainer } from 'src/components/TaskContainer';
import { auth } from 'src/config/firebase';

import styles from './toDoApp.module.css';

export interface task {
  id: string;
  userId?: string;
  title: string;
  isCompleted: boolean;
}

export function ToDoApp() {
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  if(!user) {
    navigate('/')
    return null
  }

  return (
    <>
      <Header/>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.toDoContainer}>
          <CreateTodoInput user={user}  />
          <TaskContainer user={user}  />
        </div>
      )}
    </>
  );
}
