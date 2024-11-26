import { Injectable, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly sequelize: Sequelize) { }

  async onModuleInit() {
    try {
      await this.sequelize.authenticate(); // Test the connection
      console.log('Connection to the database has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  getHello(): string {
    return 'Hello World!';
  }
}
