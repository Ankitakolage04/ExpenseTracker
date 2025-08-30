const Usermodel = require('../Models/User');

// ➤ Add expense
const addExpenses = async (req, res) => {
    try {
        const { _id } = req.user; // from JWT middleware
        const body = req.body;

        if (!body || Object.keys(body).length === 0) {
            return res.status(400).json({ message: "Expense data is required", success: false });
        }

        const userData = await Usermodel.findByIdAndUpdate(
            _id,
            { $push: { expenses: body } },
            { new: true }
        );

        if (!userData) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        return res.status(200).json({
            message: "Expense added successfully",
            success: true,
            data: userData.expenses
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message,
            success: false
        });
    }
};

// ➤ Fetch all expenses
const fetchExpenses = async (req, res) => {
    try {
        const { _id } = req.user;

        const userData = await Usermodel.findById(_id).select('expenses');

        if (!userData) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        return res.status(200).json({
            message: "Fetched expenses successfully",
            success: true,
            data: userData.expenses
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message,
            success: false
        });
    }
};

// ➤ Delete expense by expenseId
const deleteExpenses = async (req, res) => {
    try {
        const { _id } = req.user;
        const { expenseId } = req.params;

        if (!expenseId) {
            return res.status(400).json({ message: "Expense ID is required", success: false });
        }

        const userData = await Usermodel.findByIdAndUpdate(
            _id,
            { $pull: { expenses: { _id: expenseId } } },
            { new: true }
        );

        if (!userData) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        return res.status(200).json({
            message: "Expense deleted successfully",
            success: true,
            data: userData.expenses
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message,
            success: false
        });
    }
};

module.exports = {
    addExpenses,
    fetchExpenses,
    deleteExpenses
};
