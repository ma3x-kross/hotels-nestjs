import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { RefreshTokenDto } from './dto/refreshToken.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { LoginResponseDto } from './dto/login.response.dto'

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Вход в систему' })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  @HttpCode(200)
  @Post('/login')
  login(@Body() userDto: AuthDto): Promise<LoginResponseDto> {
    return this.authService.login(userDto)
  }

  @ApiOperation({ summary: 'Обновление токена' })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  @HttpCode(200)
  @Post('/login/access-token')
  getNewToken(@Body() dto: RefreshTokenDto): Promise<LoginResponseDto> {
    return this.authService.getNewToken(dto)
  }
}
