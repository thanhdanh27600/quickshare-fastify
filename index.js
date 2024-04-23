import clsx from 'clsx';
import { pb } from './pocketbase/index.js';
import Fastify from 'fastify'

const fastify = Fastify({
    logger: true
});


fastify.get('/', (request, reply) => {
    reply.send('Hello, world!');
});

fastify.get('/post', async function (request, reply) {
    // fetch a paginated records list
    const title = request.query['title'];
    const slug = request.query['slug'];
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
    const id = request.params['id'];
    const record = await pb.collection('post').getOne(id, {
        expand: 'thumbnail'
    });
    reply.send(record);
});

fastify.listen(3000, 'localhost', (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('Server running at http://localhost:3000/');
});