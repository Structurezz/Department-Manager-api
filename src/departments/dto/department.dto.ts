import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { SubDepartmentDTO } from './sub-department.dto';

@ObjectType() // Indicates this class is a GraphQL object type
export class DepartmentDTO {
    @Field(type => Int) // Specifies the type for GraphQL
    @IsNotEmpty()
    id: number;

    @Field() // Defaults to String
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field({ nullable: true }) // Specifies this field is optional in GraphQL
    @IsOptional()
    description?: string;

    @Field(type => [SubDepartmentDTO], { nullable: 'itemsAndList' }) // Indicates an array of SubDepartmentDTO, can be null or empty
    @IsOptional()
    @IsArray()
    subDepartments?: SubDepartmentDTO[];

    @Field(type => DepartmentDTO, { nullable: true }) // Indicates that parent can be null
    @IsOptional()
    parent?: DepartmentDTO;

    @Field(type => Int, { nullable: true }) // Adds parentId for relational queries
    @IsOptional()
    parentId?: number;
}
