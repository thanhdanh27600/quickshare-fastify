import clsx from 'clsx';
import { pb } from './pocketbase';
import Fastify, { FastifyInstance, FastifyRequest } from 'fastify'
import { DEPLOY_AUTH, DEPLOY_URL, PORT } from './utils/config';
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

// Routes
fastify.register(postRouter, { prefix: '/api/post' })

// Views
fastify.get('/', async (request, reply) => {
  return reply.view('index.ejs', { message: 'Hello, World!' });
});

fastify.post('/api/deploy/:secret', async (request, reply) => {
  let secret = request.params['secret'];
  const rs = await fetch(DEPLOY_URL,
    {
      headers: {
        'Authorization': `Bearer ${secret}`
      }
    })
  const data = await rs.json();
  return reply.send(data)
})

fastify.listen({
  host: '0.0.0.0',
  port: PORT as any || 3000,
}, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  if (!PORT) console.warn('PORT not found.')
  console.log(`Server running at http://localhost:${PORT || 3000}/`);
  pb.health.check().then(data => console.log('Pocketbase', data)).catch(error => console.error('Pocketbase', error));
})