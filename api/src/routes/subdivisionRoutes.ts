import express from "express";

const subdivisionController = require("../controllers/subdivisionController");
const router = express.Router();

router.get("/", subdivisionController.getAllSubdivisons);
router.get("/count", subdivisionController.getSubdivisonsCount);

export default router;
