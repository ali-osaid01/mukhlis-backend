import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @Res() res: Response) {
    return this.categoryService.create(createCategoryDto);
  }
 
  @Get()
  async findAll(@Res() res: Response) {
    const response = await this.categoryService.findAll();
    return res.status(response.statusCode).json(response);
  }
}
