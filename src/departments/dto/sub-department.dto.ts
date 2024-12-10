// src/departments/dto/sub-department.dto.ts
import { IsOptional, IsString } from 'class-validator';

import { Department } from '../department.entity';

export class SubDepartmentDTO {
    id: number;

    @IsString()
    name: string;

    @IsOptional()
    description?: string;

    
    @IsOptional()
    departmentId?: number; 
}
