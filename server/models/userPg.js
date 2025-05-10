import { pgPool } from '../db/pg.js';

export async function createUser(username, passwordHash) {
  const result = await pgPool.query(
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
    [username, passwordHash]
  );
  return result.rows[0];
}

export async function findUserByUsername(username) {
  const result = await pgPool.query(
    'SELECT * FROM users WHERE username = $1',
    [username]
  );
  return result.rows[0];
}
