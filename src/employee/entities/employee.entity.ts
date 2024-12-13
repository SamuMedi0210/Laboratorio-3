import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./../../common/config/base.entity";
import { OrderEntity } from "./../../order/entities/order.entity";

@Entity('employee')
export class EmployeeEntity extends BaseEntity {
    @Column({type: 'varchar'})
    lastName: string;

    @Column({type: 'varchar'})
    firstName: string;

    @Column({type: 'date'})
    birthDate: Date;

    @Column({type: 'varchar'})
    city: string;

    @Column({type: 'varchar'})
    phote: string;

    @Column({type: 'varchar', nullable: true})
    note?: string;

    @OneToMany(()=>OrderEntity, (order)=> order.employee )
    order: OrderEntity[];
}
