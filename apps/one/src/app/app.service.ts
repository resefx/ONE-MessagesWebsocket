import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import type { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  async getData(): Promise<{ message: string; }> {
    const menssage = await this.cacheManager.get('message');
    Logger.log(`Cache message: ${menssage}`, AppService.name);
    if (!menssage) {
      await this.cacheManager.set('message', 'Hello World!', 10000);
      return { message: 'Hello World!' };
    }
    return { message: menssage as string };
  }
}
