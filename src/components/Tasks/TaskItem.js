import classes from './TaskItem.module.css';

const TaskItem = props => {
  return (
    <li className={classes.task}>
      {props.children}
      <button onClick={props.onDeleteItem} className={classes.button}>
        Delete Task
      </button>
    </li>
  );
};

export default TaskItem;
