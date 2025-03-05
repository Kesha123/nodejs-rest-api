import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { NestModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CompanyModule, HealthModule, ConfigModule.forRoot()],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
