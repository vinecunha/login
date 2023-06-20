import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Message } from 'primereact/message';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import data from './data/dados.json';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = data.find((item) => item.username === username && item.password === password);

    if (user) {
      const lastLogin = new Date().toLocaleString();
      const message = `Seu último login foi em: ${lastLogin}`;
      navigate('/home', {state: {username, message}} );
    } else {
      setErrorMessage('Credenciais inválidas');
    }
  };

  return (
    <div className="login-container m-auto w-25 my-5 py-5 shadow d-flex flex-column align-items-center">
        <h2>Login</h2>
        <span className="p-float-label my-4">
            <InputText
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <label htmlFor="username">Usuário</label>
        </span>
        <span className="p-float-label mb-4">
            <Password 
                inputId="password" 
                value={password} 
                feedback={false}
                onChange={(e) => setPassword(e.target.value)} 
                required
            />
            <label htmlFor="password">Password</label>
        </span>
      {errorMessage && <Message className="mb-3" severity="error" text={errorMessage} />}
      <Button label="Acessar" onClick={handleLogin} />
      <p className='my-3' style={{ fontSize: '.8rem' }}>Não tem um acesso? Consulte o <strong><a href='https://github.com/vinecunha/login' target='blank'>README</a></strong> no GitHub</p>
    </div>
  );
};

export default Login;