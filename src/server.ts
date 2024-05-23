import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import fastifyView from "@fastify/view";
import ejs from "ejs";
import Fastify from "fastify";
import path from "path";
import mailRouter from "./router/mail.router";
import postRouter from "./router/post.router";
import {DEPLOY_URL, PORT} from "./utils/config";
import {BASE_URL} from "./utils/constants";
import {ERROR403} from "./utils/error";

const fastify = Fastify({
	logger: true,
});
fastify.register(cors);
fastify.register(fastifyStatic, {
	root: path.join(__dirname, "../public"),
});
fastify.register(fastifyView, {
	engine: {
		ejs,
	},
	root: path.join(__dirname, "../views"),
});

// Queue
// startQueueWorker().catch((error)=>{
//   console.error('Queue Error',error)
// });

// Routes
fastify.register(postRouter, {prefix: "/api/post"});
fastify.register(mailRouter, {prefix: "/api/mail"});

// Views
fastify.get("/", async (request, reply) => {
	return reply.view("index.ejs", {
		message: `Hello, Quickshare fam! (${
			request.headers["x-forwarded-for"] || request.socket.remoteAddress
		})`,
		BASE_URL,
	});
});

fastify.post("/api/deploy/:secret", async (request, reply) => {
	let secret = request.params["secret"];
	const ref = request.body["ref"];
	if (!["refs/heads/master"].includes(ref)) {
		return reply.status(ERROR403.statusCode).send(ERROR403.message);
	}
	const rs = await fetch(DEPLOY_URL, {
		headers: {
			Authorization: `Bearer ${atob(secret)}`,
		},
	});
	const data = await rs.json();
	return reply.status(rs.status).send(data);
});

fastify.listen(
	{
		host: "0.0.0.0",
		port: (PORT as any) || 3000,
	},
	(err) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		if (!PORT) console.warn("PORT not found.");
		console.log(`Server running at http://localhost:${PORT || 3000}/`);
		// pb.health.check().then(data => console.log('Pocketbase', data)).catch(error => console.error('Pocketbase', error));
	}
);
