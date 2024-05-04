import { FastifyReply } from "fastify"

export const STANDARD = {
    CREATED: 201,
    SUCCESS: 200,
    NOCONTENT: 204,
  }
  
  export const ERROR404 = {
    statusCode: 404,
    message: 'NOT_FOUND',
  }
  
  export const ERROR403 = {
    statusCode: 403,
    message: 'FORBIDDEN_ACCESS',
  }
  
  export const ERROR401 = {
    statusCode: 401,
    message: 'UNAUTHORIZED',
  }
  
  export const ERROR500 = {
    statusCode: 500,
    message: 'TRY_AGAIN',
  }
  
  export const ERROR409 = {
    statusCode: 409,
    message: 'DUPLICATE_FOUND',
  }
  
  export const ERROR400 = {
    statusCode: 400,
    message: 'BAD_REQUEST',
  }

export const ERRORS = {
  postNotFound: new Error('Post not found.'),
}

export function handleServerError(reply: FastifyReply, error?: any) {
  return reply.status(ERROR500.statusCode).send(error || ERROR500);
}