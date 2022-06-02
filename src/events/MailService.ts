import forgotpassword from "../template/forgotpassword";
import signupMail from "../template/welComeMail";
import { Event } from "./Event";
import Receive from "./Receive";
import { Subject } from "./Subject";
import {sendMail}  from "../utils/util"
import userAccount from "../template/createAccountTemp";

export default class EmailService implements Receive {
 async receive(topic: Event, subject: Subject, data: any) {

       let emailHtml = '';
       let emailSubject = '';
       
       switch (subject) {
           case Subject.UserSignup:
               emailSubject = "Verify Your Email.."
               emailHtml = signupMail(data.name, data.email, data.otp)
               break;
           case Subject.ForgotPassword: 
           emailSubject ="Forgot Password"
           emailHtml = forgotpassword(data.otp);
               break;
           case Subject.UserAccount: 
           emailSubject = "Account Created"
           emailHtml = userAccount(data.fullname, data.email, data.accountNumber, data.branch)
               break;
       }

       await sendMail(data.email, emailSubject, emailHtml)
   }   
}