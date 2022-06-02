import { Expose } from "class-transformer";
import { IsDefined, IsOptional, IsString } from "class-validator";

/**
 * name: "sachin Patel"
 * address: "new Rani Bangh Indore"
 * phone: "9770902921"
 * email: "patelsachinsp269@gmail.com"
 * password: "sach123"
 * branch_id: "branch1211"
 *  Update_At: 2022/5/23
 */

export class UserRequest {
  @Expose() @IsDefined() @IsString() name: string;

  @Expose() @IsDefined() @IsString() address: string;

  @Expose() @IsDefined() @IsString() phone: string;

  @Expose() @IsDefined() @IsString() email: string;

 @Expose() @IsDefined() @IsString() password: string;

  @Expose() @IsDefined() @IsString() branch_id: string;

  @IsOptional() Update_At: any;
}
