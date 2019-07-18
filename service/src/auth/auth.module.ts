import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GqlModule } from '../gql/gql.module';
import { LocalStrategy, JwtStrategy } from '../common/strategies';
import { Config } from '../../config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(Config.jwt as JwtModuleOptions),
    GqlModule
  ],
  providers: [LocalStrategy, JwtStrategy, AuthService],
  exports: [AuthService]
})
export class AuthModule { }
