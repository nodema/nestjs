//自定义异常过滤器
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, NotFoundException } from '@nestjs/common';

@Catch(HttpException, NotFoundException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();//获取请求和响应上下文
    const response = ctx.getResponse();//获取响应对象
    const request = ctx.getRequest();//获取请求对象
    const status = exception.getStatus();//获取异常状态码
    // response.status(status).json({//设置响应状态码和内容
    //   message: "自定义异常处理",
    //   path: request.url,//请求路径
    //   code: status//状态码
    // })
    // 设置错误信息
    const message = exception.message
      ? exception.message
      : `${status >= 500 ? 'Service Error' : 'Client Error'}`;
    const errorResponse = {
      data: {},
      message: message,
      code: -1,
    };

    // 设置返回的状态码， 请求头，发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);


  }
}
