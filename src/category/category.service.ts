import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/database/prisma.service';
import { ResponseHelper } from 'src/common/helper/response.helper';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const isCategoryExist = await this.prisma.category.findFirst({
      where: {
        name: createCategoryDto.name,
      },
    });
    if (isCategoryExist) throw new BadRequestException('Category already exists');
    
    const category = await this.prisma.category.create({
      data: { name: createCategoryDto.name },
    });
    
    return ResponseHelper.sendResponse({
      msg: 'Category created successfully',
      statusCode: 200,
      data: category,
    });
  }

  async findAll() {
    const categories = await this.prisma.category.findMany();
    return ResponseHelper.sendResponse({
      msg: 'Categories fetched successfully',
      statusCode: 200,
      data: categories, 
    });
  }
}
