import express from "express";
import {login, logout, adminLogin } from "../controllers/common.js";
import { getDataFromToken } from "../utils/featues.js";
// import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/logout", logout);
router.post("/login", login);
router.post("/login/admin",adminLogin);
router.get("/cookiescheck",getDataFromToken)


// router.get("/me", isAuthenticated, getMyProfile);

export default router;