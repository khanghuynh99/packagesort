import express from "express";
import mysql from "mysql";

const PORT = process.env.PORT || 3001;

const app = express();

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"test"
})

app.get("/", (req,res)=>{
  res.json("hello this is the backend")
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
