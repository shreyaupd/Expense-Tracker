import mongoose from 'mongoose';
const dbconnect=async()=>{
    try{
        const connection=await mongoose.connect(process.env.MONGO_URI,{
            dbname:"expense-tracker",
        })
        console.log(`MongoDB connected: ${connection.connection.host}`);
    }catch(error){
        console.log("MongoDB connection error",error);
        process.exit(1);
    }
}
export default dbconnect;