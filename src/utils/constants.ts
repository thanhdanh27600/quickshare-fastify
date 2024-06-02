export const isProduction = process.env.NODE_ENV === "production";
export const proxyURL = process.env.PROXY_URL;
export const BASE_URL = isProduction
	? "https://fastify.vietnamese.cloud/"
	: proxyURL || "http://localhost:3333/";
export const MAIL_HEADER = {
	client: "x-qsh-client",
	key: "x-qsh-key",
};
