import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS so your Next.js frontend (on :3000) can talk to :4000
  app.enableCors({ origin: true, credentials: true });

  // Listen on port 4000 (or whatever you chose)
  await app.listen(4000);
  console.log(`🚀 API running on http://localhost:4000`);
}

bootstrap();
