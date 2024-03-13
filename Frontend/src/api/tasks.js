import axios from 'axios';

const API_URL = 'http://localhost:80/task'; // Anpassen an die URL Ihres Backend-Servers

// Abrufen aller Tasks eines Benutzers
const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${getToken()}` // Ersetzen Sie getToken() durch Ihre Methode zum Abrufen des Tokens
      }
    });
    return response.data.tasks;
  } catch (error) {
    throw error;
  }
};

// Erstellen eines neuen Tasks
const createTask = async (taskData) => { // Verwende taskData als Objekt, das direkt übergeben wird
    try {
      const response = await axios.post(`${API_URL}/create`, taskData, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

// Aktualisieren eines bestehenden Tasks
const updateTask = async (task_id, task) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${task_id}`, task, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Löschen eines Tasks
const deleteTask = async (task_id) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${task_id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Hilfsfunktion zum Abrufen des Benutzer-Tokens
const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.access_token;
};

const tasksApi = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
  };
  
export default tasksApi;
