import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator'

export class AccountOTP {
  @IsString() @IsDefined() id: number

  @IsString() @IsDefined() @MaxLength(4) @MinLength(4) account_pincode: string
}
