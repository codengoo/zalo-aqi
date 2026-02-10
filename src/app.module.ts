import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AqiModule } from './modules/aqi/aqi.module';
import { DebugModule } from './modules/debug/debug.module';
import { WebhookModule } from './modules/webhook/webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DebugModule,
    AqiModule,
    WebhookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
