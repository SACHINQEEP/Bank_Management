import { Expose } from 'class-transformer'
import { IsDefined, IsNumber, IsString } from 'class-validator'

export class RequestedMoney {
  @Expose() @IsDefined() @IsNumber() id: number

  @Expose() @IsDefined() @IsString() account_number: string

  @Expose() @IsDefined() @IsString() verifyOTP: string

  @Expose() @IsDefined() @IsNumber() amount: number

  @Expose() @IsDefined() @IsString() pin_code: string
}
