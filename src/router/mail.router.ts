import { FastifyInstance } from 'fastify'
import { mailController } from '../controllers/mail.controller'
import { getManyPostSchema } from '../schema/post.schema'

async function mailRouter(fastify: FastifyInstance) {
  // fastify.decorateRequest('authUser', '')
  fastify.route({
    method: 'get',
    url: '/test',
    schema: getManyPostSchema,
    handler: mailController.sendTest,
  })
}

export default mailRouter