const express = require('express');
const router = express.Router();
const { expensepageController, getAllExpenses, deleteExpense, updateExpense } = require('../controllers/expenseCtrl');

// Define your routes
router.post('/expensepage', expensepageController);
router.get('/expenses', getAllExpenses);
router.delete('/expenses/:id', deleteExpense);
router.put('/expenses/:id', updateExpense);

module.exports = router;
