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
    }
    
    catch(err){

    }
}