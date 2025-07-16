import Income from '../models/income.js';
import User from '../models/user.js';
const addincome = async(req, res)=>{
    const userId=req.user.id;
    const {amount, icon, data}=req.body;
    try{
        if(!amount || !icon || !data){
            return res.status(400).json({message:"All fields required"})
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
    catch(err){
        res.status(500).json({message: "Server error"})
    }
}
const getincome = async(req, res)=>{
  
}
const deleteincome = async(req, res)=>{
    
}
const downloadincome = async(req, res)=>{}

export {addincome, getincome, deleteincome, downloadincome};