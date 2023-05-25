import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSliderModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent 
{
  onClickAtDiv(e: MouseEvent)
  {
    var rect=document.getElementById("Spielfeld")?.getBoundingClientRect();
    console.log(e.clientX - rect!.left);
    console.log(e.clientY - rect!.top);
    var S = document.getElementById("Spieler");
    
    S!.style.position="absolute";
    S!.style.left=(e.clientX)+'px';
    S!.style.top=(e.clientY)+'px';
  }

    @HostListener('window:resize', ['$event']) onResize(event: { target: { innerWidth: any; innerHeight: any;}; }) 
    {
      
    }
  
}
