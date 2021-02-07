import Task from './Task';

const Tasks = ({ tasks, onDelete, onToggle, onComplete }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
};

export default Tasks;
