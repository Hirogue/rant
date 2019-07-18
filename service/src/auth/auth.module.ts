import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { Config } from '../../config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(Config.jwt as JwtModuleOptions),
    UsersModule
  ],
  providers: [LocalStrategy, JwtStrategy, AuthService],
  exports: [AuthService]
})
export class AuthModule { }
