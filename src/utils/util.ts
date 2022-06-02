import * as jwt from "jsonwebtoken";
import * as nodemailer from "nodemailer";
import * as argon from "argon2";

export const jwtWebToken = function (id: any): string {
  const token = jwt.sign({ id }, process.env.SECRATE_KEY, {
    expiresIn: "1h",
  });

  return token;
};

export async function sendMail(
  receiverEmail: string,
  subject: string,
  html: string
) {
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "00b161dac72adc",
      pass: "c715aa6c6229a7",
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
