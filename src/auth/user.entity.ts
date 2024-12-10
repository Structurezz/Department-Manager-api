

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user') // Adjust the name as necessary
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    fullName: string; 
    @Column({ nullable: true })
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;
}
