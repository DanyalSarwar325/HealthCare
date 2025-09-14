
import mongoose,{Document} from "mongoose";




export  interface User  extends Document{
    username:string,
    email:string,
    password:string,
    Phone?:number,
    Gender?:string,
    Address?:string,

 
}

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        trim:true
    },
    email:{
        type:String,
         required:[true,"Email is required"],
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Enter Valid Email"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        trim:true
    },
    Phone:{
        type:Number,
        match:[/^\+?[1-9]\d{1,14}$/,"Enter Valid Phone Number"]
    },
    Gender:{
        type:String,
        enum:["Male","Female"]
    },
    Address:{
        type:String,
        // required:[true,"Address is required"]
    }

   
},{timestamps:true}); 

const UserModel=(mongoose.models.User as mongoose.Model<User> )|| (mongoose.model<User>("User",UserSchema))
export default UserModel;