import { IsDefined, IsString } from "class-validator";

/**
 * OTP: 2020
 */

export class VerifyOTP {
    @IsDefined() @IsString() otp: string
}