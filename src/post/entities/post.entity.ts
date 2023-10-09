import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type postDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop()
  id: number;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  language: string;
}
export const PostSchema = SchemaFactory.createForClass(Post);
