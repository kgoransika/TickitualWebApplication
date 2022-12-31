import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardEventHolderComponent } from './board-event-holder.component';

describe('BoardAdminComponent', () => {
  let component: BoardEventHolderComponent;
  let fixture: ComponentFixture<BoardEventHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
