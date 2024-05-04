import { FastifyInstance } from 'fastify'
import { postController } from '../controllers/post.controller'
import { getManyPostSchema,getOnePostSchema } from '../schema/post.schema'

async function postRouter(fastify: FastifyInstance) {
  // fastify.decorateRequest('authUser', '')
  fastify.route({
    method: 'get',
    url: '/',
    schema: getManyPostSchema,
    handler: postController.getManyPost,
  })
  fastify.route({
    method: 'get',
    url: '/:slug',
    schema: getOnePostSchema,
    handler: postController.getOnePost,
  })
}

export default postRouter