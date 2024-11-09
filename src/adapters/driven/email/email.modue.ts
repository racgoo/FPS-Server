import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { EnvModule } from '../../../shared/modules/env/env.module';
import { EnvService } from 'src/shared/modules/env/env.service';

@Module({
  imports: [
    EnvModule,
    MailerModule.forRootAsync({
      imports: [EnvModule],
      useFactory: (envService: EnvService): MailerOptions => ({
        transport: {
          host: envService.get('MAIL_HOST'),
          port: envService.get('MAIL_PORT'),
          secure: false,
          auth: {
            user: envService.get('MAIL_USER'),
            pass: envService.get('MAIL_PASS'),
          },
        },
        defaults: {
          from: envService.get('MAIL_FROM'),
        },
        template: {
          dir: __dirname + '/templates',
          options: {
            strict: true,
          },
        },
      }),
      inject: [EnvService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
