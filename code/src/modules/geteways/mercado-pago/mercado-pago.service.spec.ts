import { Test, TestingModule } from '@nestjs/testing';
import { MercadoPagoService } from './mercado-pago.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('MercadoPagoService', () => {
  let service: MercadoPagoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MercadoPagoService],
    }).compile();

    service = module.get<MercadoPagoService>(MercadoPagoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a PIX payment successfully with valid input data', async () => {
    const createPixPaymentDto = {
      transaction_amount: 100.0,
      description: 'Test Payment',
      payment_method_id: 'pix',
      payer: {
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        identification: {
          type: 'CPF',
          number: '12345678909',
        },
      },
    };

    const mockResponse = {
      id: '123456',
      status: 'approved',
      transaction_amount: 2.0,
      description: 'Test Payment',
      payment_method_id: 'pix',
      point_of_interaction: {
        transaction_data: {
          qr_code: 'some_qr_code',
          qr_code_base64: 'some_qr_code_base64',
        },
      },
    };

    jest.spyOn(service['mercadopago'], 'create').mockResolvedValue(mockResponse);

    const result = await service.createPayment(createPixPaymentDto);

    expect(result).toEqual({
      id: '123456',
      status: 'approved',
      transaction_amount: 2.0,
      description: 'Test Payment',
      payment_method_id: 'pix',
      qr_code: 'some_qr_code',
      qr_code_base64: 'some_qr_code_base64',
    });
  });

  it('should return a payment object when getPaymentById is called with a valid ID', async () => {
    const paymentId = 'valid_payment_id';
    const mockPaymentResponse = {
      id: paymentId,
      status: 'approved',
      transaction_amount: 100.0,
      description: 'Test Payment',
      payment_method_id: 'pix',
    };

    jest.spyOn(service['mercadopago'], 'get').mockResolvedValue(mockPaymentResponse);

    const result = await service.getPaymentById(paymentId);

    expect(result).toEqual(mockPaymentResponse);
  });

  it('should throw HttpException with NOT_FOUND status when getPaymentById is called with an invalid ID', async () => {
    const invalidPaymentId = 'invalid_payment_id';

    jest.spyOn(service['mercadopago'], 'get').mockRejectedValue(new Error('Pagamento não encontrado'));

    await expect(service.getPaymentById(invalidPaymentId)).rejects.toThrow(HttpException);
    await expect(service.getPaymentById(invalidPaymentId)).rejects.toThrow('Pagamento não encontrado');
    await expect(service.getPaymentById(invalidPaymentId)).rejects.toHaveProperty('status', HttpStatus.NOT_FOUND);
  });

  it('should handle missing transaction data gracefully in createPixPayment response', async () => {
    const createPixPaymentDto = {
      transaction_amount: 100.0,
      description: 'Test Payment',
      payment_method_id: 'pix',
      payer: {
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        identification: {
          type: 'CPF',
          number: '12345678909',
        },
      },
    };

    const mockResponse = {
      id: '123456',
      status: 'approved',
      transaction_amount: 100.0,
      description: 'Test Payment',
      payment_method_id: 'pix',
      point_of_interaction: {
        transaction_data: {
          // Missing qr_code and qr_code_base64
        },
      },
    };

    jest.spyOn(service['mercadopago'], 'create').mockResolvedValue(mockResponse);

    const result = await service.createPayment(createPixPaymentDto);

    expect(result).toEqual({
      id: '123456',
      status: 'approved',
      transaction_amount: 100.0,
      description: 'Test Payment',
      payment_method_id: 'pix',
      qr_code: undefined,
      qr_code_base64: undefined,
    });
  });

});
