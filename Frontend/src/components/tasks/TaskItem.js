import React from 'react';

const TaskItem = ({ task, onEdit, onDelete }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{task.title}</h5>
        <p className="card-text">{task.description}</p>
        <p className="card-text"><small className="text-muted">Status: {task.status}</small></p>
        <button onClick={() => onEdit(task.id)} className="btn btn-primary mr-2">Bearbeiten</button>
        <button onClick={() => onDelete(task.id)} className="btn btn-danger">Löschen</button>
      </div>
    </div>
  );
};

export default TaskItem;
