import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('api/v1/carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post('create')
  async create(@Body() createCartDto: CreateCartDto) {
    try {
      const result = await this.cartsService.create(createCartDto);
      // console.log('444444', result);

      if (!result) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã có sản phẩm này trong giỏ hàng',
          data: result,
        };
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Thêm sản phẩm vào giỏ hàng thành công',
        data: result,
      };
    } catch (error) {
      console.log(error);
    }
  }

  @Get('user/:id')
  async getCartByUser(@Param('id') id: number) {
    try {
      const result = await this.cartsService.findAll(id);
      // console.log('444444', result);
      return {
        statusCode: HttpStatus.OK,
        message: 'Lấy danh sách sản phẩm thành công',
        data: result,
      };
    } catch (error) {
      console.log(error);
    }
  }
  @Put('quantity/incre')
  async updateQuantityIncre(@Body() creatquantity: any) {
    try {
      const result = await this.cartsService.updateQuantityIncre(creatquantity);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cập nhật thành công',
        data: result,
      };
    } catch (error) {
      console.log(error);
    }
    
  }
  @Put('/quantity/decre')
  async updateQuantityDecre(@Body() creatquantity: any) {
    try {
      const result = await this.cartsService.updateQuantityDecre(creatquantity);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cập nhật thành công',
        data: result,
      };
    } catch (error) {
      console.log(error);
    }
    
  }
    

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    const result =await this.cartsService.remove(+id);
    return { message: 'Xoá sản phẩm thành công ', data: result };
  }
  @Delete('user_id/:id')
  async deleteCartByUserId(@Param('id') id: number) {
    // console.log("ssssssss",id);
    
    const result =await this.cartsService.deleteCartByUserId(id);
    return { message: 'Xoá giỏ hàng thành công ', data: result };
  }
}
