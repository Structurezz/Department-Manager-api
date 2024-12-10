import { Controller, Post, Body, Get, Param, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input'; // Use the correct DTO for registration
import { LoginDTO } from './dto/login.dto'; // Make sure you have a LoginDTO defined

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
async register(@Body() createUserInput: CreateUserInput) {
    // Ensure passwords match
    if (createUserInput.password !== createUserInput.confirmPassword) {
        throw new BadRequestException('Passwords do not match');
    }

    return this.authService.register(createUserInput); // Pass the whole object
}

    @Post('login')
    async login(@Body() loginDto: LoginDTO) {
        return this.authService.login(loginDto.username, loginDto.password);
    }

    @Get('users')
    async getAllUsers() {
        return this.authService.getAllUsers();
    }

    @Get('users/:id')
    async getUserById(@Param('id') id: number) {
        return this.authService.getUserById(id);
    }

    @Post('forgot-password')
    async forgotPassword(@Body('username') username: string) {
        return this.authService.forgotPassword(username);
    }
}
