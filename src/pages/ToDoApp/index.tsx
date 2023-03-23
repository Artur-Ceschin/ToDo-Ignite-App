import { useState } from 'react';
import { CreateTodoInput } from 'src/components/CreateTodoInput';
import { Header } from 'src/components/Header';
import { TaskContainer } from 'src/components/TaskContainer';

import styles from './toDoApp.module.css';

export interface task {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function ToDoApp() {
  return (
    <>
      <Header />
      <div className={styles.toDoContainer}>
        <CreateTodoInput />
        <TaskContainer />
      </div>
    </>
  );
}
