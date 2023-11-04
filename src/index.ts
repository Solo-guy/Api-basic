import express from "express";
import "./db";

// create a server
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/", (req, res) => {
  console.log(req.body);
  res.json({ message: "I am listening" });
});

app.post("/create", (req, res) => {
  console.log(req.body);
  res.json({ message: "I am listening to create!" });
});

// listen to some port
app.listen(8000, () => {
  console.log("listening");
});
