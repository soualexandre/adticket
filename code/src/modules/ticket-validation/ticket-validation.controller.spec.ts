import { Test, TestingModule } from '@nestjs/testing';
import { TicketValidationController } from './ticket-validation.controller';
import { TicketValidationService } from './ticket-validation.service';

describe('TicketValidationController', () => {
  let controller: TicketValidationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketValidationController],
      providers: [TicketValidationService],
    }).compile();

    controller = module.get<TicketValidationController>(TicketValidationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
