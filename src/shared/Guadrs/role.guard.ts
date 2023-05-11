import {
    CanActivate,
    ExecutionContext,
    HttpException,
    Injectable
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../Decorators/role.decorator';
import { Role } from '../Enums/Roles';
import { RequestWithUser } from '../Models/request-with-user.inteface';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()]
        );

        if (!requiredRoles) {
            return true;
        }
        const user = context.switchToHttp().getRequest<RequestWithUser>().user;

        if (!user) {
            throw new HttpException('User not found', 404);
        }

        return requiredRoles.some((role) => user.role.includes(role));
    }
}
