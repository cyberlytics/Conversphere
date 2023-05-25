import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
})
export class ChatroomComponent {
}
