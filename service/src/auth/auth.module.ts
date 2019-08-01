import { Global, Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Config } from '../config';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user';
import { LocalStrategy } from './local.strategy';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(Config.jwt as JwtModuleOptions),
    UserModule
  ],
  providers: [JwtStrategy, LocalStrategy, AuthService, AuthResolver],
  exports: [AuthService, AuthResolver]
})
export class AuthModule { }
