import express from "express";
import { asyncLocalStorage } from "./storage";

export const router = express.Router();

router.get("/", (req, res) => {
    asyncLocalStorage.run(2, () => {
        console.log("/secret value saved");
    });
    res.send("hello");
})