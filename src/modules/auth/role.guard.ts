import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    // private readonly jwtService: JwtService,
  ) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 获取当前请求的元数据即控制器上的role参数
    const roles = this.reflector.get('roles', context.getHandler())

    if (!roles) return true;
    //获取user
    const request = context.switchToHttp().getRequest()
    const user = request.user
    if (!user) return false
    const hasRoles = roles.some(item => item === user.role)
    return hasRoles;
  }
}
