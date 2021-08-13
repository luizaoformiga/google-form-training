import { Router } from "express";
import { UserRouter, FormRouter } from "./index";

const router = Router();

router.use("/user", UserRouter);
router.use("/form", FormRouter);

router.get("/", (req, res) => {
  res.send("Router.js working fine");
});

export default router;
