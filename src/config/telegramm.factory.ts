import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelegrafModuleOptions, TelegrafOptionsFactory } from 'nestjs-telegraf';

@Injectable()
export class TelegrafConfigService implements TelegrafOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTelegrafOptions(): TelegrafModuleOptions {
    return {
      token: this.configService.get<string>('TELEGRAM_BOT_TOKEN'),
    };
  }
}
