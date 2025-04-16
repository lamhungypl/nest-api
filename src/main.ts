import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const port = process.env.PORT || 5500


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
  });
}
bootstrap();
