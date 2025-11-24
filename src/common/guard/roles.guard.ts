
import { Roles } from '@common/decorator/role.decorator';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.getAllAndMerge(Roles, [context.getHandler(),context.getClass()]);
    const publicVal=this.reflector.get('PUBLIC',context.getHandler());
    if(publicVal){
      return true;
    }
    if (!roles.includes(request.user.role)) {
      throw new UnauthorizedException("you are Not allowed");
    }
    return true;
  }
}
