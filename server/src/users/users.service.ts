import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private userRespository:Repository<UserEntity>
  ){}
  create(dataUser) {
    try {
      const newUser = this.userRespository.create(dataUser)
      return this.userRespository.save(newUser);
      } catch (error) {
        console.log('Error al crear  usuario', error);
      throw error;
      }  
  }
   async getByEmail(email:string):Promise<UserEntity>{
     return await this.userRespository.findOne({where:{email}});
  }
  async findAll() {
    return await this.userRespository.find({ where: { role: 0 } });
  }

  

  async update(id: number) {
    const user = await this.userRespository.findOne({ where: { user_id: id } });
    console.log(user);
    if (user.active==0) {
      const updateActive = await this.userRespository
      .createQueryBuilder()
      .update(UserEntity)
      .set({ active: 1 })
      .where("user_id=:id", { id })
      .execute();
      return updateActive
    }else{
      const updateActive1 = await this.userRespository
      .createQueryBuilder()
      .update(UserEntity)
      .set({ active: 0 })
      .where("user_id=:id", { id })
      .execute();
      return updateActive1 ;
    }
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
