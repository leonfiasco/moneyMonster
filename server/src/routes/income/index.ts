import express from "express";
const router = express.Router();

const incomeController = require("../../controllers/income");

router.post("/addIncome", incomeController.add_income);

export default router;
