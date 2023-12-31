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
import { Room } from 'src/app/interfaces/rooms';
import { Message } from 'src/app/interfaces/messages';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { GameConnectionService } from 'src/app/services/api-connection.service';
import { BehaviorSubject, map } from 'rxjs';

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
    MatFormFieldModule,
    MatSnackBarModule,
  ],
  providers: [AuthentificationService, CookieService, GameConnectionService, ChatService],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  // Copy Link
  linkToCopy = window.location.href;
  $user: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([{ id: "", nickname: "", position: { x: 0, y: 0}}]);

  //chatContent: Message[] = [{id:"Message_id", text:"Halloa" , user_id:"600", visibility:5},{id:"Name 2", text:"Hallo2" , user_id:"602", visibility:10},{id:"Name 3", text:"Hallo 3" , user_id:"502", visibility:20},{id:"Name 4", text:"Hallo4" , user_id:"503", visibility:30},{id:"Name 5", text:"Hallo5" , user_id:"504", visibility:40},{id:"Name 6", text:"Hallo 6" , user_id:"505", visibility:50},{id:"Name 7", text:"Hallo8" , user_id:"506", visibility:60},{id:"Name 9", text:"Hallo9" , user_id:"507", visibility:70},{id:"Name 10", text:"Hallo 10" , user_id:"508", visibility:80},{id:"Name 11", text:"Hallo 11" , user_id:"509", visibility:90},{id:"Name 12", text:"Hallo12" , user_id:"510", visibility:100}];
  chatContent:Message[]=[{id : "", text : "", user_id : "", visibility : 0}];
  chatFontSize:number | undefined;
  //userlist: User[] = [{ id: "600", nickname: "User1", position: { x: 200, y: 200  }}, {id: "602", nickname: "User2", position: { x: 300, y: 300 }}]
  userlist:User[]=[];

  user:User = {
    id: "",
    nickname: "",
    position: {
      x: 0,
      y: 0}
  }
  room :Room | undefined ;
  roomid!: string;
  roomArray!: Room[];

  public opened = false;
  prozentualplayerheight=0;
  prozentualplayerwidth=0;
  player: HTMLElement | null | undefined;
  chatmessage : HTMLElement | null | undefined;

  constructor(public chatservice:ChatService, public cookieService: CookieService, public gameConnectionService: GameConnectionService, public snackBar: MatSnackBar)
  {
    this.roomid = cookieService.get('roomId');
    this.user.nickname = cookieService.get('nickname');
    this.user.id = cookieService.get('userId');
    this.getRooms();
  }

  setupWebsocket(){
    this.chatservice.setupSocketConnection(this.roomid, this.user);
    this.chatservice.InitMessagesSocket().subscribe( (data: Message) => {
      if (this.chatContent.length > 12)
      {
        this.chatContent.shift();
        this.chatContent.push(data);
      }
      else
      {
        this.chatContent.push(data); // eine neue Chatnachricht -> chatContent zu Liste wandeln - neue nachricht an Liste anfügen und über --ngFor-- anzeigen wenn Liste voll ist erstes element wieder löschen
      }
    } );
    this.chatservice.InitUsersSocket().pipe(
      map((data: User[]) => {
        const transformedData = data.map((user: User) => {
          // Ändere den gewünschten Wert des Benutzers
          user.position.y = user.position.y * innerHeight;
          user.position.x = user.position.x * innerWidth;
          return user;
        });

        return transformedData;
      })
    ).subscribe((data: User[]) => {
      console.log(data);
      this.$user.next(data);
      this.userlist = data;
    });
  }

  ngOnInit()
  {
    this.chatmessage=document.getElementById("chatnachricht");
    if(this.chatmessage != null)
    {
      const windowwidth = window.innerWidth;
      const windowheight = window.innerHeight;
      //this.chatmessage.style.fontSize=((Math.min(windowwidth,windowheight)/40)+'px');
      this.chatmessage.style.fontSize=(((windowwidth+windowheight)/120)+'px');
    }
  }

  ngAfterInit(){
    this.player = document.getElementById("Spieler");
  }

  ngOnDestroy(){
    this.chatservice.LeaveRoom(this.user);
  }

  getUsernickname(userId: string): string {
    const user = this.userlist.find(user => user.id === userId);
    return user ? user.nickname : '';
  }

  getRooms(){
    this.gameConnectionService.getRooms().subscribe((data) => {
      this.roomArray = data;
      this.room = this.findRoomWithId(this.roomid, this.roomArray);
      this.setupWebsocket();
    });
  }

  findRoomWithId(roomId: string, rooms: Room[]): Room | undefined {
    const matchedRoom = rooms.find((obj) => obj.id === roomId);
    if (matchedRoom) {
      return matchedRoom;
    } else {
      console.log("Roomname not found");
      return undefined;
    }
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

    if(menubarHoehe != null)
    {
      this.player.style.top=(e.clientY - menubarHoehe +'px');
      this.prozentualplayerheight=((e.clientY - menubarHoehe)/innerHeight);
      this.prozentualplayerwidth=(e.clientX/innerWidth);
    }
    else
    {
      this.player.style.top=(e.clientY +'px');
    }
    this.user.position.x=this.prozentualplayerwidth;
    this.user.position.y=this.prozentualplayerheight;
    this.chatservice.positionUpdate(this.user);
  }

  @HostListener('window:resize', ['$event']) onResize()
  { const windowwidth = window.innerWidth;
    const windowheight = window.innerHeight;
    this.player=document.getElementById("Spieler");
    if (this.player != null)
    {
      this.player.style.left=(this.prozentualplayerwidth*windowwidth)+'px';
      console.log((this.prozentualplayerwidth)+'px');
      this.player.style.top=(this.prozentualplayerheight*windowheight)+'px';
    }
    this.chatmessage=document.getElementById("chatnachricht");
    if(this.chatmessage != null)
    {
      this.chatmessage.style.fontSize=((Math.min(windowwidth,windowheight)/40)+'px');
      //this.chatmessage.style.fontSize=(((windowwidth+windowheight)/120)+'px');
    }
  }

  formatlabel(value:number): string{
    if(value==0)
    {
      return "flüstern";
    }
    if(value==1)
    {
      return "reden";
    }
    if(value==2)
    {
      return "rufen";
    }
    return '${value}';
  }

  leaveRoom()
  {
    this.chatservice.LeaveRoom(this.user);
  }

  messageControl = new FormControl();
  sendMessage(){
    const  message: Message = {
      text: this.messageControl.value,
      user_id: this.user.id,
      id: null,
      visibility: null
    }
    if(this.messageControl.value != "")
    {
      this.messageControl.setValue("");
      this.chatservice.SendMessage(message);
    }
  }

  // Snackbar for Copy Link
  copyToClipboard() {
    const el = document.createElement('textarea');
    el.value = this.linkToCopy;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    this.snackBar.open('Link wurde in die Zwischenablage kopiert', 'Schließen', {
      duration: 4000,
    });
  }
}
