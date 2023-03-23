import { collection, deleteDoc, doc, getDocs, onSnapshot, query, QuerySnapshot, updateDoc } from 'firebase/firestore';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { NumberDisplay } from 'src/components/NumberDisplay';
import { db } from 'src/config/firebase';
import { task } from 'src/pages/ToDoApp';
import { CompletedTasks } from '../CompletedTasks';
import { DefaultTaskItens } from '../DefaultTaskItens';
import { Task } from '../Task/Task';
import styles from './taskContainer.module.css';

interface taskContainerProps {
  tasks: task[];
  setTasks: Dispatch<SetStateAction<task[]>>;
}

export function TaskContainer() {
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

      setTasks(todosArr)
    })

    return () => unsubscribe()
  }, [])

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
    </div>
  );
}
