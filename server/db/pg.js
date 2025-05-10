import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

const pgClient = new Pool({
  connectionString: process.env.PG_URI,
});

export default pgClient;
