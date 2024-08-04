import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import {v4 as uuid} from 'uuid';
import { Brand } from './entities/brand.entity';
@Injectable()
export class BrandsService {

  private brands: Brand[] = [
    {
      id: uuid(),
      name: 'Toyota',
      createAt: Date.now(),
    },
    {
      id: '2',
      name: 'Honda',
      createAt: Date.now(),
    },
  ]


  create(createBrandDto: CreateBrandDto) {

    const { name } = createBrandDto;

    const brand: Brand = {
      id: uuid(),
      name: name.toLowerCase(),
      createAt: Date.now()
    }

    this.brands.push(brand);

    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find(brand => brand.id === id);
    if(!brand){
      throw new Error(`Brand with id ${id} not found`);

    }
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {

    let brandBD = this.findOne(id);
    this.brands = this.brands.map(brand => {
      if(brand.id === id) {
        brandBD.updateAt = Date.now();
        brandBD = { ...brandBD, ...updateBrandDto };
        return brandBD;
      }
      return brand;
    });
    return brandBD;
  }

  remove(id: string) {
    this.brands = this.brands.filter(brand => brand.id !== id);
  }

  fillBrandWithSeedData(brand: Brand[]) {
    this.brands = brand;
}
}
