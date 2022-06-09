import { IsDefined, IsString } from "class-validator";

export class AccountOTP {
  @IsString() @IsDefined() id: number;

  @IsString() @IsDefined() account_pincode: string;
}
