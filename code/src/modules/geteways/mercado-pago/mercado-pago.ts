import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { CreateMercadoPagoDto } from './dto/pix-mercado-pago.dto';
import { UpdateMercadoPagoDto } from './dto/update-mercado-pago.sto';
import { PaymentDTO } from './dto/mercado-pago-payment.dto';

@Injectable()
export class MercadoPagoProvider {
    private mercadopago: Payment;
    constructor() {
        const client = new MercadoPagoConfig({ accessToken: 'SUA_ACCESS_TOKEN', options: { idempotencyKey: 'SUA_CHAVE_IDEMPOTENCY' } });
        this.mercadopago = new Payment(client)
    }

    async createPixPayment(dto: CreateMercadoPagoDto): Promise<PaymentDTO> {
        try {
            const response = await this.mercadopago.create({
                body: {
                    transaction_amount: dto.transaction_amount,
                    description: dto.description,
                    payment_method_id: dto.payment_method_id,
                    payer: dto.payer,
                },
            });
            if (!response) {
                throw new HttpException(response, HttpStatus.BAD_REQUEST);
            }
            return {
                id: response.id,
                status: response.status,
                transaction_amount: response.transaction_amount,
                description: response.description,
                payment_method_id: response.payment_method_id,
                qr_code: response.point_of_interaction?.transaction_data?.qr_code,
                qr_code_base64: response.point_of_interaction?.transaction_data?.qr_code_base64,
            };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async getPayments() {
        try {
            const response = await this.mercadopago.search();
            return response.results;
        } catch (error) {
            throw new HttpException('Erro ao buscar pagamentos', HttpStatus.BAD_REQUEST);
        }
    }

    async getPaymentById(id: string) {
        try {
            const response = await this.mercadopago.get({ id });
            return response;
        } catch (error) {
            throw new HttpException('Pagamento não encontrado', HttpStatus.NOT_FOUND);
        }
    }

    async cancelPayment(id: string) {
        try {
            const response = await this.mercadopago.cancel({ id });
            return response;
        } catch (error) {
            throw new HttpException('Erro ao cancelar pagamento', HttpStatus.BAD_REQUEST);
        }
    }
}
