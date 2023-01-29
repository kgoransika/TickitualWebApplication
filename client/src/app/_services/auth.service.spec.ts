import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { validUser } from "../../mocks/index";
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should post login info to database', () => {

    service.login(validUser.username,validUser.password).subscribe((response) => {
      expect(response).toEqual({ success: true });
    });

    const req = httpMock.expectOne('http://localhost:8080/api/auth/signin');
    expect(req.request.method).toBe('POST');
     req.flush({ success: true });
    });

    it('should post register info to database', () => {

      service.register(validUser.username,validUser.email,validUser.password).subscribe((response) => {
        expect(response).toEqual({ success: true });
      });

      const req = httpMock.expectOne('http://localhost:8080/api/auth/signup');
      expect(req.request.method).toBe('POST');
       req.flush({ success: true });
      });

    it('should logout the user', () => {

      service.logout().subscribe((response) => {
        expect(response).toEqual({ success: true });
      });

      const req = httpMock.expectOne('http://localhost:8080/api/auth/signout');
      expect(req.request.method).toBe('POST');
        req.flush({ success: true });
      });
});
