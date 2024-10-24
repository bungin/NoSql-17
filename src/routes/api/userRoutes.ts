import { Router } from "express";
import {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
} from "../../controllers/userController.js";
const router = Router();

router.route("/").get(getUsers).post(createUser);
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);
router.route("/:userId/friends/:friendId").put(addFriend).delete(removeFriend);

export { router as userRoutes };
