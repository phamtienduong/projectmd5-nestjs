import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { log } from 'console';
import { ProductEntity } from 'src/products/entities/product.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>
  ){}
  async create(createCartDto: any) {
    
    const checkCart = await this.cartRepository.createQueryBuilder().select().where('user_id = :user', { user: createCartDto.user }).andWhere('product_id = :product', { product: createCartDto.product }).execute();
    
    if(checkCart.length==0){
      const newCart = this.cartRepository.create(createCartDto);
      return await this.cartRepository.save(newCart);
    }else{
      return null
    }
    
    

  }
  async findAll(user_id: any) {
    // console.log("1111",user_id);
    const carts = await this.cartRepository.createQueryBuilder("carts").innerJoinAndSelect("carts.product", "product").where('user_id = :user', { user: user_id }).execute()
    // console.log("22222",carts);
    return carts
  }


  async updateQuantityIncre(creatquantity:any) {
    // console.log("==>>> id uddate:: ", creatquantity);
    
    const cart = await this.cartRepository.createQueryBuilder().update(CartEntity).set({quantity: () => "quantity + 1"}).where('cart_id = :id', { id: creatquantity.carts_cart_id }).execute();
    return []
  }
  async updateQuantityDecre(creatquantity:any) {
    const cart = await this.cartRepository.createQueryBuilder().update(CartEntity).set({quantity: () => "quantity - 1"}).where('cart_id = :id', { id: creatquantity.carts_cart_id }).execute();

    // console.log("4444",cart);
    // return await this.cartRepository.save(cart);
  }
  async remove(id: number) {
    const cart = await this.cartRepository.createQueryBuilder("cart").delete().where('cart_id = :id', { id: id }).execute();
    return cart
  }
  async deleteCartByUserId(id: number) {
    // console.log("id: ",id);
    const cart = await this.cartRepository.createQueryBuilder("cart").delete().where('user_id = :id', { id: id }).execute();
    return cart
  }
}
