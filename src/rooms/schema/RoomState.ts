import { Schema, Context, type } from "@colyseus/schema";

export class RoomState extends Schema {
  @type('int16') id: number;
  

  @type("string") SkinPath: string;

}
