import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import 'hover.css/css/hover-min.css';

import data from './data/dados.json';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [countError, setCountError] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimer, setBlockTimer] = useState(0); // Variável para contagem regressiva do tempo restante
  const navigate = useNavigate();

  useEffect(() => {
    if (blockTimer > 0) {
      setErrorMessage(`Você está bloqueado por ${blockTimer} segundos.`);
    } else {
      setErrorMessage('');
    }
  }, [blockTimer]);

  const handleLogin = (event) => {
    event.preventDefault();

    if (isBlocked) {
      return;
    }

    const user = data.find((item) => item.username === username && item.password === password);
    
    if (user) {
      const lastLogin = new Date().toLocaleString();
      const message = `Seu último login foi em: ${lastLogin}`;
      navigate('/home', { state: { username, message } });
    } else {
      navigator.vibrate(500);

      setCountError((prevCount) => prevCount + 1);

      if (countError + 1 === 3) {
        const blockTime = 30; // Tempo de bloqueio em segundos
        setIsBlocked(true);
        setBlockTimer(blockTime);

        const interval = setInterval(() => {
          setBlockTimer((prevTime) => prevTime - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(interval);
          setIsBlocked(false);
          setCountError(0);
          setBlockTimer(0);
        }, blockTime * 1000);
      } else {
        setErrorMessage(`Credenciais inválidas - Tentativa ${countError + 1}`);
      }
    }
  };

  return (
    <div style={{ maxWidth: '350px'}} className="login-container rounded border border-1 border-info m-auto my-5 py-5 shadow d-flex flex-column align-items-center">
      <h2>LOGIN</h2>
      <form onSubmit={handleLogin} className='container-fluid d-flex flex-column align-items-center'>
        <span className="p-float-label my-4">
          <InputText
            className={errorMessage ? 'w-100 p-invalid' : 'w-100'}
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="username"><i className="pi pi-user me-1"></i>Usuário</label>
        </span>
        <span className="p-float-label mb-4">
          <Password
            className={errorMessage ? 'w-100 p-invalid' : 'w-100'}
            id="password"
            value={password}
            feedback={false}
            onChange={(e) => {setPassword(e.target.value); (!isBlocked) ? setErrorMessage('') : setErrorMessage(errorMessage)}}
            required
          />
          <label htmlFor="password"><i className='pi pi-lock me-1'></i>Senha</label>
        </span>
        <Button type="submit" label={errorMessage ? errorMessage : "Acessar"} icon={errorMessage ? "pi pi-exclamation-triangle" : "pi pi-sign-in"} severity={errorMessage ? 'danger' : ''} className={isBlocked ? 'hvr-buzz-out' : ''} />
      </form>
      <p className='my-3' style={{ fontSize: '.8rem' }}>Não tem um acesso? Consulte o <strong><a href='https://github.com/vinecunha/login' target='blank'>README</a></strong> no GitHub</p>
    </div>
  );
};

export default Login;