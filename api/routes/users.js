import express from "express";
import { updateUser, deleteUser, getUser, getUsers } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// //checkauth
// router.get("/checkauth",verifyToken, (req, res, next) => {
//     res.send("Hello User, you are logged in");
//     next();
// })

// //checkuser
// router.get("/checkuser/:id",verifyUser, (req, res, next) => {
//     res.send("Hello User, you are logged in and you can delete your account");
//     next();
// })

// //checkadmin
// router.get("/checkadmin/:id",verifyAdmin, (req, res, next) => {
//     res.send("Hello Admin, you are logged in and you can delete all the accounts");
//     next();
// })


//update
router.put("/:id", verifyUser, updateUser)

//delete
router.delete("/:id", verifyUser, deleteUser)

//get
router.get("/:id", verifyUser, getUser) 

//getAll
router.get("/", verifyAdmin, getUsers)


export default router;  