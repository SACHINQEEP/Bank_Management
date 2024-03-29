import {
  Body,
  File,
  Path,
  Post,
  Request,
  Route,
  Security,
  Tags,
  UploadedFile
} from 'tsoa'
import { Customer } from '../entity/Customer'
import { AccountOTP } from '../interface/Request/AccountOTP'
import { ChangePassword } from '../interface/Request/ChangePassoword'
import { ForgotPassword } from '../interface/Request/ForgotPassword'
import IUser from '../interface/Request/IUser'
import { LoginPayload } from '../interface/Request/LoginPayload'
import { UserRequest } from '../interface/Request/UserRequest'
import { VerifyOTP } from '../interface/Request/VerifyOTP'
import { ICustomer } from '../interface/Responce/ICustomer'
import CoustomerServic from '../services/Coustomer.service'
import * as express from 'express'
import { Payment } from '../interface/Request/PaymentPayload'
import { Transection } from '../entity/Transection'
import { ITransection } from '../interface/Responce/ITransection'
import { RequestedMoney } from '../interface/Request/RequestedMoney'
import { requestLoan } from '../interface/Request/RequestLoan'
import { Employees } from '../entity/Employee'
@Route('/customer')
@Tags('Customer')
export default class CustomerController {
  private coustomerservic: CoustomerServic

  constructor (coustomerServic: CoustomerServic) {
    this.coustomerservic = coustomerServic
  }

  @Post('/signup')
  public async signup (@Body() body: UserRequest): Promise<ICustomer> {
    return this.coustomerservic.createCustomer(body)
  }

  @Security('authorization')
  @Post('/verify-otp')
  public async verifyEmail (@Body() body: VerifyOTP): Promise<ICustomer> {
    return this.coustomerservic.verifyCustomer(body)
  }

  @Post('/login')
  public async login (@Body() body: LoginPayload): Promise<ICustomer> {
    return this.coustomerservic.getCustomer(body)
  }

  @Post('/forgot-password')
  public async forgotPassword (
    @Body() body: ForgotPassword
  ): Promise<ICustomer> {
    return this.coustomerservic.forgotPassword(body)
  }

  @Post('/change-password')
  public async changePassword (
    @Body() body: ChangePassword
  ): Promise<ICustomer> {
    return this.coustomerservic.changePassword(body)
  }

  @Security('authorization')
  @Post('/get-user-details')
  public async getUserDetails (@Body() body: IUser): Promise<Customer> {
    return this.coustomerservic.getUserData(body)
  }

  @Security('authorization')
  @Post('/transection')
  public async getUserTransection (@Body() body: IUser): Promise<Customer> {
    return this.coustomerservic.checkTransection(body)
  }

  @Security('authorization')
  @Post('/create-account-pincode')
  public async createAccountPincode (
    @Body() body: AccountOTP
  ): Promise<Customer> {
    return this.coustomerservic.createAccountPassword(body)
  }

  @Post('/update-user-profile/{id}')
  public async updateUserProfile (
    @Request() request: express.Request,
    @Path() id?: number,
    @UploadedFile() file?: Express.Multer.File
  ): Promise<Customer> {
    return this.coustomerservic.updateCustomerProfile({ id, file })
  }

  @Security('authorization')
  @Post('/create-transetion')
  public async createPayment (@Body() body: Payment): Promise<Transection> {
    return this.coustomerservic.createPayment(body)
  }

  @Security('authorization')
  @Post('/request-money')
  public async requestMoney (@Body() body: Payment): Promise<Transection> {
    return this.coustomerservic.requestMoney(body)
  }

  // @Security('authorization')
  @Post('/create-request-money-transection')
  public async createRequestMoneyTransection (
    @Body() body: RequestedMoney
  ): Promise<Transection> {
    return this.coustomerservic.transeferRequestedMoney(body)
  }

  @Post('/request-loan')
  public async requestLoan (@Body() body: requestLoan): Promise<void> {
    return this.coustomerservic.requestLoan(body)
  }
}
