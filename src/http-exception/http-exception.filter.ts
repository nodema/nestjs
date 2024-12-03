import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求和响应上下文
    const response = ctx.getResponse(); // 获取响应对象
    const request = ctx.getRequest(); // 获取请求对象

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    console.log('Exception Response:', exceptionResponse); // 添加调试日志

    let message: string;
    let data: any = {};

    if (typeof exceptionResponse === 'object') {
      // 提取详细的错误信息
      message = exceptionResponse['message'] || `${status >= 500 ? 'Service Error' : 'Client Error'}`;
      data = exceptionResponse['data'] || {};
    } else {
      message = exceptionResponse || `${status >= 500 ? 'Service Error' : 'Client Error'}`;
    }

    const errorResponse = {
      data: data,
      message: message,
      code: status,
    };

    // 设置返回的状态码， 请求头，发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
