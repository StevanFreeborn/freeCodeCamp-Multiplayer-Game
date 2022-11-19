import { Server } from 'socket.io';
import { createServer } from 'http';

export default function (app) {
  const server = createServer(app);
  const io = new Server(server);

  io.on('connection', socket => {
    console.log('a user connected');
  });

  return server;
}
