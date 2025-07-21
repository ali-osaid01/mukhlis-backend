import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  healthCheck(@Res() res: Response) {
    const response = this.appService.healthCheck();
    res.status(response.statusCode).json(response);
  }
}
