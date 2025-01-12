import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { DepartmentsModule } from './departments/departments.module';
import { Department } from './departments/department.entity';
import { SubDepartment } from './departments/sub-department.entity'; 
import { join } from 'path';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: 'postgresql://department_api_user:1Q1WzWU3UcCupDgU9pzwzdCb1Ec7VCZ3@dpg-cu1u24pu0jms738m55l0-a.oregon-postgres.render.com/department_api',
            entities: [User, Department, SubDepartment], 
            synchronize: true,
            ssl: {
                rejectUnauthorized: false,
            },
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        }),
        AuthModule,
        DepartmentsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
