import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { LoggerService } from '../../app/logger/logger.service';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
    logger: LoggerService;

    constructor(logger: LoggerService) {
        this.logger = logger;
    }

    catch(exception: HttpException, host: ArgumentsHost): any {
        const context = host.switchToHttp();
        const response: FastifyReply = context.getResponse();
        const exceptionResponse = exception.getResponse() as FastifyReply & {
            message: string | string[];
        };
        const status = exception.getStatus();
        let message;
        if (Array.isArray(exceptionResponse.message)) {
            message = exceptionResponse.message.join(' \n');
        } else {
            message = exceptionResponse.message;
        }

        if (status >= 400 && status !== 401 && status !== 403) {
            this.logger.error(message);
        }

        response.status(exceptionResponse.statusCode);
        response.send({
            message,
            status: exceptionResponse.statusCode
        });
    }
}
