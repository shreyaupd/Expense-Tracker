import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
// Schema
const Userschema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String, required:true,unique:true},
    password:{type:String,required:true},
    profilePictureUrl:{type:String,default:null},
},
    {timestamps:true}
)

// Hashing the password
Userschema.pre("save",async function (next){
      if(!this.modified("password")){// If the password hasn't been modified, skip hashing
        return next();
      }
      this.password=await bcrypt.hash(this.password,10);
      next();
})

// Method to compare passwords
UserSchema.model.comparePassword=async function (candidatePassword) { //comparePassword is a custom method
    return await bcrypt.compare(candidatePassword, this.password);
}

//export
model.exports = mongoose.model("User",Userschema);
