import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Todo')
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column({ default: false })
    isDone: boolean;
    @Column()
    order: number;

}