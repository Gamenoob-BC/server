import {Schema, type} from '@colyseus/schema';
class Player extends Schema {
   @type('string') name : string;
   @type ('string') id : string;
   @type('int64') cash : number;
   @type('string') whereSkin : string;

}