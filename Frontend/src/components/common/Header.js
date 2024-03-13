import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).access_token : null;
    setIsLoggedIn(!!token); // Setzt isLoggedIn auf true, wenn ein Token existiert
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Token aus dem localStorage entfernen
    setIsLoggedIn(false); // Aktualisieren des isLoggedIn Status
    navigate('/login'); // Umleitung zur Login-Seite
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Tasklist App</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {isLoggedIn && (
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-danger">Abmelden</button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
