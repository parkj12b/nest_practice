import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('lending')
export class Lending {
	@PrimaryGeneratedColumn()
	id: number;

	@Index()
	@Column({ type: 'int'})
	lendingLibrarianId: number;

	@Column({ type: 'varchar', length: 255})
	lendingCondition: string;

	@Index()
	@Column({ type: 'int', nullable: true })
	returningLibrarianId: number;

	@Column({ type: 'varchar', length: 255, nullable: true })
	returningCondition: string;

	@Column({ type: 'datetime', nullable: true})
	returnedAt: Date;

	@CreateDateColumn({ type: 'timestamp'})
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp'})
	updatedAt: Date;

	@Index()
	@Column({ type: 'int'})
	userId: number;

	@Index()
	@Column({ type: 'int'})
	bookId: number;

	@ManyToOne(() => User, user => user.lendings)
  	user: User;

}