import { Body, Controller, Get, Post } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAll() {
    return this.userService.getAllUsers()
  }
}
