import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { CorsModule } from './cors.module';
import { AuthModule } from './auth/auth.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/NestDb'),
    PostModule,
    CorsModule,
    AuthModule,
    MemberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
