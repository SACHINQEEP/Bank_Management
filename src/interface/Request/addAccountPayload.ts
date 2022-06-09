import { Expose } from "class-transformer";
import { IsDefined, IsOptional, IsString } from "class-validator";
import { Account_type } from "../../eumn/AccountType";

export class AccountPayload {
  @Expose() @IsString() @IsDefined() account_number: string;

  @Expose() @IsString() @IsDefined() branch_id: string;

  @Expose() @IsString() @IsDefined() customer_id: string;

  @Expose() @IsString() @IsDefined() account_type: Account_type;

  @Expose() @IsString() @IsOptional() account_statu: string;
}
