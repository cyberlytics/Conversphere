import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    SidemenuComponent,
    ChatroomComponent,
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent
{
  rect: DOMRect | undefined;
  player: HTMLElement | null;
  constructor()
  {
    this.rect = document.getElementById("Spielfeld")?.getBoundingClientRect();
    this.player = document.getElementById("Spieler");
  }

  onClickAtDiv(e: MouseEvent)
  {
    if(this.rect == null || this.player == null)
    {
      console.log("rect is null, gamefield not found in DOM");
      return;
    }
    console.log(e.clientX - this.rect.left);
    console.log(e.clientY - this.rect.top);

    this.player.style.position="absolute";
    this.player.style.left=(e.clientX)+'px';
    this.player.style.top=(e.clientY)+'px';
  }

  @HostListener('window:resize', ['$event']) onResize()
  {
    this.rect = document.getElementById("Spielfeld")?.getBoundingClientRect();
  }
}
