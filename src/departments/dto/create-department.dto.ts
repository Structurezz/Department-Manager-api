import { IsString, IsNotEmpty,IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SubDepartmentDTO {
    id: number;
    name: string;
    description: string;
    departmentId: number;
}


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
}
