import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
//拦截器，对返回的数据进行处理，返回{data:data,code:0,msg:'请求成功'}统一的格式
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => {
      return {
        data: data,
        code: 0,
        message: '请求成功'

      }
    }))
  }
}
