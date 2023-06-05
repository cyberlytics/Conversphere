import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterLink
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent
{
  public opened = false;
  player: HTMLElement | null | undefined;

  ngAfterInit(){
    this.player = document.getElementById("Spieler");
  }

  onClickAtDiv(e: MouseEvent)
  {
    this.player = document.getElementById("Spieler");
    if(this.player == null)
    {
      console.log("player not found in DOM");
      return;
    }
    const menubarHoehe = document.getElementById("gamefield")?.getBoundingClientRect().top;
    this.player.style.position="absolute";
    this.player.style.left=(e.clientX)+'px';

    if(menubarHoehe != null){
      this.player.style.top=(e.clientY - menubarHoehe +'px');
    }else{
      this.player.style.top=(e.clientY +'px');
    }
    //save player position in %
    //send player position to server
  }

  @HostListener('window:resize', ['$event']) onResize()
  {
    //use player position in % to reset after window resize
  }

  formatlabel(value:number): string{
    if(value==0){
      return "flüstern";
    }
    if(value==1){
      return "reden";
    }
    if(value==2){
      return "rufen";
    }
    return '${value}';
  }
}
