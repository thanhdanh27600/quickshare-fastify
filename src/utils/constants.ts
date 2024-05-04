export const isProduction = process.env.NODE_ENV === 'production';
export const BASE_URL = isProduction ? 'https://fastify.vietnamese.cloud/' : 'https://code.vietnamese.cloud/proxy/3333/'
