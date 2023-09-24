import { Server } from 'colyseus';
import express from 'express';
import { MongoClient, Db } from 'mongodb';
import { GameRoom } from './rooms/GameRoom'; // Replace with the correct path to your GameRoom class

const app = express();
const gameServer = new Server({
  server: app,
});




async function connectToMongo() {
  try {
    await mongoClient.connect();
    console.log('Connected to MongoDB');

    // Access the MongoDB database
    const db: Db = mongoClient.db('yourDatabaseName');

    // Create an instance of your GameRoom, passing the MongoDB database connection
    const gameRoom = new GameRoom(db);

    // Register your GameRoom with Colyseus
    gameServer.define('game', gameRoom);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongo().then(() => {
  gameServer.listen(3000);
});
