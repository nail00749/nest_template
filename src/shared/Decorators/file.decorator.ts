import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { FastifyRequest } from 'fastify'

export const File = createParamDecorator(
     (_data: unknown, ctx: ExecutionContext) => {
        const req: FastifyRequest = ctx.switchToHttp().getRequest()
        return  req.file()
    },
)