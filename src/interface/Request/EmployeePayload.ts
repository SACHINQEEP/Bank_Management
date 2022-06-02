import { Expose } from "class-transformer";
import { IsDefined, IsString } from "class-validator";

/**
 * name: "sachin Patel"
 * address: "new Rani Bangh Indore"
 * phone: "9770902921"
 * email: "patelsachinsp269@gmail.com"
 * password: "sach123"
 * branch_id: "branch1211"
 * department:"developer"
 * department_id: "12ddd2d"
 */

export class EmployeePayload {
  @Expose() @IsDefined() @IsString() name: string;

  @Expose() @IsDefined() @IsString() address: string;

  @Expose() @IsDefined() @IsString() phone: string;

  @Expose()  @IsDefined() @IsString() email: string;

  @IsDefined() @IsString() password: string;

  @Expose() @IsDefined() @IsString() branch_id: string;

  @Expose() @IsDefined() @IsString() department: string;

  @Expose() @IsDefined() @IsString() department_id: string;
}
