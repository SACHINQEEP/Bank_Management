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
 * @SEND_MONEY
 * id: "string",
 * For: "Send_Money",
 * mobile_Account_number: "998156467321",
 * amount: "1000",
 * type: "Credit",
 * pin_code: "13321",
 *
 * @REQUEST_MONEY
 * id: "string"
 * For: "Request_Money",
 * mobile_Account_number: "998156467321"
 * amount: "1000",
 */

export class Payment {
  @Expose() @IsNumber() @IsDefined() id: number

  @Expose() @IsString() @IsDefined() For: TransetionType

  @Expose() @IsString() @IsDefined() Type: Payment_type

  @ValidateIf(o => o.For == TransetionType.SEND_MONEY)
  @Expose()
  @IsString()
  @IsDefined()
  mobile_Account_number: string

  @Expose() @IsString() @IsDefined() amount: number

  @ValidateIf(o => o.For == TransetionType.SEND_MONEY)
  @Expose()
  @IsDefined()
  @IsString()
  pin_code: string

  @ValidateIf(o => o.For == TransetionType.SEND_MONEY)
  @Expose()
  @IsOptional()
  @IsString()
  OTP: string

  @ValidateIf(o => o.For == TransetionType.REQUEST_MONEY)
  @Expose()
  @IsString()
  @IsDefined()
  email: string
}
