  class ResponseApiHelper {
    private static getDefaultMessage(statusCode: number): string {
      const messages: Record<number, string> = {
        200: 'Success',
        201: 'Created successfully',
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
        409: 'Conflict',
        422: 'Validation Error',
        500: 'Internal Server Error',
      };
      return messages[statusCode] || 'Unknown status';
    }
  
    sendResponse<T>(options: {
      statusCode?: number;
      msg?: string;
      data?: T;
      total?: number;
      token?: JwtToken;
      success?: boolean;
    }): ApiResponse<T> {
      const {
        statusCode = 200,
        msg,
        data = {} as T,
        total,
        token,
        success,
      } = options;
  
      const response: ApiResponse<T> = {
        code: statusCode,
        status: success !== undefined ? success : statusCode < 400,
        msg: msg || ResponseApiHelper.getDefaultMessage(statusCode),
        data,
      };
  
      if (total !== undefined) {
        response.total = total;
      }
  
      if (token) {
        response.accessToken = token.accessToken;
        response.refreshToken = token.refreshToken;
      }
  
      return response;
    }
  }
  
  export const ResponseHelper = new ResponseApiHelper();
  