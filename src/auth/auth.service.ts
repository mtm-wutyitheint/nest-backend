import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MemberService } from 'src/member/member.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private memberSvc: MemberService,
    private jwtSvc: JwtService,
  ) {}

  async login(email: string, password: string) {
    const member: any = await this.memberSvc.findByEmail(email);
    const isPasswordCorrect = await bcrypt.compare(password, member.password);

    if (member && isPasswordCorrect) {
      const payload = {
        email,
        sub: member._id,
      };
      return {
        message: 'login successfully',
        access_token: this.jwtSvc.sign(payload),
        data: payload,
      };
    } else {
      throw new UnauthorizedException('Invalid member!');
    }
  }
}
