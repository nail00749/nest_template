import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { BASE_LIMIT } from '../Contants';

export const Paginated = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const http = ctx.switchToHttp();
        const { page, limit } = http.getRequest().query;
        const take = limit || BASE_LIMIT;
        const skip = Math.max(0, page - 1) * take || 0;

        return { take, skip };
    }
);
