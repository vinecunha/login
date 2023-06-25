import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

const Home = () => {
  const location = useLocation();
  const username = location.state?.username || '';
  const message = location.state?.message || '';
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Estado para controlar se o usuário está logado
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleLogoff = () => {
    setIsLoggedIn(false);
    navigate('/');
  };
  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  return (
    <div className="home-container h-100 container-sm d-flex flex-column justify-content-between align-items-center">
      <div className='w-100 m-1 d-flex justify-content-end'>
        {isLoggedIn && (
          <Button label='Sair' icon="pi pi-sign-out" severity='danger' onClick={handleLogoff} />
        )}
      </div>
      <div className='d-flex flex-column align-items-center'>
        <h2>Bem-vindo, {username} </h2>
        <p className='d-flex flex-row align-items-center'>
          <i className='pi pi-clock mx-1'></i>
          {currentDate.toLocaleString()}
        </p>
        <p><i className='pi pi-history me-1'></i>{message}</p>
      </div>
    </div>
  );
};

export default Home;