import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { EventBusService } from './_shared/event-bus.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Tickitual';
  private roles: string[] = [];
  isLoggedIn = false;
  showEventHolderBoard = false;
  username?: string;

  eventBusSub?: Subscription;
  static isLoggedIn: boolean;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showEventHolderBoard = this.roles.includes('ROLE_EVENTHOLDER');
      if(this.roles.includes('ROLE_EVENTHOLDER')){
        this.router.navigate(['/eventHolder']);
      }

      this.username = user.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
      },
      error: err => {
        console.log(err);
      }
    });
    this.router.navigate(['/home']);
  }

  reloadPage(): void {
    window.location.reload();
  }
}
