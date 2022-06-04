// import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import * as JWT from "jsonwebtoken";
import service from "../config/app_config";
import { getCustomer } from "../repository/Customer.repository";
import { getEmployee } from "../repository/Employee.repository";
// import { BaseEntry } from "../utils/BaseEntry";

export const checkJWTEM = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  // console.log({token});

  let jwtPayload: any;

  try {
    jwtPayload = <any>JWT.verify(token, service.token_secret_key);

    res.locals.jwtPayload = jwtPayload;

    // const user = await getCustomer(jwtPayload.id.id);
    const user = await getEmployee(jwtPayload.id.id);

    res.locals.employee = user;
  } catch (err) {
    return res.status(401).json({
      status: "Fail",
      message: "Unauthorized",
      error: err,
    });
    return;
  }

  const { id, username } = jwtPayload;
  const newToken = JWT.sign({ id, username }, service.token_secret_key, {
    expiresIn: service.expire_in,
  });

  res.setHeader("token", newToken);

  next();
};

// FOR CUSTOMER
export const checkJWTCS = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  console.log({ token });

  let jwtPayload: any;

  try {
    jwtPayload = <any>JWT.verify(token, service.token_secret_key);

    res.locals.jwtPayload = jwtPayload;

    const user = await getCustomer(jwtPayload.id.id);

    res.locals.Customer = user;
  } catch (err) {
    return res.status(401).json({
      status: "Fail",
      message: "Unauthorized",
      error: err,
    });
    return;
  }

  const { id, username } = jwtPayload;
  const newToken = JWT.sign({ id, username }, service.token_secret_key, {
    expiresIn: service.expire_in,
  });

  res.setHeader("token", newToken);

  next();
};
