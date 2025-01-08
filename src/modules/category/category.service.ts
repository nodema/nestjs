import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>
  ) { }
  //添加分类
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save(createCategoryDto);
  }
  //查询所有分类
  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }
  //更新分类
  update(updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(updateCategoryDto.id, updateCategoryDto);
  }

  remove(id: string) {
    return this.categoryRepository.delete({ id });
  }
}
