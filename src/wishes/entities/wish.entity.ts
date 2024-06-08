import { IsNumber, IsUrl, Length } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Length(1, 250, {
    message: 'Name field needs to be between 1 and 250 characters',
  })
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  // ?? Cтоимость подарка, С ОКРУГЛЕНИЕМ ДО СОТЫХ (?), число
  @Column()
  @IsNumber()
  price: number;

  // ?? сумма, тоже округляется до сотых (?)
  @Column()
  @IsNumber()
  raised: number;

  // ?? ссылка на пользователя, который добавил пожелание подарка
  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @Column()
  @Length(1, 1024, {
    message: 'The wish description needs to be between 1 and 1024 characters',
  })
  description: string;

  // ?? Массив ссылок на заявки скинуться от других пользователей
  // ?? Установить подходящий тип связи
  // offers: Offer[];

  // ?? содержит cчётчик тех, кто скопировал подарок себе. Целое десятичное число
  @Column()
  @IsNumber()
  copied: number;
}
