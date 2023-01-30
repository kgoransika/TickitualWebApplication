import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { validUser } from 'src/mocks';
import { AuthService } from '../_services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthService;
  let httpMock: HttpTestingController;

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
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
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
    expect(username).toBeFalsy();
  })

  it('password field validity', () => {
    const password = fixture.debugElement.query(By.css('password'));
    expect(password).toBeFalsy();
  })

  afterEach(() => {
    httpMock.verify();
  });

  it('should login user', () => {

    service.login(validUser.username,validUser.password).subscribe((response) => {
      expect(response).toEqual({ success: true });
    });

    const req = httpMock.expectOne('http://localhost:8080/api/auth/signin');
    expect(req.request.method).toBe('POST');
     req.flush({ success: true });
    });
});
