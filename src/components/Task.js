import { FaTimes } from 'react-icons/fa';

const Task = ({ task, onDelete, onToggle, onComplete }) => {
  return (
    <div
      className={`task ${task.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <input
        type='checkbox'
        className='checkbox'
        value={task.complete}
        checked={task.complete}
        onChange={() => onComplete(task.id)}
      />
      <div className={`task-content ${task.complete ? 'complete' : ''}`}>
        <h3>
          {task.text}{' '}
          <FaTimes
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={() => onDelete(task.id)}
          />
        </h3>
        <p>{task.day && new Date(task.day).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Task;
