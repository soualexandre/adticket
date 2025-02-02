import { Logger } from '@nestjs/common';
import { createClient } from 'redis';

const { REDIS_PASSWORD, REDIS_HOST } = process.env;

const redisConnect = () => {
    const client = createClient({
        url: `redis://${REDIS_HOST}`,
        password: REDIS_PASSWORD === 'undefined' ? undefined : REDIS_PASSWORD,
    });

    client.on('connect', () => Logger.debug('Redis connection established'));
    client.on('error', (err) => Logger.error('Redis Client Error', err));
    client.connect();

    return client;
};

export { redisConnect };