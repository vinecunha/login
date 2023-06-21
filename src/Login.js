import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Message } from 'primereact/message';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';

import data from './data/dados.json';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    const user = data.find((item) => item.username === username && item.password === password);

    if (user) {
      const lastLogin = new Date().toLocaleString();
      const message = `Seu último login foi em: ${lastLogin}`;
      navigate('/home', { state: { username, message } });
    } else {
      setErrorMessage('Credenciais inválidas');
    }
  };

  return (
    <div style={{ maxWidth: '540px'}} className="container-sm login-container border border-1 border-info bg-white m-auto my-5 py-5 shadow d-flex flex-column align-items-center">
      <h2>Login</h2>
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
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password"><i className='pi pi-lock me-1'></i>Password</label>
        </span>
        {errorMessage && <Message className="mb-3" severity="error" text={errorMessage} />}
        <Button type="submit" label={errorMessage ? errorMessage : "Acessar"} icon={errorMessage ? "pi pi-exclamation-triangle" : "pi pi-sign-in"} severity={errorMessage ? 'danger' : ''} />
      </form>
      <p className='my-3' style={{ fontSize: '.8rem' }}>Não tem um acesso? Consulte o <strong><a href='https://github.com/vinecunha/login' target='blank'>README</a></strong> no GitHub</p>
    </div>
  );
};

export default Login;