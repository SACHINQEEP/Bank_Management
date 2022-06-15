import { Like, UpdateResult } from 'typeorm'
import { Customer } from '../entity/Customer'
import { Transection } from '../entity/Transection'
import { ChangeFor } from '../eumn/ChangePassword'
import { Payment_type } from '../eumn/PaymentType'
import { TransetionType } from '../eumn/TransectionType'
import { Event } from '../events/Event'
import EmailService from '../events/MailService'
import { Subject } from '../events/Subject'
import { AccountOTP } from '../interface/Request/AccountOTP'
import { ChangePassword } from '../interface/Request/ChangePassoword'
import { ForgotPassword } from '../interface/Request/ForgotPassword'
import IUser from '../interface/Request/IUser'
import { LoginPayload } from '../interface/Request/LoginPayload'
import { Payment } from '../interface/Request/PaymentPayload'
import { UpdateProfile } from '../interface/Request/updateUserProfile'
import { UserRequest } from '../interface/Request/UserRequest'
import { VerifyOTP } from '../interface/Request/VerifyOTP'
import { ICustomer } from '../interface/Responce/ICustomer'
import { ITransection } from '../interface/Responce/ITransection'
import createStripeCustomer from '../events/stripe'
import AppError from '../middleware/AppError'
import {
  addCustomer,
  getCustomer,
  getDetails,
  getTransection,
  updateCustomer
} from '../repository/Customer.repository'
import {
  addTransection,
  updateTransetion
} from '../repository/Transection.repository'
import {
  hasPassword,
  jwtWebToken,
  randomotp,
  verifyPassword
} from '../utils/util'

const mailService = new EmailService()

export default class CoustomerService {
  // For Signup
  public async createCustomer (body: UserRequest): Promise<ICustomer> {
    if (body.email) {
      body.email.toLocaleLowerCase()
    }

    body.password = await hasPassword(body.password)

    let user = await addCustomer(body)

    let OTP = randomotp()
    user.otp = OTP

    await mailService.receive(Event.EMAIL, Subject.UserSignup, user)

    const stripeDataconnect = await createStripeCustomer(body.email)
    console.log(stripeDataconnect.id)

    await updateCustomer(
      { id: user.id },
      { otp: user.otp, stripe_id: stripeDataconnect.id }
    )

    user = await getCustomer({ id: user.id })

    const token = jwtWebToken({ id: user.id })

    return { user, token }
  }

  public async verifyCustomer (body: VerifyOTP): Promise<ICustomer> {
    let user = await getCustomer(body)

    if (body.otp !== user.otp) {
      throw new AppError(400, 'Incorrect OTP')
    }

    await updateCustomer(
      { id: user.id },
      { otp: null, email_verified: true, Update_At: new Date() }
    )

    let responce: any = 'Email Successfully Verified'

    return responce
  }

  // For Signin
  public async getCustomer (body: LoginPayload): Promise<ICustomer> {
    if (body.email) {
      body.email.toLowerCase()
    }

    let user = await getCustomer({ email: body.email })

    if (user.email == body.email) {
      const verify = await verifyPassword(body.password, user.password)

      if (verify !== true) throw new AppError(400, 'Password is Incorrect')

      await updateCustomer({ id: user.id }, { Update_At: new Date() })

      const token = jwtWebToken({ id: user.id })

      return { user, token }
    }
  }

  public async getUserData (body: IUser): Promise<Customer> {
    let user = await getDetails(body.id)

    if (!user) throw new AppError(400, 'User not Registered')

    return user
  }

  public async checkTransection (body: IUser): Promise<[Customer[], any]> {
    let users = await getTransection(body)
    console.log(users)

    return users
  }

  public async forgotPassword (body: ForgotPassword): Promise<ICustomer> {
    let user = await getCustomer({ email: body.email })

    if (!user) {
      throw new AppError(400, 'User not found..')
    }

    let OTP = randomotp()
    user.otp = OTP

    await updateCustomer({ id: user.id }, { otp: user.otp })

    mailService.receive(Event.EMAIL, Subject.ForgotPassword, user)

    let responce: any = `Forgot Password link send on ${user.email}`

    return responce
  }

