import Income from '../models/income.js';
import Expense from '../models/expense.js';
const dashboardData = async(req, res)=>{
    try{
        const userId = req.user.id;
        const userObjectId= new Types.ObjectId(String(userId))
        
        const totalIncome= await Income.aggregate([
            {$match:{userId:userObjectId}},
            {$group:{_id:null, total:{$sum:"$amount"} }}
        ])

        const totalExpense=await Expense.aggrigate9([
            {$match:{userId:userObjectId}},
            {$group:{_id:null, total:{$sum:"$amount"}}}
        ])
        const last60daysIncomeTransaction= await Income.find({
            userId:userObjectId,
            createdAt:{$gte:new Date(Date.now()-60*60*24*60*1000)}//This gives us transactions from the last 60 days
        }).sort({createdAt:-1})

        const last60daysExpenseTransaction= await Expense.find({
            userId:userObjectId,
            createdAt:{$gte:new Date(Date.now()-60*60*24*60*1000)}//This gives us transactions from the last 60 days
        }).sort({createdAt:-1})

        const expenseLast30days = last60daysExpenseTransaction.reduce(
            (sum,transaction)=>{
                sum+=transaction.amount,
                0
            }
           
        )
         const lastTransactions=[
                ...(await Income.find({userId:userObjectId}).sort({createdAt:-1}).limit(5)).map(
                    (txn)=>({
                         ...txn.toObject(),
                         types:"income",
                    })
                ),
                ...(await Expense.find({userId:userObjectId}).sort({createdAt:-1}).limit(5)).map(
                    (txn)=>({
                         ...txn.toObject(),
                         types:"expense",
                    })
                ),
            ].sort((a,b)=>b.createdAt-a.createdAt)
            res.status(200).json({
                totalIncome:totalIncome[0]?.total || 0,
                totalExpense:totalExpense[0]?.total || 0,
                last60daysIncomeTransaction,
                last60daysExpenseTransaction,
                expenseLast30days:{
                    total:expenseLast30days,
                    transactions:last30daysexpenseTransactions
                },
                lastTransactions:{
                    total:lastTransactions.length,
                    transactions:lastTransactions
                }
            })
    }
    
    catch(err){
        res.status(500).json({message:"Server error"})

    }
}