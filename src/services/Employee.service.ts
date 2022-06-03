import { Accounts } from "../entity/Accounts";
import { AccountPayload } from "../interface/Request/addAccountPayload";
import { EmployeePayload } from "../interface/Request/EmployeePayload";
import { LoginPayload } from "../interface/Request/LoginPayload";
import { IEmployee } from "../interface/Responce/IEmployee";
import AppError from "../middleware/AppError";
import { addAccount, getAccount } from "../repository/CreateAccount";
import { getCustomer, updateCustomer } from "../repository/Customer.repository";
import { hasPassword, randomotp, verifyPassword } from "../utils/util";
import {
  addEmployee,
  getEmployee,
  updateEmployee,
} from "../repository/Employee.repository";
import { jwtWebToken } from "../utils/util";
import EmailService from "../events/MailService";
import { Event } from "../events/Event";
import { Subject } from "../events/Subject";
import { VerifyOTP } from "../interface/Request/VerifyOTP";
import { Employees } from "../entity/Employee";


const mailService = new EmailService()

export default class EmployeeService {
  public async createEmployee(body: EmployeePayload): Promise<IEmployee> {

    if(body.email){
      body.email = body.email.toLowerCase();
    }

    body.password = await hasPassword(body.password);

    let user = await addEmployee(body);
    console.log(user);

    let OTP = randomotp();

    user.otp = OTP;

    mailService.receive(Event.EMAIL, Subject.UserSignup, user)

     await updateEmployee({id: user.id}, {otp: user.otp});

     user = await getEmployee({id: user.id})

    const token = jwtWebToken({ id: user.id });

    return { user, token };
  }

  public async getEmployees(body: LoginPayload): Promise<IEmployee> {
    let user = await getEmployee({ email: body.email });

    if (!user) {
      throw new AppError(400, "User not Found");
    }

    let verify =await verifyPassword(body.password, user.password);

    if(!verify){
      throw new AppError(400, "Password Incorrect")
    }

    await updateEmployee({ id: user.id }, { Update_At: new Date() });

    const token = jwtWebToken({ id: user.id });

    return { user, token };
  }

  public async verifyOTP(body: VerifyOTP):Promise<Employees>{
    let user =await getEmployee(body);

    if(body.otp !== user.otp){
      throw new AppError(400, "OTP InCorrect Please check your OTP")
    }

    await updateEmployee({id: user.id}, {otp: null, Update_At: new Date(), email_verified: true})

    let responce:any =  "Email Verified"

    return responce
  }

  public async createCustomerAccount(body: AccountPayload): Promise<Accounts> {
    let users = await getCustomer({id: body.customer_id});
    console.log(users);
    

    if (!users.account_number) {
      let user = await addAccount(body);

      // await getCustomer(user.customer_id);

      await updateCustomer(
        { id: user.customer_id },
        { account_number: user.account_number, account_id: user.id }
      );

      user = await getAccount(user.id);

      mailService.receive(Event.EMAIL, Subject.UserAccount, {account_number: user.account_number, email: users.email})

      let responce:any = "account successfully created.."
      return responce;
    }

    throw new AppError(400, "Account number already exist");
  }
}
