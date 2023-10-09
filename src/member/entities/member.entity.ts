import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type memberDocument = HydratedDocument<Member>;

@Schema()
export class Member {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}
export const MemberSchema = SchemaFactory.createForClass(Member);
