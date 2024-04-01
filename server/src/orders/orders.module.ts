import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderDetailEntity } from 'src/order_details/entities/order_detail.entity';

@Module({
  imports:[TypeOrmModule.forFeature([OrderEntity,OrderDetailEntity])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
