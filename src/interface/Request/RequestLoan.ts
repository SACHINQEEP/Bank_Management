import { Expose } from 'class-transformer'
import { IsDefined, IsNumber, IsObject, IsString } from 'class-validator'
import { LoanType } from '../../eumn/LoanType'

export class requestLoan {
  @Expose() @IsDefined() @IsNumber() id: number

  @Expose() @IsDefined() @IsString() account_number: string

  @Expose() @IsDefined() @IsNumber() amount: number

  @Expose() @IsDefined() @IsString() For: LoanType

  @Expose() @IsDefined() @IsString() email_id: string

  @Expose() @IsDefined() @IsString() mobile_number: string
}
