import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';

import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { ConfigModule } from '@nestjs/config';

console.log({ sd: process.env.DB_HOST });

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    ProductsModule,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
