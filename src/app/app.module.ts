import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/database/entities';
import { services } from 'src/database/services';
import { controllers } from 'src/database/controllers';
import { AuthGuard } from './guards/auth.guard';
import { ProductService } from './modules/product/product.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const DATABASE_HOST = process.env.DATABASE_HOST || 'accounting-database';
const DATABASE_PORT: number =
  Number.parseInt(process.env.DATABASE_PORT) || 5432;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'accounting';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'accounting';
const DATABASE_NAME = process.env.DATABASE_NAME || 'accounting';
const DATABASE_TYPE: any = process.env.DATABASE_TYPE || 'postgres';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: DATABASE_TYPE,
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      entities,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([...entities]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../'),
      renderPath: '/uploads',
    }),
  ],
  controllers: [AppController, ...controllers],
  providers: [AppService, ...services, AuthGuard, ProductService],
})
export class AppModule {
  constructor() {
    console.log('App Module Loaded', __dirname + '/../**/*.entity{.ts,.js');
  }
}
