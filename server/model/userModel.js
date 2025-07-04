import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        // required:true
        default:'1234567890'
    },
    image:{
        type:String,
        default:"https://avatar.iran.liara.run/public"
    },
    role:{
        type:Number,
        default:0
    },
    tokenVersion:{
        type:String
    }
},{
    timestamps:true
});

// make pre middleware for hashed pwd
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
});

userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
};
const User=mongoose.model("User",userSchema)
export default User;