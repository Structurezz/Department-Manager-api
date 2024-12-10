// src/auth/dto/create-user.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsPasswordConfirmed } from '../validators/password-confirmation.validator';

@InputType()
export class CreateUserInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    username: string;

    @Field()
    @IsNotEmpty()
    @MinLength(6)
    @IsString()
    password: string;

    @Field()
    @IsNotEmpty()
    @IsPasswordConfirmed('password', { message: 'Confirm password does not match' })
    confirmPassword: string;
}
