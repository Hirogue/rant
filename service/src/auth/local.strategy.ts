import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(account: string, password: string) {
    const user = await this.authService.validateUser(account, password);
    if (!user) {
      throw new UnauthorizedException('身份验证失败');
    }
    return user;
  }
}
