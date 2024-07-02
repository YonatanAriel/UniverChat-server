import express, { Request, Response } from "express";
import usersServices from "../BL/services/users.service";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express.Router();
// const {verify} = require("../auth")

//

router.get("/", (req: Request, res: Response) => {
  try {
    const allUsers = usersServices.getAllUsers();
    res.send(allUsers);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.post("/sign-in", (req: Request, res: Response) => {
  try {
    const response = usersServices.signIn(req.body);
    res.send(response);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post(
  "/sign-up",
  upload.single("photo"),
  async (req: Request, res: Response) => {
    try {
      const photoPath = req.file?.path;
      const response = await usersServices.signUp(req.body, photoPath);
      res.send(response);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
);

module.exports = router;
