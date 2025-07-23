import jwt from 'jsonwebtoken';
import User from '../models/user.js';
export const protect = async (req, res, next) => {
 let token=req.headers.authorization? req.headers.authorization.split(" ")[1] : null;
 if(!token){
  return res.status(401).json({message:"Unauthorized access"});
 }
 try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
 }catch(error){
    return res.status(401).json({message:"Unauthorized access"});
 }
}    