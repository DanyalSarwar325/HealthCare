import { match } from "assert";
import mongoose,{Schema,Document} from "mongoose";

export interface Message extends Document{
    createdAt:Date,
    content:string

}

const MessageSchema:Schema<Message>=new Schema({
    createdAt:{
        type:Date,
        default:Date.now
    },
    content:{
        type:String
    }
});
export  interface User  extends Document{
    username:string,
    email:string,
    password:string,
    // expiryDate?:string
    // verifyCode?:string
    // isVerified?:boolean
    // messages?:Message[]

}

const UserSchema=new mongoose.Schema({
    username:{
        type:String
      

    },
    email:{
        type:String,
        // required:[true,"Email is required"],
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Enter Valid Email"]
    },
    password:{
        type:String,
        // required:[true,"Password is required"],
        trim:true
    }
    //  isVerified:{
    //     type:Boolean,
    //     default:false
    //  },
    // messages:{
    //     type:[MessageSchema]
    // }
})

const UserModel=(mongoose.models.User as mongoose.Model<User> )|| (mongoose.model<User>("User",UserSchema))
export default UserModel;