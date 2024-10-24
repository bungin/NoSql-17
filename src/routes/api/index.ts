import { Router } from "express";
import { thoughtRoutes } from "./thoughtRoutes.js";
import { userRoutes } from "./userRoutes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

export default router;