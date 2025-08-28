import {z} from "zod"

export const VerifySchema= z.object({
    code:z.string()
    .length(6,{message:"Must be 6 digits"})
})
 
