import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from 'src/member/entities/member.entity';
import { MemberModule } from 'src/member/member.module';
import { MemberService } from 'src/member/member.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

@Module({
  imports: [
    MemberModule,
    MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1D' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, MemberService],
})
export class AuthModule {}
