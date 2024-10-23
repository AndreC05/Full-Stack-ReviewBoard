import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DB_CONN_STRING,
});

db.query(
  `INSERT INTO reviews (author, content, date) VALUES 
  ('User1', 'Very cool message', CURRENT_DATE) ,
  ('User2', 'Not so cool message', '2024-08-09')`
);
