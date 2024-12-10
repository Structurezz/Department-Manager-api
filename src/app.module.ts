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
            url: 'postgresql://orizu01:T7cLvpb5Ui0aoVTvXel3KITwBc98I8Ai@dpg-ctc5rn0gph6c73ace1bg-a.oregon-postgres.render.com:5432/structurezz',
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
