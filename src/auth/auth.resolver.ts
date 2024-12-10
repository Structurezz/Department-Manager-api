// auth.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input'; 

@Resolver(() => User) 
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => User) 
    async register(
        @Args('createUserInput') createUserInput: CreateUserInput,
    ): Promise<User> {
        return this.authService.register(createUserInput);
    }
}
