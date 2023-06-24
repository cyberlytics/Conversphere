import { provideHttpClient } from '@angular/common/http';
import {provideHttpClientTesting }
from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('DialogComponent', () => {
    let component: DialogComponent;
    let fixture: ComponentFixture<DialogComponent>;
    beforeEach(async () => {

      await TestBed.configureTestingModule({
        imports: [ DialogComponent, NoopAnimationsModule, MatDialogModule ],
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
          { provide: MatDialogRef, useValue: {} },
          { provide: MAT_DIALOG_DATA, useValue: {}},
          provideRouter([]),
        ],
      })
      .compileComponents();

      fixture = TestBed.createComponent(DialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
});
