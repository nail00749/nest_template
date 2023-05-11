import { UserEntity } from '../../routes/user/entities/user.entity';
import { FastifyRequest } from 'fastify';

export interface RequestWithUser extends FastifyRequest {
    user: UserEntity;
}
