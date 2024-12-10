// department.entity.ts
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
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

    @Field(() => [SubDepartment], { nullable: 'itemsAndList' })
    @OneToMany(() => SubDepartment, (subDepartment) => subDepartment.department, { eager: true })
    subDepartments?: SubDepartment[];

    @Field({ nullable: true })
    parent?: Department; // This can be handled in the resolver
}