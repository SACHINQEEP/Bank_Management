import forgotpassword from '../template/forgotpassword'
import signupMail from '../template/welComeMail'
import { Event } from './Event'
import Receive from './Receive'
import { Subject } from './Subject'
import { sendMail } from '../utils/util'
import { userAccount, TransectionHistory } from '../template/createAccountTemp'
import RequestMoney from '../template/RequestMoney'

export default class EmailService implements Receive {
  async receive (topic: Event, subject: Subject, data: any) {
    let emailHtml = ''
    let emailSubject = ''

    switch (subject) {
      case Subject.UserSignup:
        emailSubject = 'Verify Your Email..'
        emailHtml = signupMail(data.name, data.email, data.otp)
        break
      case Subject.ForgotPassword:
        emailSubject = 'Forgot Password'
        emailHtml = forgotpassword(data.otp)
        break
      case Subject.UserAccount:
        emailSubject = 'Account Created'
        emailHtml = userAccount(data.name, data.email, data.account_number)
        break
      case Subject.RequestMoney:
        emailSubject = 'Requested Money'
        emailHtml = RequestMoney(
          data.name,
          data.userName,
          data.email,
          data.account_number,
          data.amount,
          data.otp
        )
        break

      case Subject.RequestMoneyTransection:
        emailSubject = 'Requested Money Transection History'
        emailHtml = TransectionHistory(
          data.name,
          data.account,
          data.account_number
        )
    }

    await sendMail(data.email, emailSubject, emailHtml)
  }
}
