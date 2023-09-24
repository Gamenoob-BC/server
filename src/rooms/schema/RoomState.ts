import { Schema, Context, type } from "@colyseus/schema";

export class RoomState extends Schema {
  @type('int32') playersNum: number;
  @type('int8') gameNum:number;
  @type('int32') winners:number;
}
