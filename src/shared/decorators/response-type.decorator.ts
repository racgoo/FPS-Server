import { SetMetadata } from '@nestjs/common';

export const RESPONSE_TYPE_KEY = 'responseType';
export const ResponseType = (type: any) => SetMetadata(RESPONSE_TYPE_KEY, type);
