import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Consumer } from 'sqs-consumer';
import { SQSClient, Message } from '@aws-sdk/client-sqs';

@Injectable()
export class TicketConsumerService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(TicketConsumerService.name);
    private consumer: Consumer;

    constructor() {
        this.consumer = Consumer.create({
            queueUrl: process.env.SQS_QUEUE_URL as string,
            handleMessage: async (message: Message) => {
                await this.processMessage(message);
            },
            sqs: new SQSClient({
                region: process.env.AWS_REGION,
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
                },
            }),
        });

        this.setupEventHandlers();
    }

    async onModuleInit() {
        this.logger.log('Inicializando consumidor SQS...');
        this.consumer.start();
    }

    async onModuleDestroy() {
        this.logger.log('Parando consumidor SQS...');
        this.consumer.stop();
    }


    private async processMessage(message: Message) {
        try {
            if (!message.Body) {
                throw new Error('Mensagem sem corpo recebida da fila SQS');
            }

            const ticketData = JSON.parse(message.Body);
            this.logger.log(`Processando ticket ID: ${ticketData.id}`);
            this.logger.debug(`Dados do Ticket: ${JSON.stringify(ticketData)}`);

            this.logger.log(`Ticket ${ticketData.id} processado com sucesso.`);
        } catch (error) {
            this.logger.error(`Erro ao processar mensagem: ${error.message}`, error.stack);
        }
    }

    private setupEventHandlers() {
        this.consumer.on('error', (error: Error) => {
            this.logger.error(`Erro no consumidor SQS: ${error.message}`, error.stack);
        });

        this.consumer.on('processing_error', (error: Error) => {
            this.logger.error(`Erro ao processar mensagem SQS: ${error.message}`, error.stack);
        });

        this.consumer.on('message_received', (message: Message) => {
            this.logger.log(`Mensagem recebida: ${message.Body}`);
        });

        this.consumer.on('message_processed', (message: Message) => {
            this.logger.log(`Mensagem processada com sucesso: ${message.MessageId}`);
        });

        this.consumer.on('timeout_error', (error: Error) => {
            this.logger.error(`Timeout ao processar mensagem: ${error.message}`, error.stack);
        });
    }
}
