import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIO from 'socket.io';

import { Message } from './models';
import { setTokenSourceMapRange } from 'typescript';

export class ChatServer {
    public static readonly PORT: number = 4201;
    private app: express.Application;
    private server: Server;
    private io: socketIO.Server;
    private port: string | number;

    constructor() {
        this.createServer();
        this.listen();
    }

    private createServer(): void {
        this.app = express();
        this.server = createServer(this.app);
        this.port = process.env.PORT || ChatServer.PORT;
        this.io = socketIO(this.server);
    }

    private listen(): void {
        this.io.on('connect', (socket: socketIO.Socket) => {
            console.log(`Connected client ${socket.id} on port ${this.port}. ${socket}`);

            socket.on('join-room', (room: string) => {
                console.log(`Client ${socket.id} connecting to room ${room}`);
                socket.join(room);

                // Announcing clients quantity
                var clients = this.io.sockets.adapter.rooms[room];
                socket.emit('quantity-clients', clients.length);
                socket.broadcast.emit('quantity-clients', clients.length);

                // Announcing clients quantity on disconnect
                socket.on('disconnect', () => {
                    var clients = this.io.sockets.adapter.rooms[room];
                    socket.emit('quantity-clients', clients?.length);
                    socket.broadcast.emit('quantity-clients', clients?.length);
                });
            });

            socket.emit('message', 'Welcome to chat room');
            socket.on('message', (m: Message) => {
                console.log('[server](message): %s', JSON.stringify(m));
                this.io.emit('message', m);
            });

            socket.on('disconnect', () => {
                console.log(`Client ${socket.id} disconnected`);
                // Announcing clients quantity
                // var clients = this.io.sockets.adapter.rooms[room];
                // socket.emit('quantity-clients', clients.length);
                // socket.broadcast.emit('quantity-clients', clients.length);
            });
        });

        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}