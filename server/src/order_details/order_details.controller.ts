import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';

@Controller('/api/v1/order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post("create")
  async create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    try {
      const result = await this.orderDetailsService.create(createOrderDetailDto);
      return{
        message : 'Tạo thành cônng',
        data : result
      }
    } catch (error) {
      console.log(error);
    }
  }

 

  @Get('/:id')
  async getProductInBill(@Param('id') id: string) {
    try {
      const result = await this.orderDetailsService.getProductInBill(+id);
      return{
        message: 'Lấy đơn hàng thành công',
        data: result
      }
    } catch (error) {
      console.log(error);
      
    }
  }

}
