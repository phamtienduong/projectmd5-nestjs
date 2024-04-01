import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CartEntity])],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
