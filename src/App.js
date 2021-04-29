import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http/useHttp';

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformTasks = tasksObj => {
      const loadedTasks = [];

      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }

      setTasks(loadedTasks);
    };

    fetchTasks(
      {
        url:
          'https://customhooks-d8034-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
      },
      transformTasks
    );
  }, [fetchTasks]);
  const deleteItem = itemId => {
    const updatedTasks = tasks.filter(task => {
      return task.id !== itemId;
    });
    setTasks(updatedTasks);
  };
  const taskAddHandler = task => {
    setTasks(prevTasks => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
        onDeleteItem={deleteItem}
      />
    </React.Fragment>
  );
}

export default App;
