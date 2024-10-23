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

//endpoints
app.get("/", (request, response) => {
  response.send("Root route");
});

app.listen("8080", () => {
  console.log("Server running on port 8080");
});
