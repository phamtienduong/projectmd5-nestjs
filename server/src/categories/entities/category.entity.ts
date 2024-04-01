import { ProductEntity } from "src/products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'categories' })
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    category_id:number
    @Column()
    category_name:string;
    @OneToMany(()=>ProductEntity,(products)=>products.category)
    products:ProductEntity
}
