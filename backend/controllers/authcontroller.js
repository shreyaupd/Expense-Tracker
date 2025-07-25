import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Function to generate JWT token for a user
const generateToken = (user) => {
  // Sign the token with user's ID as payload, secret from env, expires in 1 hour
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const register = async (req, res) => {
  // Destructure user info from request body
  const { username, email, password, profilePictureUrl } = req.body;

  // Validate required fields
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  try {
    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new User instance (not yet saved to DB)
    const user = new User({
      username,
      email,
      password, // Will be hashed automatically by pre-save hook in User model
      profilePictureUrl
    });

    // Save user to the database; triggers pre-save hooks (e.g. password hashing)
    await user.save();

    // Convert Mongoose document to plain object and exclude password field
    const { password: _, ...userWithoutPassword } = user.toObject();

    // Send success response with user info (excluding password) and JWT token
    res.status(201).json({
      id: user._id,
      message: "User registered successfully",
      user: userWithoutPassword,
      token: generateToken(user),
    });
  } catch (error) {
    // Catch and respond with a generic error message if something goes wrong
    res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async(req,res)=>{
  const{email,password}=req.body;
  if(!email || !password){
    return res.status(400).json({message:"Please fill all the fields"})
  }
  try{
    const user= await User.findOne({email})
    if(!user){
      return res.status(404).json({message:"User not found"})
    }

    const isMatch= await user.comparePassword(password)
    if(!isMatch){
      return res.status(401).json({message:"Invalid credentials"})
    }

    res.status(200)
    .json({message:"Login successful",
      id:user._id,
      user,
      token:generateToken(user)})
  }catch(error){
    console.log("Login error",error)
    res.status(500).json({message:"Something went wrong"})
  }
}

const getuser = async (req, res) => {
   try{
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
   }catch(error){
    res.status(500).json({ message: "Something went wrong" });
   }
 }
export { register, login, getuser };