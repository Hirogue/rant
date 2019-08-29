import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Config } from '../config';
import { UserModule } from '../user';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(Config.jwt as JwtModuleOptions),
    UserModule
  ],
  providers: [JwtStrategy, LocalStrategy, AuthService, AuthResolver],
  exports: [JwtModule, AuthService, AuthResolver]
})
export class AuthModule { }
