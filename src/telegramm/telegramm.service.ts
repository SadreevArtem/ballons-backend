import { Injectable } from '@nestjs/common';
import { Ctx, Help, InjectBot, On, Start, Update } from 'nestjs-telegraf';
import { TelegrafContext } from 'src/interfaces/context.interface';
// import { UsersService } from 'src/users/users.service';
import { Telegraf } from 'telegraf';

@Injectable()
@Update()
export class TelegrammService {
  constructor(
    @InjectBot() private bot: Telegraf<TelegrafContext>,
    // private readonly usersService: UsersService,
  ) {}
  @Start()
  async start(@Ctx() ctx: TelegrafContext) {
    await ctx.reply(
      'Здравствуй! Я бот, присылаю уведомления о поступлении новых заказов',
    );
  }

  @Help()
  async onHelp(): Promise<string> {
    return 'Возникли вопросы? Свяжитесь с разработчиком';
  }

  @On('text')
  async onMessage(@Ctx() ctx: TelegrafContext) {
    if (ctx.message.from.is_bot) {
      await ctx.reply('permission failed');
    }
    if (!/^[a-zA-Zа-яА-Я0-9\s-]+$/.test(ctx.text) || ctx.text.length > 35) {
      await ctx.reply(
        '⛔ Запрос должен быть в формате текста, без использования символов',
      );
      return;
    }
    try {
      await ctx.reply('Загружаю информацию.\n Пожалуйста подождите... 🔄');

      await ctx.replyWithHTML('Поступил новый заказ');
    } catch (error) {
      console.log(error);
    }
  }
}
