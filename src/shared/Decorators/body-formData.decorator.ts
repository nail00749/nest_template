import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { FastifyRequest } from 'fastify'

export const BodyFormData = createParamDecorator(
    async (data: unknown, ctx: ExecutionContext) => {
        const request: FastifyRequest = ctx.switchToHttp().getRequest()
        return request.body
    },
)