import { Module } from '@nestjs/common';
import { QuestionsModule } from './questions/questions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [QuestionsModule, AuthModule],
})
export class AppModule {}