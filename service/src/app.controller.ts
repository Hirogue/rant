import { Controller, Get, Request, Post, Render, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) { }

  // @Get()
  // @Render('Index')
  // index() { }

  // @Post('login')
  // @UseGuards(AuthGuard('local'))
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  // @Get('me')
  // @UseGuards(AuthGuard('jwt'))
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}