import { IsUrl, Length, MaxLength } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Length(1, 250, {
    message: 'Wishlist name needs to be between 1 and 250 characters',
  })
  name: string;

  @Column()
  @MaxLength(1500, {
    message: 'Wishlist description can be maximum 1500 characters',
  })
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @ManyToMany(() => Wish)
  // ??
  items: Wish[];

  @ManyToOne(() => User)
  owner: User;
}
