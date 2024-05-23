import { FastifyInstance } from 'fastify'
import { mailController } from '../controllers/mail.controller'
import { mailNoticeSchema  } from '../schema/mail.schema'

async function mailRouter(fastify: FastifyInstance) {
  // fastify.decorateRequest('authUser', '')
  fastify.route({
    method: 'get',
    url: '/test',
    // schema: getManyPostSchema,
    handler: mailController.sendTest,
  })
  fastify.route({
    method: 'post',
    url: '/notice',
    schema: mailNoticeSchema,
    handler: mailController.sendTest,
  })
}

export default mailRouter