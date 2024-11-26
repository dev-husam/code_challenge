import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';

import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';

@Module({
  imports: [ProductsModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'db',
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
