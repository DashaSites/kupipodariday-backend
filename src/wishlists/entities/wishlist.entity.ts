import { IsEmail, IsUrl, Length } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ unique: true })
  @Length(2, 30, {
    message: 'Username needs to be between 2 and 30 characters',
  })
  username: string;

  @Column({ default: 'No info so far' })
  @Length(2, 30, {
    message: 'This field needs to contain between 2 and 200 characters',
  })
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsUrl()
  avatar: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  // Подарки
  // !! Установить какой-то тип связи с таблицей подарков
  // wishes: Wish[];

  // Список подарков, на которые скидывается пользователь
  // !! Установить какой-то тип связи с таблицей wishes
  // offers: Offer[];

  // Cписок вишлистов, которые создал пользователь
  // !! Установить какой-то тип связи с таблицей wishlists
  // wishlists: Wishlist[];
}