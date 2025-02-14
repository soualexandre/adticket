import { Injectable, Inject } from '@nestjs/common';
import { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class SqsService {
    private readonly queueUrl: string;

    constructor(
        @Inject('SQS_CLIENT') private readonly sqsClient: SQSClient,
        private readonly configService: ConfigService,
    ) {
        this.queueUrl = this.configService.get<string>('SQS_QUEUE_URL')!;
    }

    async sendMessage(messageBody: string | object): Promise<string | undefined> {
        const body = typeof messageBody === 'string' ? messageBody : JSON.stringify(messageBody);
        const command = new SendMessageCommand({
            QueueUrl: this.queueUrl,
            MessageBody: body,
        });
        const result = await this.sqsClient.send(command);
        return result.MessageId;
    }

    async receiveMessage(maxNumberOfMessages: number = 1, waitTimeSeconds: number = 10): Promise<any[]> {
        const command = new ReceiveMessageCommand({
            QueueUrl: this.queueUrl,
            MaxNumberOfMessages: maxNumberOfMessages,
            WaitTimeSeconds: waitTimeSeconds,
        });
        const result = await this.sqsClient.send(command);
        return result.Messages || [];
    }

    async deleteMessage(receiptHandle: string): Promise<void> {
        const command = new DeleteMessageCommand({
            QueueUrl: this.queueUrl,
            ReceiptHandle: receiptHandle,
        });
        await this.sqsClient.send(command);
    }
}
