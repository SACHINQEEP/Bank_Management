export default function forgotpassword(otp: string) {
  return `<a Link: href=${process.env.FORGOTPASSWORD}>${process.env.FORGOTPASSWORD}${otp}</a>`;
}
