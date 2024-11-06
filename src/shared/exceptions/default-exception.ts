export const DEFAULT_EXCEPTION_STATUS = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
};

export abstract class CustomException extends Error {
  abstract status: number;
  abstract code: string;
  abstract message: string;
}
