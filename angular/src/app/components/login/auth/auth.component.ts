import { Component, Injector, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule
    ],
  providers: [AuthentificationService],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  email!: string;
  password!: string;
  username: string = "usernametest";
  hide: boolean = true;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(private authService: AuthentificationService, private injector: Injector) { }

  public httpHeaders: HttpHeaders = new HttpHeaders();

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      success => {
        console.log('Anmeldung erfolgreich!');
      },
      error => {
        console.error('Fehler bei der Anmeldung:', error);
      }
    );
  }

  onRegister() {
    if(this.passwordFormControl.value != null && this.emailFormControl.value != null){
      this.email = this.emailFormControl.value;
      this.password = this.passwordFormControl.value;
    }
    this.authService.register(this.username, this.email, this.password)
      .subscribe({
        next: (data) => { console.log(data)
      }
    });
  }

  onInfo():void {
    this.authService.info("test").subscribe({
      next: (data) => { console.log(data)}
    });
  }
}
