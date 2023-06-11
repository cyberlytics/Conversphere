import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rooms } from '../interfaces/rooms';
import { Messages } from '../interfaces/messages';

@Injectable({
  providedIn: 'root'
})
export class GameConnectionService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  /**
   * Get info about all rooms
   * @returns A list of all rooms with their id, name and description
   */
  getRooms(): Observable<Rooms> {
    const url = `${this.baseUrl}/rooms`;
    return this.http.get<Rooms>(url);
  }

  /**
   * Join a room
   * @param room_id
   * @param nickname
   * @returns
   */
  joinRoom(room_id: string, nickname: string): Observable<JSON> {
    const url = `${this.baseUrl}/join`;
    return this.http.post<JSON>(url,{
      room_id: room_id,
      nickname: nickname
    } );
  }
}
