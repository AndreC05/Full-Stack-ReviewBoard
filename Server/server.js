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
app.get("/", (request, response) => {
  response.send("Root route");
});

// /reviews get
app.get("/reviews", async (request, response) => {
  const result = await db.query("SELECT * FROM reviews");
  const reviews = result.rows;
  response.send(reviews);
});

// /reviews post

app.listen("8080", () => {
  console.log("Server running on port 8080");
});
