import { Expose } from "class-transformer";
import { IsDefined, IsString } from "class-validator";

export class ForgotPassword {
    @Expose() @IsDefined() @IsString() email: string
}