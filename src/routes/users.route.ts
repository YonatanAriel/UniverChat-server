import express, { Request, Response } from "express";
import usersServices from "../BL/services/users.service";
import os from "os";
import { error } from "console";
const multer = require("multer");
// const upload = multer({ dest: os.tmpdir() });
// import { Multer } from "multer";

// declare global {
//   namespace Express {
//     interface Request {
//       file?: Multer.File;
//     }
//   }
// }
const upload = multer({ dest: "uploads/" });
// const storage = multer.diskStorage({
//   destination: function (
//     req: Request,
//     file: Express.Multer.File,
//     cb: (error: Error | null, destination: string) => void
//   ) {
//     cb(null, "uploads/");
//   },
//   filename: function (
//     req: Request,
//     file: Express.Multer.File,
//     cb: (error: Error | null, filename: string) => void
//   ) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

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
