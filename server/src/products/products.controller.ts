import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Controller('api/v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('search')
  async searchProducts(@Query('key') name: string): Promise<ProductEntity[]> {
    
    return this.productsService.searchProductsByName(name);
  }
  @Post("create")
  async create(@Body() products: CreateProductDto) {
    try {
      const result = await this.productsService.create(products);
      return {
        statusCode: HttpStatus.OK,
        message: 'Tạo sản phẩm thành công',
        data: result
      }
    } catch (error) {
      console.log(error);
    }
  }
  @Get("list")
  async findAll() {
    try {
      const result = await this.productsService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Lấy danh sách sản phẩm thành công',
        data: result
      }
    } catch (error) {
      console.log(error); 
    }
  }
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    try {
      const result = await this.productsService.findOne(+id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Lấy sản phẩm thành công',
        data: result
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  @Patch('update/:id')
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      const result = await this.productsService.update(+id, updateProductDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cập nhật sản phẩm thành công',
        data: result
      }
    } catch (error) {
      console.log(error);
    }
    return 
  }

  @Delete('delete/:id')
  async deleteProduct(@Param('id') id: string) {
    try {
      const result = await this.productsService.remove(+id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Xoá sản phẩm thành công',
        data: result
      }
    } catch (error) {
      console.log(error);
    }
  }
  @Get('category/:id')
  async getProductsByCategoryId(@Param('id') id: string) {
    try {
      const result = await this.productsService.getProductsByCategoryId(+id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Lấy danh sách sản phẩm thành công',
        data: result
      }
    } catch (error) {
      console.log(error);
    }
  }
 
  @Patch("update-stock/:id")
  async updateStock(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      const result = await this.productsService.updateStock(+id, updateProductDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cập nhật sản phẩm thành công',
        data: result
      }
    } catch (error) {
      console.log(error);
    }
  }

 
}
