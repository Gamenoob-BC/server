import { Schema, Context, type } from "@colyseus/schema";

export class RoomState extends Schema {
  @type('number') playersNum: number;
  @type('number') gameNum:number;
  @type('number') winners:number;
}
