import Income from '../models/income.js';
import Expense from '../models/expense.js';
import { Types } from 'mongoose';

const dashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // Total income aggregation
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Total expense aggregation (✅ fixed typo here)
    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Last 60 days income
    const last60daysIncomeTransaction = await Income.find({
      userId: userObjectId,
      createdAt: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
    }).sort({ createdAt: -1 });

    // Last 60 days expense
    const last60daysExpenseTransaction = await Expense.find({
      userId: userObjectId,
      createdAt: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
    }).sort({ createdAt: -1 });

    // Filter expense from last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const last30daysExpenseTransactions = last60daysExpenseTransaction.filter(
      (txn) => txn.createdAt >= thirtyDaysAgo
    );

    const expenseLast30days = last30daysExpenseTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Combine last 5 income and last 5 expense
    const lastTransactions = [
      ...(await Income.find({ userId: userObjectId }).sort({ createdAt: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          types: "income",
        })
      ),
      ...(await Expense.find({ userId: userObjectId }).sort({ createdAt: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          types: "expense",
        })
      )
    ].sort((a, b) => b.createdAt - a.createdAt); // most recent first

    res.status(200).json({
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last60daysIncomeTransaction,
      last60daysExpenseTransaction,
      expenseLast30days: {
        total: expenseLast30days,
        transactions: last30daysExpenseTransactions
      },
      lastTransactions: {
        total: lastTransactions.length,
        transactions: lastTransactions
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default dashboardData;
