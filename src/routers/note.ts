import { create } from "domain";
import { Router } from "express";
import {
  getAllNotes,
  getSingleNotes,
  removedSingleNote,
  updateSingleNote,
} from "../controllers/note.controller";

const router = Router();

router.post("/create", create);

router.patch("/:noteId", updateSingleNote);

router.delete("/:noteId", removedSingleNote);

router.get("/", getAllNotes);

router.get("/:id", getSingleNotes);

export default router;
