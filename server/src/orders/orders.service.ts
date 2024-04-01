import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderDetailEntity } from 'src/order_details/entities/order_detail.entity';
import { CreateOrderDetailDto } from 'src/order_details/dto/create-order_detail.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(OrderDetailEntity)
    private readonly orderDetailRepository: Repository<OrderDetailEntity>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const result = this.orderRepository.create(createOrderDto);
    return await this.orderRepository.save(result);
  }
  async createDetail(createOrderDetailDto: any) {
    const data = {
      order: createOrderDetailDto.order_id,
      product: createOrderDetailDto.product_id,
      quantity: createOrderDetailDto.quantity
    }
    const result = this.orderDetailRepository.create(data);
    
    return await this.orderDetailRepository.save(result);
  }

  async findAll() {
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .innerJoinAndSelect('order.user', 'user')
      .innerJoinAndSelect('order.details', 'details')
      .innerJoinAndSelect('details.product', 'product')
      .getMany();
    return order;
  }

  async getBillForUser(id: number) {
    const result = this.orderRepository
      .createQueryBuilder('order')
      .innerJoinAndSelect('order.user', 'user')
      .innerJoinAndSelect('order.details', 'details')
      .innerJoinAndSelect('details.product', 'product')
      // .where(`"order".userId = :id`, { id: id })
      // .where('user_id = :id', { id: id })
      .getMany();
    return result;
  }

  async adminCancel(id: number) {
    const result = await this.orderRepository
      .createQueryBuilder()
      .update(OrderEntity)
      .set({ status: Order.CANCEL_ADMIN })
      .where('order_id = :id', { id: id })
      .execute();
    return result;
  }
  async adminDone(id: number) {
    const result = await this.orderRepository
      .createQueryBuilder()
      .update(OrderEntity)
      .set({ status: Order.DONE })
      .where('order_id = :id', { id: id })
      .execute();
    return result;
  }
  async userCancel(id: number) {
    const result = await this.orderRepository
      .createQueryBuilder()
      .update(OrderEntity)
      .set({ status: Order.CANCEL_USER })
      .where('order_id = :id', { id: id })
      .execute();
    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
