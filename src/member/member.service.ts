import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import * as bycrypt from 'bcrypt';

@Injectable()
export class MemberService {
  constructor(@InjectModel(Member.name) private memberModel: Model<Member>) {}
  async create(createMemberDto: CreateMemberDto) {
    const createdMember = await this.memberModel.create({
      ...createMemberDto,
    });
    createdMember.password = await bycrypt.hash(createdMember.password, 10);
    await createdMember.save();
    return {
      message: 'Member created successfully',
      data: createdMember,
    };
  }

  async findAll() {
    console.log('all members');
    const members = await this.memberModel.find().lean().exec();

    return {
      message: 'All Members',
      data: members.map((item, index) => ({
        ...item,
        id: index + 1,
      })),
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  async findByEmail(email: string) {
    // return `This action returns a #${email} member`;
    return await this.memberModel.findOne({ email });
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
