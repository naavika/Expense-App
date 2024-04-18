const expenseModels = require('../models/expenseModels');

exports.expensepageController = async (req, res) => {
    try {
        const existingExpense = await expenseModels.findOne({
            where: {
                description: req.body.description
            }
        });
        if (existingExpense) {
            return res.status(409).json({ message: 'Expense already exists', success: false });
        }
        const newExpense = await expenseModels.create(req.body);
        res.status(201).json({ message: 'Expense added successfully', success: true, newExpense });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
};

exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await expenseModels.findAll();
        res.status(200).json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Error fetching expenses: ${error.message}` });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const expense = await expenseModels.destroy({
            where: { id: req.params.id }
        });
        if (!expense) {
            return res.status(404).json({ success: false, message: 'Expense not found' });
        }
        res.status(200).json({ success: true, message: 'Expense deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const { description, amount, date } = req.body;
        const updatedExpense = await expenseModels.update({ description, amount, date }, {
            where: { id: req.params.id }
        });
        if (updatedExpense[0] === 0) {
            return res.status(404).json({ success: false, message: 'Expense not found' });
        }
        res.status(200).json({ success: true, message: 'Expense updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
};
