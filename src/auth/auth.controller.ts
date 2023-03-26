import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'

import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/login')
  login(@Body() userDto: AuthDto) {
    return this.authService.login(userDto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/register')
  register(@Body() userDto: AuthDto) {
    return this.authService.register(userDto)
  }
}
