import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
// Importieren Sie Ihren Authentifizierungskontext, falls verwendet
// import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const history = useNavigate();
  // const { setAuthData } = useContext(AuthContext); // Wenn Sie einen Authentifizierungskontext verwenden
  const [loginError, setLoginError] = useState('');

  const handleLoginSuccess = (user) => {
    // setAuthData(user); // Authentifizierungsstatus im Kontext speichern
    history('/tasks'); // Nutzer nach erfolgreicher Anmeldung zu den Tasks weiterleiten
    window.location.reload(); // Seite neu laden, um den Header zu aktualisieren
  };

  const handleLoginFail = (error) => {
    setLoginError(error);
  };

  return (
    <div className="container mt-5">
      <h2>Anmelden</h2>
      {loginError && <div className="alert alert-danger">{loginError}</div>}
      <LoginForm onLoginSuccess={handleLoginSuccess} onLoginFail={handleLoginFail} />
      <div className="mt-3">
        Kein Konto? <a href="/register">Registrieren</a>
      </div>
    </div>
  );
};

export default LoginPage;
