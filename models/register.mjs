import mongoose from 'mongoose'
 const RegisterSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        min:3
    },email:{
        type:String,
        require:true,
        max:50
    },
    password:{
        type:String,
        require:true,
        min:3
    },

 },{timestamps:true}
 )
 export default mongoose.model("User",RegisterSchema)