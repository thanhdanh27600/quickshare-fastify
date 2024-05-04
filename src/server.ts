import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import ejs from 'ejs';
import Fastify from 'fastify';
import path from 'path';
import { pb } from './pocketbase';
import postRouter from './router/post.router';
import { DEPLOY_URL, PORT } from './utils/config';

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
        'Authorization': `Bearer ${atob(secret)}`
      }
    })
  const data = await rs.json();
  return reply.status(rs.status).send(data)
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