import clsx from 'clsx';
import { pb } from './pocketbase';
import Fastify, { FastifyInstance, FastifyRequest } from 'fastify'
import { PORT } from './utils/config';
import cors from '@fastify/cors'
import path from 'path';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import ejs from 'ejs';
import postRouter from './router/post.router';
import { ERROR500, ERRORS } from './utils/error';

const fastify = Fastify({
  logger: true,
});
fastify.register(cors)
fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../public'),
});
fastify.register(fastifyView, {
  engine: {
    ejs
  },
  root: path.join(__dirname, '../views'),
});
fastify.setErrorHandler(function (error, request, reply) {
  // Log error
  this.log.error(error)
  // Send error response
  reply.status(ERROR500.statusCode).send(ERROR500.message)
})

// Routes
fastify.register(postRouter, { prefix: '/api/post' })

fastify.get('/', async (request, reply) => {
  return reply.view('index.ejs', { message: 'Hello, World!' });
});

fastify.get('/post/:id', async function (request, reply) {
    const params = request.params as {};
    const id = params['id'];
    const record = await pb.collection('post').getOne(id, {
        expand: 'thumbnail'
    });
    reply.send(record);
});

fastify.listen({
    host: '0.0.0.0',
    port: PORT as any || 3000,
},(err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    if (!PORT) console.warn('PORT not found.')
    console.log(`Server running at http://localhost:${PORT || 3000}/`);
    pb.health.check().then(data => console.log('Pocketbase', data)).catch(error => console.error('Pocketbase', error));
})