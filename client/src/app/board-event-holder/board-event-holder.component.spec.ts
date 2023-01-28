import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BoardEventHolderComponent } from './board-event-holder.component';

describe('BoardEventHolderComponent', () => {
  let component: BoardEventHolderComponent;
  let fixture: ComponentFixture<BoardEventHolderComponent>;

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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
