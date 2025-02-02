import { Test, TestingModule } from '@nestjs/testing';
import { UserPrismaGateway } from 'src/modules/user/gateway/user.prisma.gateway';

describe('UserPrismaGateway', () => {
  let gateway: UserPrismaGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPrismaGateway],
    }).compile();

    gateway = module.get<UserPrismaGateway>(UserPrismaGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
