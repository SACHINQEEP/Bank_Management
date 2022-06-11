import { Expose } from 'class-transformer'
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf
} from 'class-validator'

export class UpdateProfile {
  @Expose() @IsNumber() @IsDefined() id: number

  @Expose() file: any

  // @ValidateIf((o)=> o.file == file)
  @Expose() @IsString() @IsOptional() avatar: string
}
