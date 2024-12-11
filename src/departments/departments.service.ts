import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';
import { CreateDepartmentDTO } from './dto/create-department.dto';
import {  DepartmentDTO } from './dto/department.dto';
import { SubDepartment } from './sub-department.entity';
import { UpdateDepartmentDTO } from './dto/update-department.dto'; 
@Injectable()
export class DepartmentsService {
    constructor(
        @InjectRepository(Department)
        private departmentRepository: Repository<Department>,
        @InjectRepository(SubDepartment)
        private subDepartmentRepository: Repository<SubDepartment>,
    ) {}

    async create(createDepartmentDTO: CreateDepartmentDTO): Promise<Department> {
        const { subDepartments, parentId, ...departmentData } = createDepartmentDTO;
    
        const department = this.departmentRepository.create(departmentData);
    
        if (parentId) {
            department.parent = await this.departmentRepository.findOne({ where: { id: parentId } });
        }
    
        if (subDepartments) {
            department.subDepartments = subDepartments.map(sub => this.subDepartmentRepository.create(sub));
        }
    
        return await this.departmentRepository.save(department);
    }
    
    

    async findAll(): Promise<Department[]> {
        return await this.departmentRepository.find({
            relations: ['subDepartments', 'nestedSubDepartments', 'parent'],
        });
    }
    
    
    

    async findOne(id: number): Promise<Department> {
        const department = await this.departmentRepository.findOne({
            where: { id },
            relations: ['subDepartments'],
        });
        if (!department) {
            throw new NotFoundException(`Department with ID ${id} not found`);
        }
        return department;
    }

    private toDTO(department: Department): DepartmentDTO {
        return {
            id: department.id,
            name: department.name,
            description: department.description,
            subDepartments: department.subDepartments?.map(subDept => ({
                id: subDept.id,
                name: subDept.name,
                description: subDept.description,
                departmentId: subDept.department?.id,
            })) || [] 
        };
    }
    
    
    

    async update(id: number, updateData: Partial<UpdateDepartmentDTO>): Promise<Department> {
        const { name, description, subDepartments } = updateData;

        const department = await this.departmentRepository.findOne({
            where: { id },
            relations: ['subDepartments'],
        });
        if (!department) {
            throw new NotFoundException(`Department with ID ${id} not found`);
        }

       
        if (name !== undefined) department.name = name;
        if (description !== undefined) department.description = description;

        
        if (subDepartments) {
           
            await this.subDepartmentRepository.delete({ department: { id } });


            const newSubDepartments = subDepartments.map(subDept => {
                return this.subDepartmentRepository.create({
                    ...subDept,
                    department, 
                });
            });

           
            await this.subDepartmentRepository.save(newSubDepartments);
            department.subDepartments = newSubDepartments; 
        }

      
        await this.departmentRepository.save(department);

        return department; 
    }

    async delete(id: number): Promise<void> {
        
        const department = await this.departmentRepository.find({
            where: { id },
            relations: ['subDepartments'],
        });
    
        if (!department || department.length === 0) {
            throw new NotFoundException(`Department with ID ${id} not found`);
        }
    
        
        await this.subDepartmentRepository.delete({ department: { id } });
    
      
        await this.departmentRepository.delete(id);
    }
    
    
    
    
    
}
