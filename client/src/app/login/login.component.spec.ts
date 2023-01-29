import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('loginform invalid when empty', () => {
    const username = fixture.debugElement.query(By.css('username'));
    const password = fixture.debugElement.query(By.css('password'));
    expect(component.form.valid).toBeFalsy();
  })

    it('username field validity', () => {
      const username = fixture.debugElement.query(By.css('username'));
      const loginBtn = fixture.debugElement.nativeElement.querySelector('button');
      loginBtn.click();
    })

    it('password field validity', () => {
      const password = fixture.debugElement.query(By.css('password'));
      expect(password).toBeFalsy();
    })

});
