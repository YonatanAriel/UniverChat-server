"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_service_1 = __importDefault(require("../BL/services/users.service"));
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express_1.default.Router();
// const {verify} = require("../auth")
//
router.get("/", (req, res) => {
    try {
        const allUsers = users_service_1.default.getAllUsers();
        res.send(allUsers);
    }
    catch (err) {
        res.sendStatus(400).send(err);
    }
});
router.post("/sign-in", (req, res) => {
    try {
        const response = users_service_1.default.signIn(req.body);
        res.send(response);
    }
    catch (err) {
        res.sendStatus(400).send(err);
    }
});
router.post("/sign-up", upload.single("photo"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const photoPath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        const response = yield users_service_1.default.signUp(req.body, photoPath);
        res.send(response);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400).send(err);
    }
}));
module.exports = router;
