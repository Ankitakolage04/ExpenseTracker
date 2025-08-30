const { addExpenses, fetchExpenses, deleteExpenses } = require('../Controllers/ExpenseController');
const router = require('express').Router();
const authMiddleware = require('../Middlewares/Auth'); // protect routes

// fetch expenses
router.get('/', authMiddleware, fetchExpenses);

// add expenses
router.post('/', authMiddleware, addExpenses);

// delete expenses (pass expenseId in params)
router.delete('/:expenseId', authMiddleware, deleteExpenses);

module.exports = router;
