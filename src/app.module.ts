// app.module.ts
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
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD, 
            database: process.env.DB_DATABASE,
            entities: [User, Department, SubDepartment], 
            synchronize: true,
            ssl: {
                rejectUnauthorized: false, // Allow self-signed certificates; use with caution
            },
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Automatically generate schema file
        }),
        AuthModule,
        DepartmentsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
