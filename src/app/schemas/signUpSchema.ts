import {z} from "zod"

export const UserNameValidation=z
.string()
.min(5,{message:"Username must be at least 5 Characters"})
.max(20,{message:"Username must be more than 20 Characters"})

export const signUpSchema=z.object({
    username:UserNameValidation,
    email:z.email(),
    password:z.string().min(6,"Minimum 6 characters Required")
})

