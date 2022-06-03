import { Like, UpdateResult } from "typeorm";
import { Customer } from "../entity/Customer";
import { ChangeFor } from "../eumn/ChangePassword";
import { Event } from "../events/Event";
import EmailService from "../events/MailService";
import { Subject } from "../events/Subject";
import { ChangePassword } from "../interface/Request/ChangePassoword";
import { ForgotPassword } from "../interface/Request/ForgotPassword";
import IUser from "../interface/Request/IUser";
import { LoginPayload } from "../interface/Request/LoginPayload";
import { UserRequest } from "../interface/Request/UserRequest";
import { VerifyOTP } from "../interface/Request/VerifyOTP";
import { ICustomer } from "../interface/Responce/ICustomer";
import AppError from "../middleware/AppError";
import {
  addCustomer,
  getCustomer,
  getDetails,
  getTransection,
  updateCustomer,
} from "../repository/Customer.repository";
import { hasPassword, jwtWebToken, randomotp, verifyPassword } from "../utils/util";


const mailService = new EmailService()
export default class CoustomerService {
  // For Signup
  public async createCustomer(body: UserRequest): Promise<ICustomer> {
    
    if(body.email) {
       body.email.toLocaleLowerCase();
    }

    body.password = await hasPassword(body.password);

    let user = await addCustomer(body);

    let OTP = randomotp();
    user.otp = OTP

   await mailService.receive(Event.EMAIL, Subject.UserSignup, user);
  
    await updateCustomer({ id: user.id }, { otp: user.otp });

    const token = jwtWebToken({ id: user.id });

    return { user, token };
  }

  public async verifyCustomer(body: VerifyOTP):Promise<ICustomer>{
    let user = await getCustomer(body);

    if(body.otp !== user.otp){
      throw new AppError(400, "Incorrect OTP");
    }

    await updateCustomer({id: user.id}, {otp: null, email_verified: true, Update_At: new Date()});

    let responce:any = "Email Successfully Verified";

    return responce
  }

  // For Signin
  public async getCustomer(body: LoginPayload): Promise<ICustomer> {
    let user = await getCustomer({ email: body.email });

    if(user.email == body.email){

      const verify = await verifyPassword(body.password, user.password)

      if(verify !== true) throw new AppError(400, "Password is Incorrect")
      
      await updateCustomer({ id: user.id }, { Update_At: new Date() });

      const token = jwtWebToken({ id: user.id });
  
      return { user, token };
    }
  }

  public async getUserData(body: IUser): Promise<Customer> {
    let user = await getDetails(body.id);

    if (!user) throw new AppError(400, "User not Registered");

    return user;
  }

  public async checkTransection(
    body: IUser
  ): Promise<Customer | any> {

    let user = await getCustomer({id: body.id});
    console.log(user)

    if(!user) throw new AppError(400, "User not found..");

    if(user){
     user =  await getTransection(user)
     
       return user;
    }
  }

  public async forgotPassword(body: ForgotPassword):Promise<ICustomer>{
    let user =await getCustomer({email: body.email});

    if(!user) {
      throw new AppError(400, "User not found..");
    }

    let OTP = randomotp();
    user.otp = OTP;

    await updateCustomer({id: user.id}, {otp: user.otp});

    mailService.receive(Event.EMAIL, Subject.ForgotPassword, user);

    let responce: any = `Forgot Password link send on ${user.email}`

    return responce
  }

  public async changePassword(body: ChangePassword):Promise<ICustomer>{

    let user = await getCustomer({id: body.id});
    let password = await hasPassword(body.newPassword);
    
      if(!user){
       throw new AppError(400, "User not found");
      }

      if(user){

      if(body.For == ChangeFor.ChangePassword){

        let verify =await verifyPassword(body.oldPassword, user.password);

        if(!verify) throw new AppError(400, "Old password is Incorrect")

        if(verify){
          await updateCustomer({id: user.id}, {password: password});
        }  
        
      }
      if(body.For == ChangeFor.ForgotPassword){
        if(user.otp == body.otp){
          await updateCustomer({id: user.id}, {otp:null, password: password});
        }
      }

      let responce:any = "Password Changed Successfull";

      return responce
    } 
  }
}
