import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import { UsernameComponent } from '../username/username.component';

@Component({
  selector: 'app-startpage',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatDialogModule, MatFormFieldModule],
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss'],
})


export class StartpageComponent {
 nickname?: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(UsernameComponent, );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.nickname = result;
    });
  }
}
