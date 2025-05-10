import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', password: '' });
  const [trackData, setTrackData] = useState({ title: '', artist: '' });
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      const res = await fetch('http://localhost:3001/tracks');
      const data = await res.json();
      setTracks(data);
    } catch (err) {
      alert('Ошибка при загрузке треков');
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (data.token) {
        setToken(data.token);
        alert('✅ Вход выполнен');
      } else {
        alert(data.error || 'Ошибка входа');
      }
    } catch {
      alert('Ошибка сервера при входе');
    }
  };

  const handleRegister = async () => {
    try {
      const res = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });
      const data = await res.json();
      if (res.status === 201) {
        alert('✅ Регистрация успешна');
      } else {
        alert(data.error || 'Ошибка регистрации');
      }
    } catch {
      alert('Ошибка сервера при регистрации');
    }
  };

  const handleAddTrack = async () => {
    try {
      const res = await fetch('http://localhost:3001/tracks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(trackData),
      });
      const data = await res.json();
      if (res.status === 201) {
        setTracks([...tracks, data]);
        setTrackData({ title: '', artist: '' });
      } else {
        alert(data.error || 'Ошибка при добавлении');
      }
    } catch {
      alert('Ошибка сервера');
    }
  };

  return (
    <div className="app-wrapper">

      <div className="card">
        <h2>Вход</h2>
        <input
          placeholder="Имя пользователя"
          value={loginData.username}
          onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        />
        <button onClick={handleLogin}>Войти</button>
      </div>

      <div className="card">
        <h2>Регистрация</h2>
        <input
          placeholder="Имя пользователя"
          value={registerData.username}
          onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={registerData.password}
          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
        />
        <button onClick={handleRegister}>Зарегистрироваться</button>
      </div>

      <div className="card">
        <h2>Добавить трек</h2>
        <input
          placeholder="Название"
          value={trackData.title}
          onChange={(e) => setTrackData({ ...trackData, title: e.target.value })}
        />
        <input
          placeholder="Артист"
          value={trackData.artist}
          onChange={(e) => setTrackData({ ...trackData, artist: e.target.value })}
        />
        <button onClick={handleAddTrack}>Добавить</button>
      </div>

      <div className="card">
        <h2>Список треков</h2>
        <ul className="track-list">
          {tracks.map((track) => (
            <li className="track-item" key={track.id}>
              {track.title} — {track.artist}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default App;
