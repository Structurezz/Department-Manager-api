// departments/departments.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { Department } from './department.entity';
import { SubDepartment } from './sub-department.entity';
import { DepartmentsResolver } from './departments.resolver'; // Import your resolver

@Module({
    imports: [TypeOrmModule.forFeature([Department, SubDepartment])],
    providers: [DepartmentsService, DepartmentsResolver], // Add the resolver here
    controllers: [DepartmentsController],
})
export class DepartmentsModule {}
