import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}
  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();

    /** check token */
    const token = request.headers.authorization;

    if (!token?.startsWith('Bearer')) throw new UnauthorizedException();

    const newToken = token?.split(' ')[1];
    const userToken = this.authService.generateToken(newToken);
    /** tìm trong database xem có tồn tại hay không */

    if (!userToken) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    request['user'] = userToken;

    /** verify token */
    return true;
  }
}
