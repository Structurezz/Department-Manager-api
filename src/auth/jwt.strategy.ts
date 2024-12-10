import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "eAq+PknWdbfnysjsA6B9TnUs4BqkWMtnjfIdYdxuhhg=",
        });
    }

    async validate(payload: JwtPayload) {
        return await this.authService.validateUser(payload.username, payload.sub);
    }
}
