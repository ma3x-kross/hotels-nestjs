import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { CreateProfileDto } from './dto/register.user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAll() {
    return this.userService.getAllUsers()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/register')
  register(@Body() dto: CreateProfileDto) {
    return this.userService.register(dto)
  }
}
