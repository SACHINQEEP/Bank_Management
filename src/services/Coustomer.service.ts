import { UpdateResult } from "typeorm";
import { Customer } from "../entity/Customer";
import { Event } from "../events/Event";
import EmailService from "../events/MailService";
import { Subject } from "../events/Subject";
import IUser from "../interface/Request/IUser";
import { LoginPayload } from "../interface/Request/LoginPayload";
import { UserRequest } from "../interface/Request/UserRequest";
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
    body.password = await hasPassword(body.password);
    if(body.email) {
       body.email.toLocaleLowerCase();
    }

    let user = await addCustomer(body);

    let OTP = randomotp();
    user.otp = OTP

    // send mail to verify user email

   await mailService.receive(Event.EMAIL, Subject.UserSignup, user);
  
    
  
    // await updateCustomer({ id: user.id }, { password: hashword, otp: OTP });

    const token = jwtWebToken({ id: user.id });

    return { user, token };
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
}
