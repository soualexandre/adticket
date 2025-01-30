import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { UserPrismaGateway } from './gateway/user.prisma.gateway';
import { USER_TYPE_GATEWAY } from './gateway/user.type.gateway';

@Module({
    controllers: [UserController],
    providers: [
        UserService,
        PrismaService,
        {
            provide: USER_TYPE_GATEWAY,
            useClass: UserPrismaGateway,
        },
    ],
    exports: [UserService],
})
export class UserModule { }
