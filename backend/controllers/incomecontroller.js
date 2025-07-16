import Income from '../models/income.js';
import User from '../models/user.js';
import xlsx from 'xlsx';
const addincome = async (req, res) => {
    const userId = req.user.id;
    const { amount, icon, data } = req.body;
    try {
        if (!amount || !icon || !data) {
            return res.status(400).json({ message: "All fields required" })
        }
        const newIncome = new Income({
            userId,
            amount,
            icon,
            date: new Date(data)
        });
        await income.save() //await because it needs to connect to the database
        res.status(200).json(newIncome)
    }
    catch (err) {
        res.status(500).json({ message: "Server error" })
    }
}
const getincome = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 }) //date -1 means latest date first
    }
    catch (err) {
        res.status(500).json({ message: "Server error" })
    }
}
const deleteincome = async (req, res) => {
    const userId = req.user.id;
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Income deleted successfully" })
    }
    catch (err) {
        res.status(500).json({ message: "Server error" })
    }
}
const downloadincome = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date
        }))

        const wb = xlsx.utils.book_new();                            // Create a blank Excel file
        const ws = xlsx.utils.json_to_sheet(data);                   // Convert JSON data to worksheet
        xlsx.utils.book_append_sheet(wb, ws, 'Income');              // Add worksheet to workbook
        xlsx.writeFile(wb, 'Income.xlsx');                           // Save Excel file to disk
        res.download('Income.xlsx');                                 // Send file to client for download

    }
    catch (err) {
        res.status(500).json({ message: "Server error" })
    }
}

export { addincome, getincome, deleteincome, downloadincome };