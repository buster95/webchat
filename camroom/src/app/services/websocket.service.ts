import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as SocketIO from 'socket.io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket: SocketIO.Socket;
  readonly uri: string = 'ws://localhost:4201';

  constructor() {
    this.socket = io(this.uri);
  }

  close() {
    this.socket.disconnect();
  }

  listen(eventName: string) {
    return new Observable(subscriber => {
      this.socket.on(eventName, data => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}