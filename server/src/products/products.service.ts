import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoryEntity } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRespository: Repository<ProductEntity>,
    // @InjectRepository(CategoryEntity) private cateRespository:Repository<CategoryEntity>,
  ) {}
  async create(dataProduct: CreateProductDto) {
    const newProduct = await this.productRespository.create(dataProduct);
    return await this.productRespository.save(newProduct);
  }

  async findAll(query: any) {
    console.log('query3333', query.min, query.max);
    if (query.orderBy == 'ASC') {
      const products = await this.productRespository
        .createQueryBuilder('products')
        .where('products.price between :min and :max', { min: query.min, max: query.max })
        .orderBy('products.price', 'ASC')
        .getMany();
      return products;
    }
    if (query.orderBy == 'DESC') {
      const products = await this.productRespository
        .createQueryBuilder('products')
        .where('products.price between :min and :max', { min: query.min, max: query.max })
        .orderBy('products.price', 'DESC')
        .getMany();
      return products;
    }
    
    const products = await this.productRespository
      .createQueryBuilder('products')
      .where('products.price between :min and :max', { min: query.min, max: query.max })
      .orderBy('products.discount', 'ASC')
      .getMany();
    console.log("productss",products);
    
    return products;
    
    
  }

  async findOne(id: number) {
    const product = await this.productRespository.findOne({
      where: { product_id: id },
    });
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updateProduct = await this.productRespository
      .createQueryBuilder()
      .update(ProductEntity)
      .set(updateProductDto)
      .where('product_id=:id', { id })
      .execute();
    return updateProduct;
  }

  async remove(id: number) {
    const product = await this.productRespository.delete(id);
    if (product.affected === 0) {
      return 'Not found';
    } else {
      return 'Delete Successfully!';
    }
  }
  async getProductsByCategoryId(id: number) {
    const products = await this.productRespository.find({
      where: { category: { category_id: id } },
    });
    return products;
  }
  async searchProductsByName(name: string): Promise<ProductEntity[]> {
    return (
      this.productRespository
        .createQueryBuilder('products')
        // .innerJoinAndSelect('products.category', 'category')
        .where('products.product_name LIKE :name', { name: `%${name}%` })
        .getMany()
    );
  }
  async updateStock(id: number, updateProductDto: UpdateProductDto) {
    const updateStock = await this.productRespository
      .createQueryBuilder()
      .update(ProductEntity)
      .set({
        stock: updateProductDto.stock,
      })
      .where('product_id=:id', { id })
      .execute();
    return updateStock;
  }
}
