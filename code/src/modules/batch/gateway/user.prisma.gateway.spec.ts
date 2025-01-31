import { Test, TestingModule } from '@nestjs/testing';
import { TicketPrismaGateway } from './ticket.prisma.gateway';

describe('UserPrismaGateway', () => {
  let gateway: TicketPrismaGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketPrismaGateway],
    }).compile();

    gateway = module.get<TicketPrismaGateway>(TicketPrismaGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
