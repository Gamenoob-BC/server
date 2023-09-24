import { Room, Client } from "@colyseus/core";
import { RoomState } from "./schema/RoomState";
import { Collection, Db } from "mongodb";
interface UserData{
  name: string,
  cash: number,
  id: string,
}

export class GameRoom extends Room<RoomState> {
  private allPlayers:Collection<UserData>;
  maxClients = 150;
  constructor(private db:Db){
    super();
  }

  onCreate (options: any) {
    this.setState(new RoomState());

    this.onMessage("type", (client, message) => {
      //
      // handle "type" message
      //
    });
  }

  async onJoin (client: Client, options: any) {
    const {name, id, cash} = options;
    try{
      const playerData = await this.allPlayers.findOne({name, id, cash});
      if (!playerData){
        const newPlayer:UserData = {
          name: name,
          id: generateRandomId(),
          cash: 0,
        }
        await this.allPlayers.insertOne(newPlayer);

      }
    }catch(e){
       client.send('error', `${e} occured!`)
    }
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
function generateRandomId(): string {
  // Generate an 8-digit random ID
  const randomId = Math.floor(10000000 + Math.random() * 90000000).toString();
  return randomId;
}