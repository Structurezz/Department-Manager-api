import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Department } from './department.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()

@Entity()
export class SubDepartment {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column({ nullable: true }) 
    description: string; 

    @ManyToOne(() => Department, department => department.subDepartments)
    department: Department;
}

