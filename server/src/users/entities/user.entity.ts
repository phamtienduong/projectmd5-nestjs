
import { CartEntity } from "src/carts/entities/cart.entity";
import { OrderEntity } from "src/orders/entities/order.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({
        type: "varchar",
        length: 50
    })
    user_name: string;

    @Column({
        type: "varchar" // Kiểu dữ liệu là varchar
    })
    phone: string;

    @Column({
        type: "varchar" // Kiểu dữ liệu là varchar
    })
    password: string;

    @Column({
        type: "varchar" // Kiểu dữ liệu là varchar
    })
    email: string;

    @Column({
        type: "tinyint",
        default:0
    })
    role: number;

    @Column({
        type: "tinyint",
        default:0 
    })
    active: number;

    @OneToMany(()=>CartEntity,(cart)=>cart.user)
    carts: CartEntity

    @OneToMany(()=>OrderEntity, (order)=> order.user)
    orders: OrderEntity[]
}
