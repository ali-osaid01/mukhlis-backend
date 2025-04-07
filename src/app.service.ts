import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): string {
    const message = "Health Check "
    return message;
  }
}
