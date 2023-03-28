import { User } from 'firebase/auth';
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { NumberDisplay } from 'src/components/NumberDisplay';
import { auth, db } from 'src/config/firebase';
import { task } from 'src/pages/ToDoApp';
import { CompletedTasks } from '../CompletedTasks';
import { DefaultTaskItens } from '../DefaultTaskItens';
import { Task } from '../Task/Task';
import styles from './taskContainer.module.css';

interface taskContainerProps {
  tasks: task[];
  setTasks: Dispatch<SetStateAction<task[]>>;
}

export function TaskContainer({user}: {user:User | null}) {
  const [tasks, setTasks] = useState<task[]>([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  

  async function handleDeleteTask(id: string) {
    await deleteDoc(doc(db, 'todos', id))
  }

  async function handleCompleteTask(tasksValues: task) {
    const taskId = tasksValues.id

    await updateDoc(doc(db, 'todos', taskId), {
      isCompleted: !tasksValues.isCompleted
    })
  }

  useEffect(() => {
    const completed = tasks.filter((task) => task.isCompleted).length;
    setCompletedTasks(completed);
  }, [tasks]);

  useEffect(() => {
    const queryCollection = query(collection(db, 'todos'))

    const unsubscribe = onSnapshot(queryCollection, (querySnapshot) => {
      let todosArr: Array<any> = []
      querySnapshot.forEach(doc => {
        todosArr.push({...doc.data(), id: doc.id})
      })

      const tasksBasedOnUser = todosArr.filter((task) => task?.userId === user?.uid)

      setTasks(tasksBasedOnUser)
    })

    return () => unsubscribe()
  }, [])

  function signOut(){
    if(auth.currentUser){
      return auth.signOut()
    }
  }

  return (
    <div className={styles.tasksContainer}>
      <div>
        <div className={styles.containerHeader}>
          <NumberDisplay number={tasks.length} />
          <CompletedTasks totalCompleted={completedTasks} />
        </div>
        <div className={styles.headerSeparator}></div>
      </div>

      {tasks.length >= 1 ? (
        <div>
          {tasks.map((item) => (
            <Task
              key={item.id}
              id={item.id}
              title={item.title}
              isCompleted={item.isCompleted}
              handleDeleteTask={handleDeleteTask}
              handleCompleteTask={handleCompleteTask}
            />
          ))}
        </div>
      ) : (
        <DefaultTaskItens />
      )}

      <button className={styles.signOutButton} onClick={signOut}>Sign out</button>
    </div>
  );
}
