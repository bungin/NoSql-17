import { Router } from "express";
import { thoughtRoutes } from "./thoughtRoutes";
import { userRoutes } from "./userRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

export default router;