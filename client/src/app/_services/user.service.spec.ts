import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get Public Content', () => {
    service.getPublicContent().subscribe((result) => {
      expect(result).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/test/all');
    expect(req.request.method).toBe('GET');
  });

  it('should get Event Holder Content', () => {
    service.getEventHolderBoard().subscribe((result) => {
      expect(result).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/test/eventHolder');
    expect(req.request.method).toBe('GET');
  });

  it('should get User Content', () => {
    service.getUserBoard().subscribe((result) => {
      expect(result).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/test/user');
    expect(req.request.method).toBe('GET');
  });
});
