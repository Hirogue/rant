import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class Base {

    @PrimaryGeneratedColumn('uuid') id: string;

    @CreateDateColumn()
    create_at: number;

    @UpdateDateColumn()
    update_at: number;
}
