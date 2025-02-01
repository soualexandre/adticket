import { Provider } from '@nestjs/common';
import { redisConnect } from './redisConnect';

export const REDIS_CLIENT = 'REDIS_CLIENT';

export const redisProvider: Provider = {
    provide: REDIS_CLIENT,
    useFactory: () => redisConnect(),
};