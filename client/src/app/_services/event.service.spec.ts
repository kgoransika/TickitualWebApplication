import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { EventService } from './event.service';

describe('EventService', () => {
  let service: EventService;
  let httpMock: HttpTestingController;
  let id: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
     service = TestBed.inject(EventService);
     httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    /* it('should get event details', () => {
      service.findByCreatedBy('ransika').subscribe(result => {
        expect(result).toBeTruthy();
      });

      const req = httpMock.expectOne('http://localhost:8080/api/events');
      expect(req.request.method).toBe('GET')
      req.flush({
         results: [{
          eventName:"Ransika",
          eventVenue:"ovinransika9172@gmail.com",
          eventOnlineMethod:"ranx1234",
          eventDate: "user",
          eventTime:"Ransika",
          eventDuration:"ovinransika9172@gmail.com",
          ticketAmount:"ranx1234",
          ticketPackage: {
              packageName: "sadad",
              packagePrice: "asdasdsad"
          },
          ticketDescription:"Ransika"
        }]
      })
    }) */

    afterEach(() => {
      httpMock.verify();
    });

    it('should insert a event into the database', () => {
      const data = {
        eventName:"Ransika",
        eventVenue:"ovinransika9172@gmail.com",
        eventOnlineMethod:"ranx1234",
        eventDate: "user",
        eventTime:"Ransika",
        eventDuration:"ovinransika9172@gmail.com",
        ticketAmount:"ranx1234",
        ticketPackage: {
            packageName: "sadad",
            packagePrice: "asdasdsad"
        },
        ticketDescription:"Ransika"
      };

      service.create(data).subscribe((response) => {
        expect(response).toEqual({ success: true });
      });

      const req = httpMock.expectOne('http://localhost:8080/api/events');
      expect(req.request.method).toBe('POST');
       req.flush({ success: true });
      });

    it('should get event list', () => {
      service.find().subscribe((result) => {
        expect(result).toBeTruthy();
      });

      const req = httpMock.expectOne('http://localhost:8080/api/events');
      expect(req.request.method).toBe('GET');
    });
  });
