import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    product_name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    // @IsNumber()
    @IsNotEmpty()
    price: number;

    // @IsNumber()
    @IsNotEmpty()
    stock: number;

    @IsString()
    image: string;

    // @IsNumber()
    category_id: number;
}