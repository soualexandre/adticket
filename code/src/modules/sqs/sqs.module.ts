import { Module } from '@nestjs/common';
import { SqsService } from './sqs.service';
import { SQSClient } from '@aws-sdk/client-sqs';
import { fromEnv } from '@aws-sdk/credential-provider-env'; // Se você deseja usar o fromEnv
import { TicketConsumerService } from '../ticket/ticket.consumer.service';
import { PaymentModule } from '../payment/payment.module';
import { PaymentsService } from '../payment/payment.service';
import { TICKET_TYPE_GATEWAY, TicketTypePrismaGateway } from '../ticket/gateway/ticket.type.gateway';
import { TicketPrismaGateway } from '../ticket/gateway/ticket.prisma.gateway';
import { PAYMENT_TYPE_GATEWAY } from '../payment/gateway/payment.type.gateway';
import { PaymentPrismaGateway } from '../payment/gateway/payment.prisma.gateway';

@Module({
    imports: [PaymentModule],
    providers: [
        TicketConsumerService,
        SqsService,
        PaymentsService,
        {
            provide: 'SQS_CLIENT',
            useValue: new SQSClient({
                region: process.env.AWS_REGION,
                credentials: fromEnv(),
            }),
        },
        {
            provide: TICKET_TYPE_GATEWAY,
            useValue: TicketPrismaGateway,
        },
        {
            provide: PAYMENT_TYPE_GATEWAY,
            useValue: PaymentPrismaGateway,
        },
    ],
    exports: ['SQS_CLIENT', SqsService],
})
export class SqsCustomModule { }
