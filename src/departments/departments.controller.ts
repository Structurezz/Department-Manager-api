import { Controller, Post, Body, Get, Param, Put, Delete, UsePipes, ValidationPipe,NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDTO } from './dto/create-department.dto';
import { UpdateDepartmentDTO } from './dto/update-department.dto';
import { DepartmentDTO } from './dto/department.dto';
import { Department } from './department.entity';

@Controller('departments')
export class DepartmentsController {
    constructor(private readonly departmentsService: DepartmentsService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() createDepartmentDTO: CreateDepartmentDTO): Promise<DepartmentDTO> {
        const department = await this.departmentsService.create(createDepartmentDTO);
        return this.toDTO(department);
    }

    @Get()
    async findAll(): Promise<DepartmentDTO[]> {
        try {
            const departments = await this.departmentsService.findAll();
            return departments.map(department => this.toDTO(department));
        } catch (error) {
            console.error('Error fetching departments:', error);
            throw new InternalServerErrorException('Failed to fetch departments');
        }
    }

    
    
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<DepartmentDTO> {
        const department = await this.departmentsService.findOne(id);
        if (!department) {
            throw new NotFoundException(`Department with ID ${id} not found`);
        }
        return this.toDTO(department);
    }
    

    @Put(':id')
    @UsePipes(new ValidationPipe())
    async update(
        @Param('id') id: number,
        @Body() updateData: UpdateDepartmentDTO,
    ): Promise<DepartmentDTO> {
        
        const department = await this.departmentsService.update(id, updateData);
        return this.toDTO(department); 
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.departmentsService.delete(id);
    }

   
    private toDTO(department: Department): DepartmentDTO {
        return {
            id: department.id,
            name: department.name,
            description: department.description,
            subDepartments: department.subDepartments.map(sub => ({
                id: sub.id,
                name: sub.name,
                description: sub.description
            })),
        };
    }
    
    


    
    
}
