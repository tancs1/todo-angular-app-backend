import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtGuard } from './auth/guard/jwt.guard';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new JwtGuard())
  app.enableCors()
  const config = new DocumentBuilder()
  .setTitle('TodoApp')
  .setDescription('Todo NestApp Rest Api Docs')
  .setVersion('1.0')
  .addBearerAuth({
    type:"http",
    scheme:"bearer",
    bearerFormat:"JWT",
    name:"JWT",
    description:"Enter JWT Token",
    in:"header"
  },"JWT-auth")
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
