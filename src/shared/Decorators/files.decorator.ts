import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { FastifyRequest } from 'fastify'

export const Files = createParamDecorator(
    async (key: string, ctx: ExecutionContext) => {
        const request: FastifyRequest = ctx.switchToHttp().getRequest()
        return request['uploadFiles']
    },
)