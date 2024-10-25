//import modules
import pg from "pg";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//Server setup
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

//connect to database
const db = new pg.Pool({ connectionString: process.env.DB_CONN_STRING });

//Endpoints
//Root route
app.get("/", (_, response) => {
  response.send("Root route");
});

// /reviews get
app.get("/reviews", async (_, response) => {
  //order reviews in descending order
  const result = await db.query(`SELECT 
      id, 
      author, 
      content, 
      TO_CHAR(date, 'DD-MM-YYYY') AS date, 
      likes 
     FROM reviews 
     ORDER BY id DESC`);

  const reviews = result.rows;

  response.send(reviews);
});

// /reviews post
app.post("/reviews", async (request, response) => {
  //get request body
  const { author, content } = request.body;

  //query to database
  const insertData = await db.query(
    `INSERT INTO reviews (author, content) VALUES ($1, $2)`,
    [author, content]
  );

  //response
  response.json(insertData);
});

//reviews put
app.put("/reviews", async (request, response) => {
  const { id } = request.body;
  const updateLikes = await db.query(
    `UPDATE reviews SET likes = likes + 1 WHERE id = ${id}`
  );
  response.send(updateLikes);
});

//reviews put
app.delete("/reviews", async (request, response) => {
  const { id } = request.body;
  const updateLikes = await db.query(`DELETE FROM reviews WHERE id = ${id}`);
  response.send(updateLikes);
});

//port
app.listen("8080", () => {
  console.log("Server running on port 8080");
});
