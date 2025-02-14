export interface ISqsService {
  sendMessage(queueUrl: string, message: any): Promise<void>;
}