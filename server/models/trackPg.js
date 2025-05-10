// server/models/trackPg.js
import pgClient from '../db/pg.js';

export async function createTrack({ title, artist }) {
  const result = await pgClient.query(
    'INSERT INTO tracks (title, artist) VALUES ($1, $2) RETURNING *',
    [title, artist]
  );
  return result.rows[0];
}

export async function getAllTracks() {
  const result = await pgClient.query('SELECT * FROM tracks ORDER BY id DESC');
  return result.rows;
}

export async function deleteTrack(id) {
  const result = await pgClient.query('DELETE FROM tracks WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
}

export async function updateTrack(id, { title, artist }) {
  const result = await pgClient.query(
    'UPDATE tracks SET title = $1, artist = $2 WHERE id = $3 RETURNING *',
    [title, artist, id]
  );
  return result.rows[0];
}
