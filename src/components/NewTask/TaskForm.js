import { useRef, useState } from 'react';

import classes from './TaskForm.module.css';

const TaskForm = props => {
  const taskInputRef = useRef();
  const [userInput, setUserInput] = useState('');
  const inputChangeHandler = event => {
    setUserInput(event.target.value);
  };
  const submitHandler = event => {
    event.preventDefault();

    const enteredValue = taskInputRef.current.value;

    if (enteredValue.trim().length > 0) {
      props.onEnterTask(enteredValue);
    }
    setUserInput('');
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input
        type="text"
        ref={taskInputRef}
        onChange={inputChangeHandler}
        value={userInput}
      />
      <button>{props.loading ? 'Sending...' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
