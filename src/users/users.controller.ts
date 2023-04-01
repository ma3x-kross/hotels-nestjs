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
import { RoleDto } from './dto/role.dto'
import { CreateProfileDto } from './dto/register.user.dto'
import { UpdateUserDto } from './dto/update.user.dto'
import { UsersService } from './users.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserResponseDto } from './dto/user.response.dto'

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({
    summary: 'Регистрация пользователя',
  })
  @ApiResponse({ status: 200, type: UserResponseDto })
  @HttpCode(200)
  @Post('/register')
  register(@Body() dto: CreateProfileDto) {
    return this.userService.register(dto)
  }

  @ApiOperation({
    summary: 'Получение пользователей',
  })
  @ApiResponse({ status: 200, type: [UserResponseDto] })
  @Get()
  @Auth('ADMIN')
  getAll() {
    return this.userService.getAllUsers()
  }

  @ApiOperation({
    summary: 'Получение своих данных',
  })
  @ApiResponse({ status: 200, type: UserResponseDto })
  @Auth()
  @Get('/self')
  getSelf(@User('id') id: number) {
    return this.userService.getUserById(id)
  }

  @ApiOperation({
    summary: 'Получение пользователя по id',
  })
  @ApiResponse({ status: 200, type: UserResponseDto })
  @Auth('ADMIN')
  @Get('/:id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id)
  }

  @ApiOperation({
    summary: 'Обновление пользователей',
  })
  @ApiResponse({ status: 200, type: UserResponseDto })
  @HttpCode(200)
  @Auth('ADMIN')
  @Put('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto)
  }

  @ApiOperation({
    summary: 'Обновление своих данных',
  })
  @ApiResponse({ status: 200, type: UserResponseDto })
  @HttpCode(200)
  @Auth()
  @Put('update-self')
  async updateSelf(@User('id') id: number, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto)
  }

  @ApiOperation({
    summary: 'Удаление пользователя',
  })
  @ApiResponse({ status: 200 })
  @Auth('ADMIN')
  @Delete('/:id')
  delete(@Param('id') id: number) {
    this.userService.deleteUser(id)
  }

  @ApiOperation({
    summary: 'Удаление своего аккаунта',
  })
  @ApiResponse({ status: 200 })
  @Auth()
  @Delete('delete-self')
  deleteSelf(@User('id') id: number) {
    this.userService.deleteUser(id)
  }

  @ApiOperation({
    summary: 'Выдача роли пользователю',
  })
  @ApiResponse({ status: 200, type: RoleDto })
  @HttpCode(200)
  @Auth('ADMIN')
  @Post('/role')
  addRole(@Body() dto: RoleDto) {
    return this.userService.addRole(dto)
  }

  @ApiOperation({
    summary: 'Удаление роли у пользователя',
  })
  @ApiResponse({ status: 200, type: RoleDto })
  @Auth('ADMIN')
  @Delete('/role')
  deleteRole(@Body() dto: RoleDto) {
    return this.userService.deleteRole(dto)
  }
}
