import * as jwt from 'jsonwebtoken'
import * as nodemailer from 'nodemailer'
import { google } from 'googleapis'
import * as argon from 'argon2'
import service from '../config/app_config'
import { Twilio } from 'twilio'

export const jwtWebToken = function (id: any): string {
  const token = jwt.sign({ id }, service.token_secret_key, {
    expiresIn: service.expire_in
  })

  return token
}

const oAuth2Client = new google.auth.OAuth2(
  service.client_id,
  service.client_secret,
  service.redirect_url
)

oAuth2Client.setCredentials({ refresh_token: service.refresh_token })
const AccessToken: any = oAuth2Client.getAccessToken()

export async function sendMail (
  receiverEmail: string,
  subject: string,
  html: string
) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      // host: "smtp.ethereal.email",
      // port: 587,
      auth: {
        type: 'OAuth2',
        user: 'patelsachinsp269@gmail.com',
        clientId: service.client_id,
        clientSecret: service.client_secret,
        refreshToken: service.refresh_token,
        accessToken: await AccessToken

        // user: "elody.kassulke23@ethereal.email",
        // pass: "5bshKGjHRKHsyzFBue",
      }
    })

    const mailOptions = {
      from: 'Bank of Management <patelsachinsp269@gmail.com>',
      to: receiverEmail,
      subject: subject,
      html: html
    }

    await transporter.sendMail(mailOptions)
  } catch (err) {
    console.log(err)
    console.log(err.message)
  }
}

const accountSid = service.twilio_account_sid
const authToken = service.twilio_auth_token
const twilioNumber = service.twilio_phone_number
const myNumber = service.my_number

const client = new Twilio(accountSid, authToken)

export async function notification (
  receiverNumber: string,
  subject: string,
  body: string
) {
  client.messages
    .create({
      from: twilioNumber,
      to: receiverNumber,
      messagingServiceSid: subject,
      body
    })
    .then(message => console.log(message.sid))
}

// export const rendomOTP = Math.floor(Math.random() * 9999 + 1);

export function randomotp (): string {
  return Math.floor(10000 + Math.random() * 90000) + ''
}

// export const hashPassword =  argon.hash("password");

export async function hasPassword (body: string) {
  let hash = await argon.hash(body)
  return hash
}

export async function verifyPassword (
  newPassword: string,
  oldPassword: string
) {
  let hash = await argon.verify(oldPassword, newPassword)
  return hash
}
