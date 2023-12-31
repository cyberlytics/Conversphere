import { Component, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, switchMap, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  providers: [AuthentificationService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  hide = true;

  username = 'usernametest';
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info$: Subject<any> = new Subject<void>();

  constructor(
    private authService: AuthentificationService,
    private injector: Injector
  ) {
    this.info$
      .pipe(
        switchMap(() => {
          return this.infoCall();
        })
      )
      .subscribe({
        next: (data) => {
          console.log(data);
        },
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  infoCall(): Observable<any> {
    const obsFromService = this.authService.info();

    obsFromService.subscribe({
      next: (data: string) => {
        console.log(data);
      },
    });

    return obsFromService;
  }

  onInfo() {
    this.info$.next(undefined);
  }

  onLogin(): void {
    if (
      this.passwordFormControl.value == null ||
      this.emailFormControl.value == null
    ) {
      console.log('email or password is null');
      return;
    }
    this.authService
      .login(this.emailFormControl.value, this.passwordFormControl.value)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
      });
  }

  onRegister(): void {
    if (
      this.passwordFormControl.value == null ||
      this.emailFormControl.value == null
    ) {
      console.log('email or password is null');
      return;
    }
    this.authService
      .register(
        this.username,
        this.emailFormControl.value,
        this.passwordFormControl.value
      )
      .subscribe({
        next: (data) => {
          console.log(data);
        },
      });
  }
}
