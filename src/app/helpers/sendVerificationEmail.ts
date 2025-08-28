import {resend} from '@/app/lib/resend'
import VerificationEmail from '../../../emails/verificationEmail'
import { ApiResponse } from '../types/ApiResponse'

export async function SendVerificationEmail(
    username:string,
    email:string,
    verifyCode:string
    // success:boolean,
    // message:string
):Promise<ApiResponse>{
    try {
          await resend.emails.send({
      from: 'onboarding@resend.dev',
      to:email,
      subject: 'Mystery Message Verification Code',
      react: VerificationEmail({ username, otp: verifyCode }),
    });
          return{
            success:true,
            message:"Failed to send Verification code"
          }
        
    } catch (err) {
        console.log("Failed to send Verification code",err)
        return{
            success:false,
            message:"Failed to send Verification code"
        }
    }

}