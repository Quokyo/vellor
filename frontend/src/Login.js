import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('✅ Успешный вход!');
      localStorage.setItem('token', data.token);
    } else {
      setMessage(`❌ Ошибка: ${data.error}`);
    }
  };

  return (
    <div className="login-container">
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Войти</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
