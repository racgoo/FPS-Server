import * as Joi from 'joi';

//ENV SCHEMA ( For EnvService )
export interface EnvSchema {
  NODE_ENV: string;

  WAS_PORT: number;
  WS_PORT: number;

  PASSWORD_HASH_SALT: number;
  JWT_SECRET: string;

  DATABASE_URL: string;

  REDIS_URL: string;
  REDIS_PASSWORD: string;

  MAIL_HOST: string;
  MAIL_PORT: number;
  MAIL_USER: string;
  MAIL_PASS: string;
  MAIL_FROM: string;

  CHANNEL_ID: number;
  CHANNEL_IP: string;
}

//ENV SCHEMA VALIDATION ( For NestJS ConfigModule )
export const JoiEnvSchema = Joi.object<EnvSchema>({
  NODE_ENV: Joi.string().valid('development', 'production').required(),

  WAS_PORT: Joi.number().required(),
  WS_PORT: Joi.number().required(),

  PASSWORD_HASH_SALT: Joi.number().required(),
  JWT_SECRET: Joi.string().required(),

  DATABASE_URL: Joi.string().required(),

  REDIS_URL: Joi.string().required(),
  REDIS_PASSWORD: Joi.string().required(),

  MAIL_HOST: Joi.string().required(),
  MAIL_PORT: Joi.number().required(),
  MAIL_USER: Joi.string().required(),
  MAIL_PASS: Joi.string().required(),
  MAIL_FROM: Joi.string().required(),

  CHANNEL_ID: Joi.number().required(),
  CHANNEL_IP: Joi.string().required(),
});
