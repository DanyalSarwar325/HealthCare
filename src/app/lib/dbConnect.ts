import { promises } from "dns";
import mongoose from "mongoose";

type connectionObject={
    isConnected?:number;
}

const connection:connectionObject={}
 
async function DbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("DB already connected")
    }
    try {
        const db=await mongoose.connect(process.env.MONGO_URI||"" )
       connection.isConnected=db.connections[0].readyState
         console.log("DB connected Sucessfully")
    
    } catch (error) {
         console.log("Error Occured while connecting to MOngo DB")
         process.exit(1)
        
    }

  



}
  export default DbConnect;