import * as jwt from "jsonwebtoken";
import * as nodemailer from "nodemailer";
import { google } from "googleapis";
import * as argon from "argon2";

export const jwtWebToken = function (id: any): string {
  const token = jwt.sign({ id }, process.env.SECRATE_KEY, {
    expiresIn: "1h",
  });

  return token;
};

const ClientId =
  "863393577984-dhmcdnl68p39i8sjb3u4bunaavaceh06.apps.googleusercontent.com";
const ClientSecret = "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";
const Redirect_url = "https://developers.google.com/oauthplayground";
const Refresh_token =
  "1//04vlU43GmNVzlCgYIARAAGAQSNwF-L9IrmSJgmpNv4PXJeWzA0S-BqPAER8GovzZrF7jAqB3zoSt6Nscatr2RWzQnkGcplL9EUXI";

const oAuth2Client = new google.auth.OAuth2(
  ClientId,
  ClientSecret,
  Redirect_url
);

oAuth2Client.setCredentials({ refresh_token: Refresh_token });
const AccessToken: any = oAuth2Client.getAccessToken();

export async function sendMail(
  receiverEmail: string,
  subject: string,
  html: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp.ethereal.email",
    // port: 587,
    auth: {
      type: "OAuth2",
      user: "patelsachinsp269@gmail.com",
      clientId: ClientId,
      clientSecret: ClientSecret,
      refreshToken: Refresh_token,
      accessToken: await AccessToken,

      // user: "elody.kassulke23@ethereal.email",
      // pass: "5bshKGjHRKHsyzFBue",
    },
  });

  const mailOptions = {
    from: "Sachin Patel <patelsachinsp269@gmail.com>",
    to: receiverEmail,
    subject: subject,
    html: html,
  };

  await transporter.sendMail(mailOptions);
}

// export const rendomOTP = Math.floor(Math.random() * 9999 + 1);

export function randomotp(): string {
  return Math.floor(10000 + Math.random() * 90000) + "";
}

// export const hashPassword =  argon.hash("password");

export async function hasPassword(body: string) {
  let hash = await argon.hash(body);
  return hash;
}

export async function verifyPassword(newPassword: string, oldPassword: string) {
  let hash = await argon.verify(oldPassword, newPassword);
  return hash;
}
