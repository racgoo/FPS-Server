import * as fs from 'fs';
export const generateOtpTemplateString = ({ otp }: { otp: string }) => {
  const template = fs.readFileSync(`${__dirname}/otp.templete.html`, 'utf8');
  return template.replaceAll('!$!{otp}', otp);
};
