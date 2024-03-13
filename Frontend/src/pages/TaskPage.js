import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import hinzufügen
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import tasksApi from '../api/tasks'; // Stellen Sie sicher, dass der Pfad zu Ihrer API korrekt ist

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate(); // useNavigate Hook verwenden

  useEffect(() => {
    const getToken = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      return user?.access_token;
    };

    if (!getToken()) {
      navigate('/login'); // Zur Login-Seite navigieren, wenn kein Token vorhanden ist
    }
  }, [navigate]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await tasksApi.getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Fehler beim Abrufen der Tasks:', error);
      }
    };

    fetchTasks();
  }, []);


  
  const fetchAndUpdateTasks = async () => {
    try {
      const fetchedTasks = await tasksApi.getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Fehler beim Abrufen der Tasks:', error);
    }
  };
  

  const handleSaveTask = async (task) => {
    if (currentTask) {
      // Aktualisieren eines bestehenden Tasks
      await tasksApi.updateTask(currentTask.id, task);
    } else {
      // Hinzufügen eines neuen Tasks
      await tasksApi.createTask(task);
    }
    setShowForm(false); // Formular nach dem Speichern ausblenden
    setCurrentTask(null); // Reset currentTask
    await fetchAndUpdateTasks();
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    setCurrentTask(taskToEdit);
    setShowForm(true); // Zeigt das Formular beim Bearbeiten eines Tasks an
  };

  const handleDeleteTask = async (taskId) => {
    await tasksApi.deleteTask(taskId);
    fetchAndUpdateTasks();
  };

  const handleAddTask = () => {
    setCurrentTask(null); // Stellt sicher, dass kein Task zum Bearbeiten ausgewählt ist
    setShowForm(true); // Zeigt das Formular für das Hinzufügen eines neuen Tasks an
  };

  return (
    <div>
      <h1>Meine Aufgaben</h1>
      <button onClick={handleAddTask} className="btn btn-primary mb-3">Neue Aufgabe hinzufügen</button>
      {showForm && <TaskForm task={currentTask} onSave={handleSaveTask} />}
      <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
    </div>
  );
};

export default TaskPage;
