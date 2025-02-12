import { Module } from '@nestjs/common';
import { SqsService } from './sqs.service';
import { SQSClient } from '@aws-sdk/client-sqs';

@Module({
    providers: [
        SqsService,
        {
            provide: 'SQS_CLIENT',
            useValue: new SQSClient({ region: process.env.AWS_REGION }),
        },
    ],
    exports: [SqsService],
})
export class SqsModule { }