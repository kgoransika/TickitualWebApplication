import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BoardEventHolderComponent } from './board-event-holder.component';
import { EventService } from '../_services/event.service';

describe('BoardEventHolderComponent', () => {
  let component: BoardEventHolderComponent;
  let fixture: ComponentFixture<BoardEventHolderComponent>;
  let httpMock: HttpTestingController;
  let service: EventService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      declarations: [ BoardEventHolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardEventHolderComponent);
    service = TestBed.inject(EventService);
    httpMock = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
