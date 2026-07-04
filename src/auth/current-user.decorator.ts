import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthPayload } from 'src/auth/interfaces/auth-payload';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);