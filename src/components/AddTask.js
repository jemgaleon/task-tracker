import { useState, useEffect } from 'react';

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    onAdd({ text, day, reminder, complete: false });

    setText('');
    setDay(
      `${new Date()
        .toISOString()
        .slice(0, 10)}T${new Date().toTimeString().slice(0, 5)}`
    );
    setReminder(false);
  };

  useEffect(() => {
    if (day === '')
      setDay(
        `${new Date()
          .toISOString()
          .slice(0, 10)}T${new Date().toTimeString().slice(0, 5)}`
      );
    console.log(day);
  }, []);

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Task</label>
        <input
          type='text'
          placeholder='Add Task'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>
      <div className='form-control'>
        <label>Day & Time</label>
        <input
          type='datetime-local'
          min={`${new Date().toISOString().slice(0, 10)}T00:00:00`}
          placeholder='Add Date & Time'
          value={day}
          onChange={(e) => setDay(e.target.value)}
          required
        />
      </div>
      <div className='form-control form-control-check'>
        <label>Set Reminder</label>
        <input
          type='checkbox'
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>
      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  );
};

export default AddTask;
