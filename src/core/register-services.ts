import fastifyCompress from '@fastify/compress';
import fastifyCookie from '@fastify/cookie';
import fastifyHelmet from '@fastify/helmet';
import fastifyMultipart from '@fastify/multipart';
import { ValidationPipe } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { join } from 'path';
import * as process from 'process';
import { LoggerService } from './logger/logger.service';

export const registerServices = async (app: NestFastifyApplication) => {
    registerLogger(app);
    registerRequestHandler(app);
    await registerConfig(app);

    return true;
};

const registerLogger = (app: NestFastifyApplication) => {
    app.useLogger(app.get(LoggerService));
};

const registerRequestHandler = (app: NestFastifyApplication) => {
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            forbidUnknownValues: false
        })
    );
};

const registerConfig = async (app: NestFastifyApplication) => {
    await app.register(fastifyMultipart, { throwFileSizeLimit: false });
    await app.register(fastifyHelmet, {
        contentSecurityPolicy: false,
        crossOriginResourcePolicy: { policy: 'cross-origin' }
    });
    await app.register(fastifyCompress);

    app.enableCors({
        credentials: true,
        origin: true
    });
    await app.register(fastifyCookie, {
        secret: process.env.COOKIE_SECRET
    });

    app.setGlobalPrefix('api');
    app.useStaticAssets({
        prefix: '/resource/',
        root: join(__dirname, '..', '..', 'dist', 'static'),
        decorateReply: false
    });
};
