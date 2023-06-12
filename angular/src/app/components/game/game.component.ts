import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ChatService } from 'src/app/services/chat.service';
import { User } from 'src/app/interfaces/users';

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
    RouterLink,
    ReactiveFormsModule,
  ],
  providers: [AuthentificationService],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent
{
  chatContent: string | undefined;

  constructor(private chatservice:ChatService)
  {
    chatservice.InitMessagesSocket().subscribe( (data) => {
      this.chatContent = data.text; // eine neue Chatnachricht -> chatContent zu Liste wandeln - neue nachricht an Liste anfügen und über --ngFor-- anzeigen wenn Liste voll ist erstes element wieder löschen
    } );
    chatservice.InitUsersSocket().subscribe();
  }


  public opened = false;
  prozentualplayerheight=0;
  prozentualplayerwidth=0;
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
      this.prozentualplayerheight=((e.clientY - menubarHoehe)/innerHeight);
      this.prozentualplayerwidth=(e.clientX/innerWidth);

    }else{
      this.player.style.top=(e.clientY +'px');
    }

    //save player position in %
    //send player position to server
  }

  @HostListener('window:resize', ['$event']) onResize()
  {
    this.player=document.getElementById("Spieler");
    if (this.player != null)
    {
      this.player.style.left=(this.prozentualplayerwidth*innerWidth)+'px';
      console.log((this.prozentualplayerwidth)+'px');
      this.player.style.top=(this.prozentualplayerheight*innerHeight)+'px';
    }
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



  messageControl = new FormControl('');
  sendMessage(){
    const message = this.messageControl.value;
    if(message)
    {
      this.messageControl.setValue('');
    }
  }
}
