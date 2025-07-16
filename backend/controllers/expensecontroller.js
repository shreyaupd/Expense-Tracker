import Expense from '../models/expense.js';
import xlsx from 'xlsx';
const addexpense = async (req, res) => {
    const userId = req.user.id;
    const { amount, icon, data, category} = req.body;
    try {
        if (!amount || !category || !data) {
            return res.status(400).json({ message: "All fields required" })
        }
        const newExpense = new Expense({
            userId,
            amount,
            icon,
            category,
            date: new Date(data)
        });
         await newExpense.save(); //await because it needs to connect to the database
        res.status(200).json(newExpense);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" })
    }
}

const getexpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 }) //date -1 means latest date first
        res.status(200).json(expense); 
    }
    catch (err) {
        res.status(500).json({ message: "Server error" })
    }
}
const deleteexpense = async (req, res) => {
    const userId = req.user.id;
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Expense deleted successfully" })
    }
    catch (err) {
        res.status(500).json({ message: "Server error" })
    }
}
const downloadexpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date
        }))

        const wb = xlsx.utils.book_new();                            // Create a blank Excel file
        const ws = xlsx.utils.json_to_sheet(data);                   // Convert JSON data to worksheet
        xlsx.utils.book_append_sheet(wb, ws, 'Expense');              // Add worksheet to workbook
        xlsx.writeFile(wb, 'Expense.xlsx');                          // Save Excel file to disk
        res.download('Expense.xlsx');                                // Send file to client for download

    }
    catch (err) {
        res.status(500).json({ message: "Server error" })
    }
}

export { addexpense, getexpense, deleteexpense, downloadexpense };