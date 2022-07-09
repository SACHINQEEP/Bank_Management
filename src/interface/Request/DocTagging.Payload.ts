import { Expose } from 'class-transformer'
import { IsDefined, IsNumber, IsString } from 'class-validator'

export class DocumnetTagging {
  @Expose() @IsDefined() @IsString() loan_id: string
}
