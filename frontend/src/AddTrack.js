import React, { useState } from 'react';

const AddTrack = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/tracks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, artist })
      });
      const data = await res.json();
      if (res.ok) {
        alert('✅ Трек добавлен!');
        setTitle('');
        setArtist('');
      } else {
        alert(`❌ Ошибка: ${data.error}`);
      }
    } catch (err) {
      alert('❌ Ошибка при отправке запроса');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Добавить трек</h2>
      <input
        type="text"
        placeholder="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br/>
      <input
        type="text"
        placeholder="Артист"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      /><br/>
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddTrack;
