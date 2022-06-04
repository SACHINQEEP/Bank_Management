import service from "../config/app_config";

export default function forgotpassword(otp: string) {
  return `<a Link: href=${service.forgot_password}>${service.forgot_password}${otp}</a>`;
}
