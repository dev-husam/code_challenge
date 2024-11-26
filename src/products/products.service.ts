import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {


  /**
   *
   */
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {

  }


  async create(createProductDto: CreateProductDto) {
    console.log({ createProductDto });

    const newProduct = await this.productModel.create({ name: 'dadsd', descriptions: 'fr', qty: 2, active: true })

    return newProduct
  }

  async findAll() {
    const productList = await this.productModel.findAll()
    return productList

  }


  async findOneOrExption(id: number) {
    const existProduct = await this.productModel.findOne({ where: { id } })
    if (!existProduct) throw new HttpException("invaild inputs", HttpStatus.BAD_REQUEST)

  }
  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOneOrExption(id)
    const [numberOfAffectedRows] = await this.productModel.update(updateProductDto, { where: { id } })
    if (numberOfAffectedRows === 0) {
      throw new HttpException('Record not found or no changes were made', HttpStatus.BAD_REQUEST);
    }
    const updatedRecord = await this.productModel.findByPk(id);
    return updatedRecord;
  }

  async remove(id: number) {
    await this.findOneOrExption(id)

    const deletedCount = await this.productModel.destroy({ where: { id } });

    if (!deletedCount) {
      throw new Error(`Failed to delete product with ID ${id}`);
    }

    return { message: `Product with ID ${id} was successfully deleted.` };


  }
}
