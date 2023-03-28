import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { User } from './decorators/user.decorator'
import { AddRoleDto } from './dto/add.role.dto'
import { CreateProfileDto } from './dto/register.user.dto'
import { UpdateUserDto } from './dto/update.user.dto'
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

  @Auth('ADMIN')
  @Get('/:id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id)
  }

  @HttpCode(200)
  @Auth('ADMIN')
  @Put('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto)
  }

  @HttpCode(200)
  @Auth()
  @Put('update-self')
  async updateSelf(@User('id') id: number, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto)
  }

  @Auth('ADMIN')
  @Delete('/:id')
  delete(@Param('id') id: number) {
    this.userService.deleteUser(id)
  }

  @Auth()
  @Delete('delete-self')
  deleteSelf(@User('id') id: number) {
    this.userService.deleteUser(id)
  }

  @HttpCode(200)
  @Auth('ADMIN')
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto)
  }

  @Auth('ADMIN')
  @Delete('/role')
  deleteRole(@Body() dto: AddRoleDto) {
    return this.userService.deleteRole(dto)
  }
}
