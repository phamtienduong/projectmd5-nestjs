import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: CreateUserDto) {
    const result = await  this.usersService.create(user);
    return {
      message : 'Tạo mới thành công',
      data : await result,
    };
    
  }

  @Get("list")
  async findAll() {
    try {
      const result =await this.usersService.findAll()
      return { message: 'Danh sách User', data: result };
    } catch (error) {
      console.log(error);
      
    }

  }

  @Patch('active/:id')
  async changeActiveUser(@Param('id') id: string, ) {
    try {
      const result = await this.usersService.update(+id);
      return {
        message: 'Cập nhật thành công',
        data: result
      }

    } catch (error) {
      console.log(error);
      
    }  
  }  
   
}
