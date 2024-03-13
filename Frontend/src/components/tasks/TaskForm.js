import React, { useState } from 'react';

const TaskForm = ({ onSave, task }) => {
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [status, setStatus] = useState(task ? task.status : 'offen');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title,
      description,
      status
    });
    // Formular zurücksetzen oder weitere Aktionen durchführen
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="taskTitle">Titel</label>
        <input
          type="text"
          className="form-control"
          id="taskTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="taskDescription">Beschreibung</label>
        <textarea
          className="form-control"
          id="taskDescription"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="taskStatus">Status</label>
        <select
          className="form-control"
          id="taskStatus"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="offen">Offen</option>
          <option value="in Bearbeitung">In Bearbeitung</option>
          <option value="abgeschlossen">Abgeschlossen</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Speichern</button>
    </form>
  );
};

export default TaskForm;
