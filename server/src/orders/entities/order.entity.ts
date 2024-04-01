import { OrderDetailEntity } from "src/order_details/entities/order_detail.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum Order {
    PENDING = "đang xử lý",
    DONE = "đã xác nhận",
    CANCEL_USER = "user đã huỷ",
    CANCEL_ADMIN = "admin đã huỷ"
}

@Entity({name:"order"})
export class OrderEntity {    
    @PrimaryGeneratedColumn()
    order_id: number;
    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    createdAt: string;

    @Column()
    total_price: number;

    @Column({
        type: "enum",
        enum: Order,
        default: Order.PENDING
    })
    status: Order;
    @ManyToOne(()=>UserEntity,(user)=>user.orders)
    @JoinColumn({
        name : 'user_id'
    })
    user: UserEntity

    @OneToMany(()=>OrderDetailEntity , (detail)=> detail.order)
    details : OrderDetailEntity[]

}
