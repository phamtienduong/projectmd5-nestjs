import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDetailDto } from 'src/order_details/dto/create-order_detail.dto';

@Controller('/api/v1/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService
    ) {}

  @Post("create")
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const cart = createOrderDto.cart;
    try {
      const data = await this.ordersService.create(createOrderDto);
      // console.log("=====> :::: ", data);
      if (data.order_id) {
        for (let i = 0; i < cart.length; i++ ){
          
          const cartIem = {
            order_id: data.order_id,
            product_id: cart[i].product_product_id,
            quantity: +cart[i].carts_quantity
          } as CreateOrderDetailDto
          // console.log("cart item :::", cartIem);
          await this.ordersService.createDetail(cartIem);
        }
        return {
          statusCode: HttpStatus.OK,
          message: 'Tạo đơn hàng thành công',
          data: data.order_id,
        }
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Tạo đơn hàng thành công',
        data: data
      }
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  async getBillForAdmin() {
    try {
      const result = await this.ordersService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Lấy danh sách đơn hàng thành công',
        data: result
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  @Get(':id')
  async getBillForUser(@Param('id') id: string) {
    try {
      const result = await this.ordersService.getBillForUser(+id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Lấy đơn hàng thành công',
        data: result
      }
    } catch (error) {
      console.log(error);
    }
  }

  @Put('admindeny/:id')
  async adminCancel(@Param('id') id: string) {
    try {
      // console.log("đs",id);
      
      const result = await this.ordersService.adminCancel(+id);
      return{
        statusCode: HttpStatus.OK,
        message: 'Duyệt đơn hàng thành công',
        data: result
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  @Put('admindone/:id')
  async adminDone(@Param('id') id: string) {
    try {
      // console.log("đs",id);
      
      const result = await this.ordersService.adminDone(+id);
      return{
        statusCode: HttpStatus.OK,
        message: 'Duyệt đơn hàng thành công',
        data: result
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  @Put('usercancel/:id')
  async userCancel(@Param('id') id: string) {
    try {
      // console.log("đs",id);
      
      const result = await this.ordersService.userCancel(+id);
      return{
        statusCode: HttpStatus.OK,
        message: 'Duyệt đơn hàng thành công',
        data: result
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
