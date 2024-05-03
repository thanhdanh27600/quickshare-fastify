import clsx from 'clsx';
import { pb } from './pocketbase';
import Fastify, { FastifyInstance, FastifyRequest } from 'fastify'
import { PORT } from './utils/config';
import cors from '@fastify/cors'
import path from 'path';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import ejs from 'ejs';

const fastify = Fastify({
  logger: true,
});
fastify.register(cors)
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
});
fastify.register(fastifyView, {
  engine: {
    ejs
  },
  root: path.join(__dirname, 'views'),
});

fastify.get('/', async (request, reply) => {
  return reply.view('index.ejs', { message: 'Hello, World!' });
});

fastify.get('/post', async function (request: FastifyRequest, reply) {
    const query = request.query as {};
    const title = query['title'];
    const slug = query['slug'];
    const resultList = await pb.collection('post').getList(1, 10, {
        filter: clsx({
            [`title~"${title}"`]: !!title
        }, {
            [`&&slug~"${slug}"`]: !!slug
        }),
        expand: 'thumbnail',
        fields: 'id,slug,title,expand.thumbnail.id,expand.thumbnail.file',
    });
    reply.send(resultList);
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