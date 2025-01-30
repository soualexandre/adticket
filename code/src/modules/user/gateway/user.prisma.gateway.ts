import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { PaginateUserOutputDto } from '../dto/paginate-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { WhereUserDto } from '../dto/where.user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserTypePrismaGateway } from './user.type.gateway';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserPrismaGateway implements UserTypePrismaGateway {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
      include: {
        tickets: {
          include: {
            event: true,
            batch: true,
          },
        },
      },
    });

    return this.mapToUserEntity(user);
  }

  async findAll(skip: number, take: number, where?: WhereUserDto): Promise<PaginateUserOutputDto> {
    const users = await this.prisma.user.findMany({
      skip,
      take,
      where,
      include: {
        tickets: {
          include: {
            event: true,
            batch: true,
          },
        },
      },
    });

    const totalItems = await this.prisma.user.count({ where });
    const totalPages = Math.ceil(totalItems / take);

    return {
      data: users.map(user => this.mapToUserEntity(user)),
      pagination: {
        totalItems,
        totalPages,
        currentPage: skip / take + 1,
        pageSize: take,
      },
    };
  }



  async findOne(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        tickets: {
          include: {
            event: true,
            batch: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return this.mapToUserEntity(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      include: {
        tickets: {
          include: {
            event: true,
            batch: true,
          },
        },
      },
    });

    return this.mapToUserEntity(user);
  }

  async remove(id: string): Promise<boolean> {
    await this.prisma.user.delete({
      where: { id },
    });

    return true;
  }

  private mapToUserEntity(user: any): UserEntity {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: user.password,
      tickets: user.tickets,
    };
  }
}