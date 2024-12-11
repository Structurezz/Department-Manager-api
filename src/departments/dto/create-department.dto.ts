import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SubDepartmentDTO } from './sub-department.dto';

export class CreateDepartmentDTO {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => SubDepartmentDTO)
    subDepartments?: SubDepartmentDTO[];

    @IsOptional()
    parentId?: number; // Optional for nested hierarchies
}
