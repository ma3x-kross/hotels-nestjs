import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  Param,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { RoleGuard } from 'src/auth/guards/roles.guard'
import { User } from './decorators/user.decorator'
import { AddRoleDto } from './dto/add.role.dto'
// import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { CreateProfileDto } from './dto/register.user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @HttpCode(200)
  @Post('/register')
  register(@Body() dto: CreateProfileDto) {
    return this.userService.register(dto)
  }

  @Get()
  @Auth('ADMIN')
  getAll() {
    return this.userService.getAllUsers()
  }

  @Auth()
  @Get('/self')
  getSelf(@User('id') id: number) {
    return this.userService.getUserById(id)
  }

  @Get('/:id')
  @Auth('ADMIN')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id)
  }

  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto)
  }
}
