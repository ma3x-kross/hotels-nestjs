import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { RefreshTokenDto } from './dto/refreshToken.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('/login')
  login(@Body() userDto: AuthDto) {
    return this.authService.login(userDto)
  }

  @HttpCode(200)
  @Post('/login/access-token')
  getNewToken(@Body() dto: RefreshTokenDto) {
    return this.authService.getNewToken(dto)
  }
}
