import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Discord Api Clone')
    .setDescription(
      'Discord Api Clone usando: Nestjs, Swagger, GraphQL, Prisma e DDD',
    )
    .setVersion('1.0')
    .build();

  app.enableCors({
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Content-Type',
      'X-Requested-With',
      'apollo-require-preflight',
    ],
  });

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.APP_PORT).then(() => {
    console.log(`Server running on port: http://localhost:${process.env.APP_PORT}/docs`);
    console.log(`Server running on port: http://localhost:${process.env.APP_PORT}/graphql`);
  });
}
bootstrap();
