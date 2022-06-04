import * as dotenv from "dotenv";

dotenv.config();

// THis are used in google mail services
const CLIENT_ID = process.env.CLIENTID || "863393577984";

const CLIENT_SECRET = process.env.CLIENT_SECRET || "GOCSPX";

const REDIRECT_URl =
  process.env.REDIRECT_URL || "https://developers.google.com";

const REFRESH_TOKEN =
  process.env.REFRESH_TOKEN || "1//04vlU43GmNVzlCgYIARAAGAQSNwF";

const FORGOTPASSWORD =
  process.env.FORGOTPASSWORD || "http://bank/user/v1/reset-password/";

// This is used for token verifation and port
const TOKEN_SECRET_KEY = process.env.SECRATE_KEY || "TewaKzIgQLFmQXV4WCa6";
const EXPIRE_IN = process.env.EXPIRE_IN || "1h";
const PORT = process.env.PORT || 8000;

const service = {
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  redirect_url: REDIRECT_URl,
  refresh_token: REFRESH_TOKEN,

  forgot_password: FORGOTPASSWORD,

  token_secret_key: TOKEN_SECRET_KEY,
  expire_in: EXPIRE_IN,
  port: PORT,
};

export default service;
