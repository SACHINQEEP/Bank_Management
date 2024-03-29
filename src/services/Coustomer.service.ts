import { ILike, Like, UpdateResult } from 'typeorm'
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
  getUser,
  updateCustomer
} from '../repository/Customer.repository'
import {
  addTransection,
  updateTransetion
} from '../repository/Transection.repository'
import {
  hasPassword,
  jwtWebToken,
  notification,
  randomotp,
  verifyPassword
} from '../utils/util'
import { Deposits } from '../entity/Deposit_Transecton'
import { RequestedMoney } from '../interface/Request/RequestedMoney'
import { getDeposits } from '../repository/DepositTraRepo'
import { response } from 'express'
import { requestLoan } from '../interface/Request/RequestLoan'
import service from '../config/app_config'
import { LoanType } from '../eumn/LoanType'
import { getEmployee } from '../repository/Employee.repository'
import { Employees } from '../entity/Employee'
import { getBranch } from '../repository/Branch.repository'
import { createLoan } from '../repository/Loan.repository'

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

    const message = `Kindly Verify your account ${OTP}`

    await notification(service.my_number, message)

    // const stripeDataconnect = await createStripeCustomer(body.email)
    // console.log(stripeDataconnect.id)

    await updateCustomer({ id: user.id }, { otp: user.otp })

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

  public async checkTransection (body: IUser): Promise<Customer> {
    let users = await getTransection(body)
    if (!users) throw new AppError(400, 'User Not Found')

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

  public async createPayment (
    body: Payment
    // deposit: Deposits
  ): Promise<Transection> {
    let receiverAccountNumber: any
    let transetion: any = []

    let user = await getCustomer({ id: body.id })

    let receiverUser = await getUser({
      // account_number: body.mobile_Account_number
      where: [
        { account_number: ILike(`%${body.mobile_Account_number}%`) },
        { phone: ILike(`%${body.mobile_Account_number}%`) }
      ]
    })

    console.log('receiver', receiverUser)

    if (!user) throw new AppError(400, 'User not Found')

    if (user || user.total_amount >= 1) {
      if (body.For == TransetionType.SEND_MONEY) {
        receiverAccountNumber = await getCustomer({
          account_number: body.mobile_Account_number
        })

        const verify = await verifyPassword(body.pin_code, user.account_pincode)

        if (!verify) throw new AppError(400, 'Invalid PinCode')

        if (!receiverAccountNumber)
          throw new AppError(400, 'Not a valid Account or phone number')

        let userAccount = user.account_number

        let transectionHistory = {
          account_number: userAccount,
          amount: body.amount,
          payment_type: body.Type,
          transection_type: body.For,
          recever_customer_account_number: body.mobile_Account_number,
          customer_id: body.id
        }

        let userAmount = user.total_amount

        async function updateTransectionAmount (
          user: any,
          amount: any
        ): Promise<void> {
          await updateCustomer({ id: user }, { total_amount: amount })
        }

        if (body.amount >= 1) {
          if (body.Type == Payment_type.CREDIT) {
            let afterCredit = userAmount - body.amount
            let receiverDeposit = receiverUser.total_amount + body.amount

            await updateTransectionAmount(body.id, afterCredit)
            await updateTransectionAmount(receiverUser.id, receiverDeposit)

            if (afterCredit) {
              transectionHistory['amount'] = -body.amount
              let add = await addTransection({
                ...transectionHistory
              })
              transetion.push(add)
            }
          }
          // if (body.Type == Payment_type.DEPOSIT) {
          //   let afterDeposit = userAccount + body.amount
          //   let receiverCredit = receiverUser.total_amount - body.amount

          //   await updateCustomer(
          //     { id: body.id },
          //     { total_amount: afterDeposit }
          //   )
          //   await updateCustomer(
          //     { id: receiverUser.id },
          //     { total_amount: receiverCredit }
          //   )
          // }
        } else {
          throw new AppError(400, 'Amount not provided')
        }
      }
    } else {
      throw new AppError(400, 'insufficient funds')
    }
    return transetion
  }

  public async requestMoney (body: Payment): Promise<Transection> {
    let user = await getCustomer({ id: body.id })
    let RequestUser = await getCustomer({
      email: body.email
    })
    let result: any = []

    if (!user || !RequestUser) throw new Error('User Not Found')

    let otp = randomotp()

    if (body.For == TransetionType.REQUEST_MONEY) {
      if (body.amount >= 1) {
        await updateCustomer({ id: RequestUser.id }, { otp: otp })

        await mailService.receive(Event.EMAIL, Subject.RequestMoney, {
          name: RequestUser.name,
          userName: user.name,
          email: body.email,
          account_number: user.account_number,
          amount: body.amount,
          otp: otp
        })
      }

      let responce: any = 'Money Request Successfull Send'

      return responce
    } else {
      throw new AppError(400, 'Not Request Type')
    }
  }

  public async transeferRequestedMoney (
    body: RequestedMoney
  ): Promise<Transection> {
    let user = await getCustomer({ id: body.id })

    let receiverUser = await getUser({
      where: [{ account_number: ILike(`%${body.account_number}`) }]
    })

    let creditTransection = {
      customer_id: user.id,
      account_number: user.account_number,
      transection_type: TransetionType.REQUEST_MONEY,
      recever_customer_account_number: body.account_number,
      payment_type: Payment_type.CREDIT,
      amount: body.amount
    }

    if (!user || !receiverUser) throw new AppError(400, 'User not Found')

    let otp = user.otp

    if (body.verifyOTP !== otp) {
      throw new AppError(400, 'Invalid OTP')
    }

    await updateCustomer({ id: user.id }, { otp: null })
    let userAmount = user.total_amount
    let recAmount = receiverUser.total_amount

    let creditAmount = userAmount - body.amount
    let depositAmount = recAmount + body.amount

    await updateCustomer({ id: user.id }, { total_amount: creditAmount })
    await updateCustomer(
      { id: receiverUser.id },
      { total_amount: depositAmount }
    )

    if (creditAmount) {
      creditTransection['amount'] = -body.amount
      await addTransection({
        ...creditTransection
      })
    }

    if (depositAmount) {
      creditTransection['customer_id'] = receiverUser.id
      creditTransection['payment_type'] = Payment_type.DEPOSIT
      creditTransection['amount'] = body.amount
      await getDeposits({
        ...creditTransection
      })
    }

    await mailService.receive(Event.EMAIL, Subject.ForgotPassword, {
      name: receiverUser.name,
      account: body.amount,
      account_number: body.account_number,
      email: receiverUser.email
    })

    let response: any = 'Transection Successfully complited'

    return response
  }

  public async requestLoan (body: requestLoan): Promise<void> {
    let user = await getCustomer({ id: body.id })
    let message: any = `Request Succefully Send`

    let branch = await getBranch({ id: user.branch_id })

    let employee = await getEmployee({ id: branch.manager_id })

    let admin = employee.name

    if (!user) throw new AppError(400, 'Not a Valid User')

    if (
      LoanType.BIKE_LOAN ||
      LoanType.CAR_LOAN ||
      LoanType.HOME_LOAN ||
      LoanType.CASH_ADVANCES_LOAN ||
      LoanType.PAYDAY_LOAN ||
      LoanType.PERSONAL_LOAN ||
      LoanType.SMALL_BUSINESS_LOAN
    ) {
      if (body.amount > 0) {
        await mailService.receive(Event.EMAIL, Subject.RequestLoan, {
          email: employee.email,
          admin: admin,
          id: branch.id,
          branch_name: branch.branch_name,
          branch_address: branch.branch_location,
          loan_type: body.For,
          user_name: user.name,
          user_number: user.phone,
          user_ac: user.account_number,
          subject: body.For
        })
      }
    }

    await createLoan({
      amount_requested: body.amount,
      loan_type: body.For,
      ...body
    })

    return message
  }
}
