// import express from "express";
// import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import { singleUpload } from "../middlewares/mutler.js";
 
// const router = express.Router();

// router.route("/register").post(singleUpload,register);  //http://localhost:8000/api/v1/user/register
// router.route("/login").post(login);  //http://localhost:8000/api/v1/user/login
// router.route("/logout").get(logout);//http://localhost:8000/api/v1/user/logout
// router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile); //http://localhost:8000/api/v1/user/profile/update

// export default router;

import express from "express";
import { login, logout, register, updateProfile, forgotPassword, resetPassword } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").put(isAuthenticated, singleUpload, updateProfile);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);

export default router;