
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'varchar', nullable:false})
    account_type: string;

    @Column({type:'varchar', nullable:false})
    email: string;

    @Column({type:'varchar', nullable:false})
    password: string;

    @Column({type:'varchar', nullable:false})
    company_name: string;

    @Column({type:'varchar', nullable:false})
    users: number

    @Column({type:'varchar', nullable:false})
    products: number;

    @Column({type:'varchar', nullable:false})
    percentage: string;

    @Column({type:'text', nullable:true})
    image?: string;

    @CreateDateColumn({nullable: true})
    created_at?: Date;

    @CreateDateColumn({nullable: true})
    updated_at?: Date;
}