  public async changePassword (body: ChangePassword): Promise<ICustomer> {
    if (body.email) {
      body.email.toLowerCase()
    }

    let user = await getCustomer({ email: body.email })
    let hashPassword = await hasPassword(body.newPassword)

    if (!user) {
      throw new AppError(400, 'Email id invalid..')
    }

    if (user) {
      if (body.For == ChangeFor.ChangePassword) {
        let verify = await verifyPassword(body.oldPassword, user.password)

        if (!verify) throw new AppError(400, 'Old password is Incorrect')

        if (verify) {
          await updateCustomer({ id: user.id }, { password: hashPassword })
        }
      }
      if (body.For == ChangeFor.ForgotPassword) {
        if (user.otp == body.otp) {
          await updateCustomer(
            { id: user.id },
            { otp: null, password: hashPassword }
          )
        }
      }

      let responce: any = 'Password Changed Successfull'

      return responce
    }
  }

  public async createAccountPassword (body: AccountOTP): Promise<Customer> {
    const password = await hasPassword(body.account_pincode)

    let user = await getCustomer({ id: body.id })

    if (!user) throw new AppError(400, 'Invalid User id')

    if (body.account_pincode.length < 4 || body.account_pincode.length > 4) {
      throw new AppError(400, 'Pin Code should contain only 4 number')
    }

    if (!user.account_number)
      throw new AppError(
        400,
        'Account not Created yet Please contact at your branch'
      )

    if (!user.account_pincode) {
      await updateCustomer(
        { id: user.id },
        { account_pincode: password, Update_At: new Date() }
      )
    } else {
      throw new AppError(
        400,
        'OTP already Exist if you forgot your OTP then kinldy change your OTP through given link'
      )
    }

    const responce: any =
      'OTP Created Successfully Now you can make the transections'

    return responce
  }

  public async updateCustomerProfile (body: any): Promise<Customer> {
    let user = await getCustomer({ id: body.id })
    console.log(user)

    if (!user) throw new AppError(400, 'User not found')

    if (body.file) {
      user.avatar = body.file
      console.log(body.file)
    }

    await updateCustomer(
      { id: body.id },
      { ...body, avatar: body.file.filename }
    )

    return user
  }

  public async createPayment (body: Payment): Promise<Transection> {
    let receiverAccountNumber: any
    let transetion: any = []

    let user = await getCustomer({ id: body.id })

    let receiverUser = await getCustomer({
      account_number: body.mobile_Account_number
    })

    if (!user) throw new AppError(400, 'User not Found')

    if (user || user.total_amount >= 1) {
      if (body.For == TransetionType.UPI) {
        receiverAccountNumber = await getCustomer({
          account_number: body.mobile_Account_number
        })

        const verify = await verifyPassword(body.pin_code, user.account_pincode)

        if (!verify) throw new AppError(400, 'Invalid PinCode')

        if (!receiverAccountNumber)
          throw new AppError(400, 'Not a valid Account or phone number')

        let userAccount = user.account_number

        if (body.amount >= 1) {
          let add = await addTransection({
            account_number: userAccount,
            amount: body.amount,
            payment_type: body.Type,
            transection_type: body.For,
            recever_customer_account_number: body.mobile_Account_number,
            customer_id: body.id
          })

          let userAmount = user.total_amount

          if (body.Type == Payment_type.CREDIT) {
            let afterCredit = userAmount - body.amount
            let receiverDeposit = receiverUser.total_amount + body.amount
            await updateCustomer({ id: body.id }, { total_amount: afterCredit })
            await updateCustomer(
              { id: receiverUser.id },
              { total_amount: receiverDeposit }
            )
          }

          if (body.Type == Payment_type.DEPOSIT) {
            let afterDeposit = userAccount + body.amount
            let receiverCredit = receiverUser.total_amount - body.amount
            await updateCustomer(
              { id: body.id },
              { total_amount: afterDeposit }
            )
            await updateCustomer(
              { id: receiverUser.id },
              { total_amount: receiverCredit }
            )
          }
          transetion.push(add)
        }
      }
    } else {
      throw new AppError(400, 'insufficient funds')
    }
    return transetion
  }
}
