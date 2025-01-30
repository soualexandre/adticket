import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_TYPE_GATEWAY, UserTypePrismaGateway } from './gateway/user.type.gateway';

@Injectable()
export class UserService {

  constructor(
    @Inject(USER_TYPE_GATEWAY) private readonly userGateway: UserTypePrismaGateway,
  ) { }


  async create(createUserDto: CreateUserDto) {
    const user = await this.userGateway.create(createUserDto);
    return user;
  }

  async findAll() {
    const page = 1;
    const limit = 1000;
    const skip = (page - 1) * limit;
    const take = limit;

    return await this.userGateway.findAll(skip, take);
  }


  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
