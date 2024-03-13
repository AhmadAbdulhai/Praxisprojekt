import React, { useState } from 'react';
import auth from '../../api/auth'; // Stellen Sie sicher, dass der Pfad zu Ihrer Auth-API korrekt ist

const RegisterForm = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await auth.register(username, password);
      onRegisterSuccess();
    } catch (error) {
      setError('Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Benutzername</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Passwort</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <button type="submit" className="btn btn-primary">Registrieren</button>
      </form>
    </div>
  );
};

export default RegisterForm;
