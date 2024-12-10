// create-user.dto.ts
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsPasswordConfirmed } from '../validators/password-confirmation.validator'; 

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @MinLength(6)
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsPasswordConfirmed('password', { message: 'Confirm password does not match' }) // Use the custom validator
    confirmPassword: string;
}
