import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  async retrieveData(bearer: string): Promise<string | null> {
    const value = await this.cacheManager.get<{ access_token?: string }>(
      bearer,
    );
    return value?.access_token || null;
  }

  async get<T>(id: string): Promise<T | null> {
    const data = await this.cacheManager.get<string>(id);
    return data ? JSON.parse(data) : null;
  }


  async storeData(id: string, data: Object, options): Promise<string> {
    return await this.cacheManager.set(id, JSON.stringify(data), options);
  }
}
