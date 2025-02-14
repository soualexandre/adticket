import { Injectable } from '@nestjs/common';
import { MercadoPagoProvider } from './mercado-pago';
import { CreateMercadoPagoDto } from './dto/pix-mercado-pago.dto';
import { GetPaymentDTO, PaymentDTO } from './dto/mercado-pago-payment.dto';

@Injectable()
export class MercadoPagoService {
    constructor(private readonly mercadoPagoProvider: MercadoPagoProvider) { }

    async createPayment(dto: CreateMercadoPagoDto): Promise<PaymentDTO> {
        return this.mercadoPagoProvider.createPixPayment(dto);
    }

    async getAllPayments(): Promise<GetPaymentDTO[] | undefined> {
        return this.mercadoPagoProvider.getPayments();
    }

    async getPaymentById(id: string): Promise<PaymentDTO> {
        return this.mercadoPagoProvider.getPaymentById(id);
    }

    async updatePayment(id: string): Promise<PaymentDTO> {
        return this.mercadoPagoProvider.cancelPayment(id);
    }
}
