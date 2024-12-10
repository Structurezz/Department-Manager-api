// src/departments/dto/update-department.dto.ts

import { IsOptional, IsString } from 'class-validator';
import { SubDepartmentDTO } from './sub-department.dto'; // Ensure this path is correct

export class UpdateDepartmentDTO {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    subDepartments?: Partial<SubDepartmentDTO[]>; // Adjust according to your structure
}
