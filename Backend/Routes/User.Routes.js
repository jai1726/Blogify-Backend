import express from "express";
import { getAllUser ,SignUp, Login} from "../Controller/User.Controller.js";

const router = express.Router();

router.get("/", getAllUser);
router.post("/signup",SignUp);
router.post("/login",Login);
export default router;