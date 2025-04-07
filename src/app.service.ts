import { Injectable } from '@nestjs/common';
import { ResponseHelper } from './common/helper/response.helper';
import pkg from '../package.json'; 

@Injectable()
export class AppService {
  healthCheck(): ApiResponse<string> {
  const message = `Health Check: API is up and running.`
    return ResponseHelper.sendResponse<string>({
      data: message,
      statusCode: 200,
    });
  }
}
