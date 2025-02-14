import { Test, TestingModule } from '@nestjs/testing';
import { MercadoPago } from './mercado-pago';

describe('MercadoPago', () => {
  let provider: MercadoPago;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MercadoPago],
    }).compile();

    provider = module.get<MercadoPago>(MercadoPago);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
