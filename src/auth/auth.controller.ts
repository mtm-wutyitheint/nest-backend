import {
  Controller,
  Request,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authSvc: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Request() req) {
    const { email, password } = req.body;
    return this.authSvc.login(email, password);
  }
}
