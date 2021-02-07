import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';

function App() {
  const jsonServerUrl = 'https://mukhasim-json-server.herokuapp.com/tasks'; // http://localhost:5000/tasks
  const [showAdd, setShowAdd] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch(`${jsonServerUrl}`);
    const data = await res.json();

    return data;
  };

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`${jsonServerUrl}/${id}`);
    const data = await res.json();

    return data;
  };

  // Add Task
  const handleAdd = async (task) => {
    const res = await fetch(`${jsonServerUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };

  // Delete Task
  const handleDelete = async (id) => {
    await fetch(`${jsonServerUrl}/${id}`, { method: 'DELETE' });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const handleToggle = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`${jsonServerUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  // Complete task
  const handleComplete = async (id) => {
    const taskToComplete = await fetchTask(id);
    const updatedTask = {
      ...taskToComplete,
      complete: !taskToComplete.complete,
    };

    const res = await fetch(`${jsonServerUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, complete: data.complete } : task
      )
    );
  };

  return (
    <Router>
      <div className='container'>
        <Header onAdd={() => setShowAdd(!showAdd)} showAdd={showAdd} />
        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showAdd && <AddTask onAdd={handleAdd} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={handleDelete}
                  onToggle={handleToggle}
                  onComplete={handleComplete}
                />
              ) : (
                'No Tasks To Show'
              )}
            </>
          )}
        />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
