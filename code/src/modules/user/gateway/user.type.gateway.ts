import { CreateUserDto } from '../dto/create-user.dto';
import { PaginateUserOutputDto } from '../dto/paginate-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { WhereUserDto } from '../dto/where.user.dto';
import { UserEntity } from '../entities/user.entity';

export const USER_TYPE_GATEWAY = 'USER_TYPE_GATEWAY';

export interface UserTypePrismaGateway {
    create(createUserDto: CreateUserDto): Promise<UserEntity>;
    findAll(skip: number, take: number, where?: WhereUserDto): Promise<PaginateUserOutputDto>
    findOne(id: string, where?: WhereUserDto): Promise<UserEntity>;
    update(
        id: string,
        updateAdministratorDto: UpdateUserDto,
        where?: WhereUserDto,
    ): Promise<UserEntity>;
    remove(id: string): Promise<boolean>;
}
