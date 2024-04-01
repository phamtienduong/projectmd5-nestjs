import { IsEmail, IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class SignUpDto{
    @IsString()
  @MaxLength(155)
  @IsNotEmpty()
  user_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  avatar: string;

  @IsInt()
  role?: number;
}