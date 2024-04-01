import { ProductEntity } from "src/products/entities/product.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'carts' })
export class CartEntity {
    @PrimaryGeneratedColumn()
    cart_id:number
    @Column()
    quantity: number;
    @ManyToOne(()=>UserEntity, user => user.carts)
    @JoinColumn({name:'user_id'})
    user: UserEntity
    @ManyToOne(()=>ProductEntity, product => product.carts)
    @JoinColumn({name:'product_id'})
    product: ProductEntity
}
