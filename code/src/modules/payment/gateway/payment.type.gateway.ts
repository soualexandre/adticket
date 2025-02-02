import { CreatePaymentDto } from '../dto/create-payment.dto';
import { PaginatePaymentOutputDto } from '../dto/paginate-payment.dto';
import { UpdatePaymentDto } from '../dto/update-payment.dto';
import { WherePaymentDto } from '../dto/where-payment.dto';
import { PaymentEntity } from '../entities/payment.entity';

export const PAYMENT_TYPE_GATEWAY = 'PAYMENT_TYPE_GATEWAY';

export interface PaymentTypePrismaGateway {
    create(createPaymentDto: CreatePaymentDto): Promise<PaymentEntity>;
    findAll(skip: number, take: number, where?: WherePaymentDto): Promise<PaginatePaymentOutputDto>;
    findOne(id: string, where?: WherePaymentDto): Promise<PaymentEntity>;
    update(
        id: string,
        updatePaymentDto: UpdatePaymentDto,
        where?: WherePaymentDto,
    ): Promise<PaymentEntity>;
    remove(id: string): Promise<boolean>;
}