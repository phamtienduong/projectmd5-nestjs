import { CartEntity } from "src/carts/entities/cart.entity";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { OrderDetailEntity } from "src/order_details/entities/order_detail.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'products' })
export class ProductEntity {
    @PrimaryGeneratedColumn()
    product_id:number
    @Column()
    product_name:string
    @Column({
        type:"longtext"
    })
    image:string;
    @Column({
        type:"decimal",
        precision: 10, // Số lượng chữ số trước và sau dấu thập phân
        scale: 0 // Số lượng chữ số sau dấu thập phân
    })
    price: number;
    @Column()
    description:string
    @Column()
    stock: number
    @Column({
        type:"decimal",
        precision: 10, 
        scale:2,
        default:1
    })
    discount:number
    @ManyToOne(()=>CategoryEntity , category => category.products)
    @JoinColumn({name:"category_id"})
    category:CategoryEntity
    @OneToMany(()=>OrderDetailEntity,order=>order.product)
    orders:OrderDetailEntity[];
    @OneToMany(()=>CartEntity,cart=>cart.product)
    carts:CartEntity[]
    

}
