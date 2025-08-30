const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define expense schema
const ExpenseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Define user schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    expenses: [ExpenseSchema]  // Array of expense objects
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
