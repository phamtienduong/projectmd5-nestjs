import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { CartsModule } from './carts/carts.module';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailsModule } from './order_details/order_details.module';
import { UserEntity } from './users/entities/user.entity';
import { ProductEntity } from './products/entities/product.entity';
import { CategoryEntity } from './categories/entities/category.entity';
import { CartEntity } from './carts/entities/cart.entity';
import { OrderEntity } from './orders/entities/order.entity';
import { OrderDetailEntity } from './order_details/entities/order_detail.entity';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [ 
    TypeOrmModule.forRoot({
      type:"mysql",
      host:"localhost",
      port:3306,
      username:"root",
      password:"",
      database:"dragon_shop",
      entities:[UserEntity,ProductEntity,CategoryEntity,CartEntity,OrderEntity,OrderDetailEntity],
      synchronize:true
    }), UsersModule, ProductsModule, CategoriesModule, CartsModule, OrdersModule, OrderDetailsModule, AuthModule ,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
