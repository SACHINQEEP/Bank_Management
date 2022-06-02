import { Expose } from "class-transformer";
import { IsDefined, IsString } from "class-validator";

/**
 * "branch_name": "BOIB121"
 * "branch_loation": "near khandwa road"
 * "branch_city": "indore"
 * "branch_phone_number": "9770902921"
 * "manager_id": 121112
 */

export class BranchPayload {
  @Expose() @IsDefined() @IsString() branch_name: string;

  @Expose() @IsDefined() @IsString() branch_location: string;

  @Expose() @IsDefined() @IsString() branch_city: string;

  @Expose() @IsDefined() @IsString() branch_phone_number: string;

  @Expose() @IsDefined() @IsString() manager_id: string;
}
