import { createClient } from 'redis';
import { Logger } from '@nestjs/common';

const log = new Logger('RedisService');

const { REDIS_PASSWORD, REDIS_HOST } = process.env;

const redisConnect = () => {
    const client = createClient({ url: `redis://${REDIS_HOST}`, password: REDIS_PASSWORD === 'undefined' ? undefined : REDIS_PASSWORD });
    client.on('connect', () => log.debug('Redis connection established'));
    client.on('error', err => log.error('Redis Client Error', err));
    client.connect();
    return client;
};

export { redisConnect };