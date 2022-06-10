import { Expose } from 'class-transformer'
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf
} from 'class-validator'
import { ChangeFor } from '../../eumn/ChangePassword'

export class ChangePassword {
  @Expose() @IsDefined() @IsString() email: string

  @Expose() @IsString() @IsDefined() For: ChangeFor

  @ValidateIf(o => o.For == ChangeFor.ForgotPassword)
  @Expose()
  @IsString()
  @IsOptional()
  oldPassword: string

  @ValidateIf(o => o.For == ChangeFor.ChangePassword)
  @Expose()
  @IsOptional()
  @IsString()
  otp: string

  @Expose() @IsString() @IsDefined() newPassword: string
}
