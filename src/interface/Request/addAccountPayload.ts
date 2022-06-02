import { Expose } from "class-transformer";
import { IsDefined, IsOptional, IsString } from "class-validator";

export class AccountPayload {
  @Expose() @IsString() @IsDefined() account_number: string;

  @Expose() @IsString() @IsDefined() branch_id: string;

  @Expose() @IsString() @IsDefined() customer_id: string;

  @Expose() @IsString() @IsDefined() account_type: string;

  @Expose() @IsString() @IsOptional() account_statu: string;
}
