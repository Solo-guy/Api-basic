import express from "express";
import "./db";
import noteRouter from "./routers/note";

// create a server
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/note", noteRouter);

// listen to some port
app.listen(8000, () => {
  console.log("listening");
});
