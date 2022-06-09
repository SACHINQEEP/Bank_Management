import { Body, Post, Route, Security, Tags } from "tsoa";
import { Customer } from "../entity/Customer";
import { AccountOTP } from "../interface/Request/AccountOTP";
import { ChangePassword } from "../interface/Request/ChangePassoword";
import { ForgotPassword } from "../interface/Request/ForgotPassword";
import IUser from "../interface/Request/IUser";
import { LoginPayload } from "../interface/Request/LoginPayload";
import { UserRequest } from "../interface/Request/UserRequest";
import { VerifyOTP } from "../interface/Request/VerifyOTP";
import { ICustomer } from "../interface/Responce/ICustomer";
import CoustomerServic from "../services/Coustomer.service";

@Route("/customer")
@Tags("Customer")
export default class CustomerController {
  private coustomerservic: CoustomerServic;

  constructor(coustomerServic: CoustomerServic) {
    this.coustomerservic = coustomerServic;
  }

  @Post("/signup")
  public async signup(@Body() body: UserRequest): Promise<ICustomer> {
    return this.coustomerservic.createCustomer(body);
  }

  @Security("authorization")
  @Post("/verify-otp")
  public async verifyEmail(@Body() body: VerifyOTP): Promise<ICustomer> {
    return this.coustomerservic.verifyCustomer(body);
  }

  @Post("/login")
  public async login(@Body() body: LoginPayload): Promise<ICustomer> {
    return this.coustomerservic.getCustomer(body);
  }

  @Post("/forgot-password")
  public async forgotPassword(
    @Body() body: ForgotPassword
  ): Promise<ICustomer> {
    return this.coustomerservic.forgotPassword(body);
  }

  @Post("/change-password")
  public async changePassword(
    @Body() body: ChangePassword
  ): Promise<ICustomer> {
    return this.coustomerservic.changePassword(body);
  }

  @Security("authorization")
  @Post("/get-user-details")
  public async getUserDetails(@Body() body: IUser): Promise<Customer> {
    return this.coustomerservic.getUserData(body);
  }

  @Security("authorization")
  @Post("/transection")
  public async getUserTransection(
    @Body() body: IUser
  ): Promise<Customer | any> {
    return this.coustomerservic.checkTransection(body);
  }

  @Security("authorization")
  @Post("/create-account-pincode")
  public async createAccountPincode(
    @Body() body: AccountOTP
  ): Promise<Customer> {
    return this.coustomerservic.createAccountPassword(body);
  }
}
