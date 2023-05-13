import { Component, Injector, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject, switchMap } from 'rxjs';

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
  hide: boolean = true;

  username: string = "usernametest";
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  info$: Subject<any> = new Subject<Event>();

  constructor(private authService: AuthentificationService, private injector: Injector) {
    this.info$.pipe(
      switchMap((event) => {
        return this.infoCall()
      }),
      ).subscribe({
        next: (data) => { console.log(data)}
      });
  }

  infoCall(): Observable<any> {
    let obsFromService =  this.authService.info("test");

    obsFromService.subscribe({
      next: (data) => { console.log(data)}
    });

    return obsFromService;
  }

  onInfo(){
    this.info$.next(event);
  }






  onLogin():void {
    if(this.passwordFormControl.value == null || this.emailFormControl.value == null){
      console.log("email or password is null");
      return;
    }
    this.authService.login(this.emailFormControl.value, this.passwordFormControl.value).subscribe({
      next: (data) => { console.log(data)}
    });
  }

  onRegister():void {
    if(this.passwordFormControl.value == null || this.emailFormControl.value == null){
      console.log("email or password is null");
      return;
    }
    this.authService.register(this.username, this.emailFormControl.value, this.passwordFormControl.value)
      .subscribe({
        next: (data) => { console.log(data)
      }
    });
  }
}
