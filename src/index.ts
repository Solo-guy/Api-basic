import express from "express";
import "./db";
import Note, { NoteDocument } from "./models/note";

// create a server
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/", (req, res) => {
  console.log(req.body);
  res.json({ message: "I am listening" });
});

interface IncomingBody {
  title: string;
  description?: string;
}

app.post("/create", async (req, res) => {
  const newNote = new Note<NoteDocument>({
    title: req.body.title,
    description: req.body.description,
  });

  await newNote.save();

  res.json({ message: "I am listening to create!" });
});

app.patch("/:noteId", async (req, res) => {
  const { noteId } = req.params;
  // const note = await Note.findById(noteId);
  // if (!note) return res.json({ error: "Note not found" });

  const { title, description } = req.body as IncomingBody;
  // if (title) note.title = title;
  // if (description) note.description = description;

  const note = await Note.findByIdAndUpdate(
    noteId,
    { title, description },
    { new: true }
  );
  if (!note) return res.json({ error: "Note not found" });

  await note.save();

  res.json({ note });
});

app.delete("/:noteId", async (req, res) => {
  const { noteId } = req.params;

  const removedNote = await Note.findByIdAndDelete(noteId);
  if (!removedNote) return res.json({ error: "Could not remove note!" });

  res.json({ message: "Note removed successfully" });
});

app.get("/", async (req, res) => {
  const notes = await Note.find();
  res.json({ notes });
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  if (!note) return res.json({ error: "Note not found!" });
  res.json({ note });
});

// listen to some port
app.listen(8000, () => {
  console.log("listening");
});
