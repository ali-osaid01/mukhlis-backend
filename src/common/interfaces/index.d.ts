interface ApiResponse<T>  {
  statusCode: number;
    status: boolean;
    msg: string;
    data?: T;
    total?: number;
    accessToken?: string;
    refreshToken?: string;
  };


    
  type JwtToken = {
    accessToken: string;
    refreshToken: string;
  };