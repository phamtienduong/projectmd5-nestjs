import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('create')
  async create(@Body() category: CreateCategoryDto) {
    try {
      const result = await this.categoriesService.create(category);
      return { message: 'Category created successfully ', data: result };
    } catch (error) {
      console.log(error);
    }
  }
  @Get("list")
  async findAll() {
    try {
      const result = await this.categoriesService.findAll();
      return { message: 'Danh sách Category', data: result };
    } catch (error) {
      console.log(error);
    }
    
  }

  @Patch('/update/:id')
  async update(@Param('id') id: string, @Body() category: UpdateCategoryDto) {
    try {
      const result = await this.categoriesService.update(+id, category);
      return { message: 'Cập nhập Category thành công ', data: result };
    } catch (error) {
      console.log(error);
    }
  }
  @Delete('/delete/:id')
  async remove(@Param('id') id: string) {
    try {
    const result =await this.categoriesService.remove(+id);
    return { message: 'Xóa Category thành công ', data: result };
    } catch (error) {
      console.log(error);
      
    }
  }
}
