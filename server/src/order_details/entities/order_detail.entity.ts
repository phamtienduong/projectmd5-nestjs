import { OrderEntity } from "src/orders/entities/order.entity";
import { ProductEntity } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "order_details"})
export class OrderDetailEntity {
    @PrimaryGeneratedColumn()
    order_detail_id: number;
    @Column()
    quantity:number
    
    @ManyToOne(() => OrderEntity, order=>order.details)
    @JoinColumn( { name:"order_id"} )  
    order:OrderEntity

    @ManyToOne(()=>ProductEntity,product=>product.orders)
    @JoinColumn({name:'product_id'})
    product:ProductEntity
}
