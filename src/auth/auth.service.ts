import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; 
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>, 
        private jwtService: JwtService 
    ) {}

    async validateUser(username: string, userId: number): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { username, id: userId } });
        return user || null; 
    }

    async register(createUserInput: CreateUserInput): Promise<User> {
        const { fullName, email, username, password } = createUserInput;

        // Check if the email or username already exists
        const existingUserByEmail = await this.userRepository.findOne({ where: { email } });
        if (existingUserByEmail) {
            throw new ConflictException('Email already in use');
        }

        const existingUserByUsername = await this.userRepository.findOne({ where: { username } });
        if (existingUserByUsername) {
            throw new ConflictException('Username already in use');
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({ 
            fullName, 
            email, 
            username, 
            password: hashedPassword 
        });

        return await this.userRepository.save(newUser);
    }

    async login(username: string, password: string): Promise<{ access_token: string } | null> {
        const user = await this.userRepository.findOne({ where: { username } });
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user; // Exclude password from the returned user object
            const payload = { username: user.username, sub: user.id };
            return {
                access_token: this.jwtService.sign(payload), 
            };
        }
        return null; 
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUserById(id: number): Promise<User | null> { 
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    async forgotPassword(username: string): Promise<string> {
        // Here you would implement the logic to handle password reset
        return `Password reset link sent to ${username} email address`;
    }
}
