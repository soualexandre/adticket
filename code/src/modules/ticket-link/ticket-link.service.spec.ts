import { Test, TestingModule } from '@nestjs/testing';
import { TicketLinkService } from './ticket-link.service';

describe('TicketLinkService', () => {
  let service: TicketLinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketLinkService],
    }).compile();

    service = module.get<TicketLinkService>(TicketLinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
