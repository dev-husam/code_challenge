import { AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class Product extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number


    @Column
    name: string

    @Column
    descriptions: string

    @Column
    qty: number

    @Column({ defaultValue: true })
    isActive: boolean;

}
