// departments/departments.resolver.ts
import { Resolver, Query } from '@nestjs/graphql';
import { DepartmentsService } from './departments.service';
import { Department } from './department.entity';

@Resolver(() => Department) // Specify the GraphQL type for this resolver
export class DepartmentsResolver {
    constructor(private readonly departmentsService: DepartmentsService) {}

    @Query(() => [Department]) // Define a GraphQL query that returns a list of departments
    async getDepartments(): Promise<Department[]> {
        return this.departmentsService.findAll(); // Assuming you have a method to find all departments
    }
}
