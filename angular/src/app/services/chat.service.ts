import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  socket = io("https://server-domain.com/chat");

  constructor() {}


}
