import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./../../common/config/base.entity";
import { ProductEntity } from "./../../products/entities/product.entity";
import { OrderEntity } from "./../../order/entities/order.entity";



@Entity('orderDetail')
export class OrderDetailEntity extends BaseEntity {

    @Column({type: 'int'})
    quantity: number=0;

    @ManyToOne(()=> OrderEntity, (order)=>order.orderDetail)
    @JoinColumn({name:'order_id'})
    order: string;
    
    @ManyToOne(()=> ProductEntity, (product)=>product.orderDetail)
    @JoinColumn({name:'product_id'})
    product: string;

}
