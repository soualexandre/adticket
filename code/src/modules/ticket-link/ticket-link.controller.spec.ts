import { Test, TestingModule } from '@nestjs/testing';
import { TicketLinkController } from './ticket-link.controller';
import { TicketLinkService } from './ticket-link.service';

describe('TicketLinkController', () => {
  let controller: TicketLinkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketLinkController],
      providers: [TicketLinkService],
    }).compile();

    controller = module.get<TicketLinkController>(TicketLinkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
