import { IsString, IsOptional } from 'class-validator';

export class SubDepartmentDTO {
    @IsOptional()
    id?: number;

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsOptional()
    departmentId?: number; 
}
