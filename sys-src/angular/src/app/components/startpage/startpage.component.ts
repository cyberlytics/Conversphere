import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule} from '@angular/material/form-field';
import { NgFor} from '@angular/common';
import { MatListModule} from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';
import { GameConnectionService } from 'src/app/services/api-connection.service';
import { Room } from 'src/app/interfaces/rooms';
import { CookieService } from 'ngx-cookie-service';

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
  providers: [GameConnectionService, CookieService],
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss'],
})


export class StartpageComponent {
  //Data for Startpage
  roomName!: string;
  nickname!: string;
  selectedRoom!: string;
  createdRoom!: Room;
  joinedRoom!: Room;
  // Copy Link
  linkToCopy = window.location.href;
  //List with single selection
  roomArray: Room[] = [];
  // Select with form field
  formNickname = new FormControl('', [Validators.required, Validators.pattern(/^\S*$/), Validators.minLength(3)]);
  formRoomName = new FormControl('', [Validators.required, Validators.pattern(/^\S*$/), Validators.minLength(3)]);
  description = "test description";

  opened: unknown;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar,public gameConnectionService: GameConnectionService, public router: Router, public cookieService: CookieService) {
  }

  ngOnInit(){
   this.getRooms();
  }

  getRooms(){
    this.gameConnectionService.getRooms().subscribe((data) => {
      console.log(data);
      this.roomArray = data;
    });
  }

  createNewRoom() {
    this.gameConnectionService.createRoom(this.roomName, this.description).subscribe((data) => {
      this.createdRoom = data;
      this.selectedRoom = data.name;
      this.roomArray.push(data)
    });
  }

  joinRoom() {
    const roomId : string = this.findRoomIdWithName(this.selectedRoom, this.roomArray);
    this.gameConnectionService.joinRoom(roomId, this.nickname).subscribe((data) => {
      console.log(data);
      this.joinedRoom = data;
      this.cookieService.set('nickname', this.nickname);
      this.cookieService.set('roomId', roomId);
      this.cookieService.set('userId', data.id);
      this.router.navigate(['/room/'+ roomId]);
    });
  }

  // Open Info Dialog for chattrules
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '60vw',
      data: {nickname: this.nickname }
    });
    dialogRef.afterClosed().subscribe( () => {
      console.log('The dialog was closed');
    });
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

  findRoomIdWithName(selectedValue: string, rooms: Room[]): string {
    const matchedRoom = rooms.find((obj) => obj.name === selectedValue);
    if (matchedRoom) {
      return matchedRoom.id;
    } else {
      console.log("Roomname not found");
      return "";
    }
  }
}


