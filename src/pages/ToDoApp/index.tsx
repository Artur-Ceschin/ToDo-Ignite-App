import { useEffect, useState } from 'react';
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
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setLoading(false);
      if (user) {
        setUser(user);
      } else {
        navigate('/');
      }
    });

    return unsubscribe;
  }, [navigate]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Header/>
      <div className={styles.toDoContainer}>
        <CreateTodoInput user={user}  />
        <TaskContainer user={user}  />
      </div>
    </>
  );
}