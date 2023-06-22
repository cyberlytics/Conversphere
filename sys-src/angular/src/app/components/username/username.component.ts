import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-username',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,],
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})

export class UsernameComponent {
  nickname: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<UsernameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.nickname = data.nickname;
  }

  onOkClick(){
    this.dialogRef.close(this.nickname);
  }
}
