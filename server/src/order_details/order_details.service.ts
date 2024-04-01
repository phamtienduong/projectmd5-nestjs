import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetailEntity } from './entities/order_detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetailEntity)
    private orderDetailRespository: Repository<OrderDetailEntity>,
  ) {}
  async create(createOrderDetailDto: CreateOrderDetailDto) {
    const orderDetail =
      await this.orderDetailRespository.create(createOrderDetailDto);
    return this.orderDetailRespository.save(orderDetail);
  }
  async getProductInBill(id: number) {
    console.log('id', id);
    const result = await this.orderDetailRespository
      .createQueryBuilder('order_detail')
      .innerJoinAndSelect('order_detail.product', 'product')
      .where('order_id = :id', { id: id })
      .getMany();
    return result;
  }
}
