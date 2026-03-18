const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// connect to MongoDB
mongoose.connect("mongodb://mongo-service:27017/expenses");

// schema
const Expense = mongoose.model("Expense", {
  title: String,
  amount: Number,
  category: String,
  date: { type: Date, default: Date.now }
});

// get all expenses
app.get("/expenses", async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

// add new expense
app.post("/expenses", async (req, res) => {
  const expense = new Expense(req.body);
  await expense.save();
  res.json(expense);
});

// delete expense
app.delete("/expenses/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Expense deleted" });
});

app.listen(3000, () => {
  console.log("Expense API running on port 3000");
});