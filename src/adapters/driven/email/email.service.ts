import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { generateOtpTemplateString } from 'src/public/templetes/otp/generate-otp-templete';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendOtpMail({ otp, email }: { otp: string; email: string }) {
    return this.mailerService.sendMail({
      to: email,
      //   from: 'noreplay@gmail.com',
      subject: '[Racgoo Online] 이메일 인증',
      text: otp,
      html: generateOtpTemplateString({
        otp,
      }),
    });
  }
}
