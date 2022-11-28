import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { NumberDisplay } from 'src/components/NumberDisplay';
import { task } from 'src/pages/toDoApp';
import { CompletedTasks } from '../CompletedTasks';
import { DefaultTaskItens } from '../DefaultTaskItens';
import { Task } from '../Task/Task';
import styles from './taskContainer.module.css';

interface taskContainerProps {
  tasks: task[];
  setTasks: Dispatch<SetStateAction<task[]>>;
}

export function TaskContainer({ tasks, setTasks }: taskContainerProps) {
  const [completedTasks, setCompletedTasks] = useState(0);

  function handleDeleteTask(id: string) {
    const removeTask = tasks.filter((item) => item.id !== id);

    setTasks(removeTask);
  }

  function handleCompleteTask(id: string) {
    const completedItem = tasks.map((item) => {
      if (item.id === id) {
        item.isCompleted = !item.isCompleted;
      }
      return item;
    });

    setTasks(completedItem);
  }

  useEffect(() => {
    const completed = tasks.filter((task) => task.isCompleted).length;
    setCompletedTasks(completed);
  }, [tasks]);

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
