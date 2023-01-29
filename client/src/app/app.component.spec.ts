import { ComponentFixture, TestBed  } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatToolbarModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Tickitual'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Tickitual');
  });

  it('should display the "eventHolder" link if user is logged in', () => {
    const fixture = TestBed.createComponent(AppComponent);
    // set up the component with user logged in
    AppComponent.isLoggedIn = true;
    fixture.detectChanges();

    // check that the "eventHolder" link is displayed
    const eventsLink = fixture.debugElement.query(By.css('a[routerLink="/eventHolder"]'));
    expect(eventsLink).toBeDefined();
  });

  it('should not display the "eventHolder" link if user is not logged in', () => {
    const fixture = TestBed.createComponent(AppComponent);
    // set up the component with user not logged in
    AppComponent.isLoggedIn = false;
    fixture.detectChanges();

    // check that the "eventHolder" link is not displayed
    const eventsLink = fixture.debugElement.query(By.css('a[routerLink="/eventHolder"]'));
    expect(eventsLink).toBeFalsy();
  });

  /* it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('Tickitual app is running!');
  }); */
});
