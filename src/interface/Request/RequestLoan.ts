import { Expose } from 'class-transformer'
import { IsDefined, IsNumber, IsObject, IsString } from 'class-validator'
import { LoanType } from '../../eumn/LoanType'

/**
 * @Example
 * "id":"1",
 * "account_number":"8447692645",
 * "amount":10000,
 * "For": "Car_Loan",
 * "email_id":"test@gmail.com",
 * "mobile_number":"8447692645"
 */

export class requestLoan {
  @Expose() @IsDefined() @IsNumber() id: number

  @Expose() @IsDefined() @IsString() account_number: string

  @Expose() @IsDefined() @IsNumber() amount: number

  @Expose() @IsDefined() @IsString() For: LoanType

  @Expose() @IsDefined() @IsString() email_id: string

  @Expose() @IsDefined() @IsString() mobile_number: string
}
