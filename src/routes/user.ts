import {Router } from "express";
import { createUser, login } from "../controllers/user";

const router = Router();

router.post("/", createUser);
router.post("/login", login);

export default router;
