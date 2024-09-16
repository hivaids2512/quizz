import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'auth',
        brokers: [process.env.KAFKA_BROKER],
      },
      producerOnlyMode: true,
      consumer: {
        groupId: 'auth-consumer',
      },
    },
  });
  
  await app.startAllMicroservices();
  
  await app.listen(3000);
}
bootstrap();
