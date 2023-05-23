import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    RouterLink,
    GameComponent
  ],
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent {
  opened=false;
}