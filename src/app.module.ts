import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';

import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { ConfigModule } from '@nestjs/config';
import { CsvController } from './csv/csv.controller';
import { CsvModule } from './csv/csv.module';

console.log({ sd: process.env.DB_HOST });

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    ProductsModule,
    CsvModule,
  SequelizeModule.forRoot({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'task1',
    models: [Product],
    autoLoadModels: true,
    synchronize: true

  }),
    CsvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
