import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/database/entities';
import { services } from 'src/database/services';
import { controllers } from 'src/database/controllers';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'accounting',
      password: 'accounting',
      database: 'accounting',
      entities,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([...entities]),
  ],
  controllers: [AppController, ...controllers],
  providers: [AppService, ...services],
})
export class AppModule {
  constructor() {
    console.log('App Module Loaded', __dirname + '/../**/*.entity{.ts,.js');
  }
}
