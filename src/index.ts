import { Server } from 'colyseus';
import express from 'express';
import http from 'http';
import { MongoClient, Db } from 'mongodb';
import { GameRoom } from './rooms/GameRoom'; // Replace with the correct path to your GameRoom class

const app = express();
const httpServer = http.createServer(app); // Create an HTTP server
const gameServer = new Server({
  server: httpServer, // Use httpServer here
});

const PORT = process.env.PORT || 5800; // Set the port to 5800

const mongoClient = new MongoClient('mongodb://localhost:27017', {
  // You can configure the MongoClient options without TypeScript type definitions
  // For example, you can set useUnifiedTopology directly in the options object
  // @ts-ignore
  useNewUrlParser: true,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useUnifiedTopology: true,
});

async function connectToMongo() {
  try {
    await mongoClient.connect();
    console.log('Connected to MongoDB');

    const db: Db = mongoClient.db('yourDatabaseName');

    gameServer.define('room', GameRoom);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongo().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`Colyseus server is running on port ${PORT}`);
  });
});
