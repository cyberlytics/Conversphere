import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgFor} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { UsernameComponent } from '../username/username.component';
import { GameConnectionService } from 'src/app/services/api-connection.service';
import { Room, Rooms } from 'src/app/interfaces/rooms';


@Component({
  selector: 'app-startpage',
  standalone: true,
  imports: [CommonModule, 
    MatButtonModule, 
    MatIconModule,
    MatSliderModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterLink,
    FormsModule,
    MatDialogModule, 
    MatFormFieldModule,
    MatListModule, 
    NgFor,FormsModule, 
    MatSelectModule, 
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  providers: [GameConnectionService],
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss'],
})


export class StartpageComponent {
  
  imagePath = 'assets/chatIcon.png';
  //List with single selection
  typesOfShoes: string[] = ["Raum1", "Raum2" , "Raum3", "Raum4"];
  rooms: Rooms = {room: []};
  roomArray: Room[] = [];
  // Select with form field
  selectedValue: string | undefined;
  nicknameString!: string | null;
  nickname = new FormControl('', [Validators.required,Validators.required, Validators.pattern(/^\S*$/), Validators.minLength(3)]);
  room_name = new FormControl('', [Validators.required,Validators.required, Validators.pattern(/^\S*$/), Validators.minLength(3)]);
  description = "test description";
  createdRoom: Room | undefined;
  joinedRoom: Room | undefined;
  opened: unknown;
  
  constructor(public dialog: MatDialog, private snackBar: MatSnackBar,private gameConnectionService: GameConnectionService) {
    
  }
  ngOnInit(){
    this.gameConnectionService.getRooms().subscribe((data) => {
      this.rooms = data;
      this.roomArray = data.room;
    });
  }
  createNewRoom() {
    if(this.room_name.value != null) {
      this.gameConnectionService.createRoom(this.room_name.value, this.description).subscribe((data) => {
        this.createdRoom = data;
      });
    }
    //GameConnectionService.joinRoom(this.createdRoom?.id, this.nickname.value);
  }

  joinNewRoom() {
    if(this.createdRoom != null) {
      GameConnectionService.joinRoom(this.createdRoom?.id, this.nickname.value);
    }else if(this.selectedValue != null) {
      if(this.rooms != undefined){
        const roomId : string = findRoomIdWithName(this.selectedValue, this.rooms);
        GameConnectionService.joinRoom(roomId, this.nickname.value);
      }
      
    }
    //Optional Gibt fehler Meldung als Popup aus "Kein Raum ausgewählt oder erstellt"
  }

  // Open Info Dialog for chattrules
  openDialog(): void {
    this.nicknameString = this.nickname.value;
    const dialogRef = this.dialog.open(UsernameComponent, {
      width: '60vw',
      data: {nickname: this.nicknameString }
    });
    dialogRef.afterClosed().subscribe( () => {
      console.log('The dialog was closed');
    });
  }
// Copy Link  
  linkToCopy = 'http://localhost:3000/start';

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

function findRoomIdWithName(selectedValue: string, rooms: Rooms): string {
  const arr = rooms.room
  arr.find((obj) => {
    if(obj.name == selectedValue){
      return obj.id
    }else 
    return ""
  })
  console.log("Shit");
  return ""
}
