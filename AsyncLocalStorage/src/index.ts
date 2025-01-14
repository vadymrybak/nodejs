import express, { Request, Response } from "express";
import { router } from "./extraRoute";
import { asyncLocalStorage } from "./storage";

const app: express.Application = express();

app.use("/secret", router);
app.get("/not", (req, res) => {
    asyncLocalStorage.run({ id: 1 }, () => {
        console.log("/not value saved", asyncLocalStorage.getStore());
        res.send("not");

    });
});

app.get("/l",  (req, res) => {
    console.log("L",  asyncLocalStorage.getStore());

    res.json( asyncLocalStorage.getStore());
    // res.send("logs");
});

app.listen(3000, () => {
    console.log("server lister on port " + 3000);
    console.log(process.pid);
});
