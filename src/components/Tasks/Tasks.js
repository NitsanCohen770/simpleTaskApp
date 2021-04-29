import Section from '../UI/Section';
import TaskItem from './TaskItem';
import classes from './Tasks.module.css';
import useHttp from '../../hooks/use-http/useHttp';
import { useState, useEffect } from 'react';

const Tasks = props => {
  const { isLoading, error, sendRequest: deleteItemRequest } = useHttp();

  const deleteTasksHandler = taskId => {
    deleteItemRequest({
      url: `https://customhooks-d8034-default-rtdb.europe-west1.firebasedatabase.app/tasks/${taskId}.json`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => props.onDeleteItem(taskId));
  };
  let taskList = <h2>No tasks found. Start adding some!</h2>;

  if (props.items.length > 0) {
    taskList = (
      <ul>
        {props.items.map(task => (
          <TaskItem
            id={task.id}
            key={task.id}
            onDeleteItem={deleteTasksHandler.bind(null, task.id)}
          >
            {task.text}{' '}
          </TaskItem>
        ))}
      </ul>
    );
  }

  let content = taskList;

  if (props.error) {
    content = <button onClick={props.onFetch}>Try again</button>;
  }

  if (props.loading) {
    content = 'Loading tasks...';
  }

  return (
    <Section>
      <div className={classes.container}>{content}</div>
    </Section>
  );
};

export default Tasks;
