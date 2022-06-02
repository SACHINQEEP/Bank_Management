import { Expose } from "class-transformer";
import { IsDefined, IsNumber } from "class-validator";

export default class IUser {
  @Expose() @IsDefined() @IsNumber() id: number;
}
