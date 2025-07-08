import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const generateToken = (user) => {
  return jwt.sign(
    {id:user._id},
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

const register=async (req, res) => {
    const {username,email,password,profilePictureUrl}=req.body
    if(!username || !email || !password){
        return res.status(400).json({message:"Please fill all the fields"})
    }
    try{
       const existingUser = await User.findOne({email});
       if(existingUser){
              return res.status(400).json({message:"User already exists"})
   }

         const user ={
            username,
            email,
            password,
            profilePictureUrl
         }

         res.status(201).json({
            id:user._id,
            message:"User registered successfully",
            user,
            token:generateToken(user._id)
         });

    }catch(error){
        res.status(500).json({message:"Something went wrong"})
    }
}
const login=async (req, res) => {}
const geuser=async (req, res) => {}

