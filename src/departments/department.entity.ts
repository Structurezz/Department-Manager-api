import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { SubDepartment } from './sub-department.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Department {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    description?: string;

    // Nested departments (hierarchy)
    @Field(() => [Department], { nullable: true })
    @OneToMany(() => Department, (department) => department.parent)
    nestedSubDepartments?: Department[];

    // SubDepartment relationship
    @Field(() => [SubDepartment], { nullable: 'itemsAndList' })
    @OneToMany(() => SubDepartment, (subDepartment) => subDepartment.department, { eager: true })
    subDepartments?: SubDepartment[];

    // Parent department
    @Field(() => Department, { nullable: true })
    @ManyToOne(() => Department, (department) => department.nestedSubDepartments, { nullable: true })
    @JoinColumn({ name: 'parentId' })
    parent?: Department;
}
