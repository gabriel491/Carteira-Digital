const mongoose = require("mongoose");
const User = require("./user.model");

const expenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Armazena o ID único do MongoDB
        ref: "User", // Nome do Model que criamos antes
        required: true,
    },
    itemName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    value: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now, // Se não informar a data, ele pega a de hoje
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false, // Por padrão, começa como não paga
    },
    category: {
        type: String,
        required: true,
    }
});

const ExpenseModel = mongoose.model("Expense", expenseSchema);

module.exports = ExpenseModel;