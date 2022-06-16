import { Expose } from 'class-transformer'
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf
} from 'class-validator'
import { Payment_type } from '../../eumn/PaymentType'
import { TransetionType } from '../../eumn/TransectionType'

/**
 * @Example
 * id: "string",
 * For: "UPI",
 * mobile_Account_number: "998156467321",
 * amount: "1000",
 * type: "Deposit",
 * pin_code: "13321",
 * OTP: "132321"
 */

export class Payment {
  @Expose() @IsNumber() @IsDefined() id: number

  @Expose() @IsString() @IsDefined() For: TransetionType

  @Expose() @IsString() @IsDefined() Type: Payment_type

  @ValidateIf(o => o.For == TransetionType.UPI)
  @Expose()
  @IsString()
  @IsDefined()
  mobile_Account_number: string

  @Expose() @IsString() @IsDefined() amount: number

  @ValidateIf(o => o.For == TransetionType.UPI)
  @Expose()
  @IsDefined()
  @IsString()
  pin_code: string

  @ValidateIf(o => o.For == TransetionType.UPI)
  @Expose()
  @IsOptional()
  @IsString()
  OTP: string

  @ValidateIf(o => o.For == TransetionType.SEND_MONEY)
  @Expose()
  @IsString()
  @IsDefined()
  email: string
}
