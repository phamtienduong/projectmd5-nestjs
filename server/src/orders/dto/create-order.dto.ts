export class CreateOrderDto {
    order_id: number;
    phone: string;
    address: string;
    createdAt: string;
    total_price: number;
    status: any;
    user_id: number;
    cart: any;
}
