import React, { useState } from 'react';
import TaskForm from './TaskForm';
import tasksApi from '../api/tasks'; 

const TaskCreate = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'offen' // Standardstatus für neue Tasks
  });


  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleSaveTask = async () => {
    try {
      await tasksApi.createTask(task);
      console.log('Task erfolgreich erstellt');      
    } catch (error) {
      console.error('Fehler beim Erstellen des Tasks:', error);
    }
  };

  return (
    <div>
      <h2>Neuen Task erstellen</h2>
      <TaskForm task={task} onTaskChange={handleTaskChange} onSaveTask={handleSaveTask} />
    </div>
  );
};

export default TaskCreate;
