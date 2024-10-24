import { Router } from "express";
import {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} from "../../controllers/thoughtController";

const router = Router();

router.route("/").get(getThoughts).post(createThought);
router.route("/:thoughtId").get(getThoughtById).put(updateThought).delete(deleteThought);
router.route("/:thoughtId/reactions").post(addReaction).delete(deleteReaction)

export { router as thoughtRoutes }