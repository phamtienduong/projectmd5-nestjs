import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity) private cateRespository:Repository<CategoryEntity>
  ){}
  create(dataCategory) {
      const newCate = this.cateRespository.create(dataCategory)
      return this.cateRespository.save(newCate)

  }

  async findAll() {
    return await this.cateRespository.find()
  }
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const update = await this.cateRespository.update(id, updateCategoryDto)
     if (update.affected == 0) {
       return 'Not found'
     } else{
       return 'Update Successfully!'
     }
  }
  async remove(id: number) {
    const deleteCate = await this.cateRespository.delete(+id)
    console.log(deleteCate);
    if (!deleteCate.affected) {
      return 'Not found'
    } else{
      return 'Delete Successfully!'
    }
  }
}
