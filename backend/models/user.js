import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Schema
const Userschema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePictureUrl: { type: String, default: null },
}, {
  timestamps: true
});

// Hashing the password before saving
Userschema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords during login
Userschema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Exporting the model (default export)
export default mongoose.model("User", Userschema);
