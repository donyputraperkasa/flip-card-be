import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Izinkan frontend akses API
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PATCH,DELETE',
  });

  // Path folder uploads
  const uploadDir = join(__dirname, '..', 'uploads');

  // Serve file statis dari folder uploads
  app.useStaticAssets(uploadDir, {
    prefix: '/uploads/', // akses via http://localhost:3000/uploads/filename.jpg
  });

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
  console.log(`🚀 Server running at : ${await app.getUrl()}`);
}

bootstrap();