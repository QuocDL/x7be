import { Router } from "express";
import {
  loginController,
  requestRegisterController,
} from "./auth.controller.js";

const authRoutes = Router();

authRoutes.post("/login", loginController);
authRoutes.post("/request-register", requestRegisterController);

export default authRoutes;
