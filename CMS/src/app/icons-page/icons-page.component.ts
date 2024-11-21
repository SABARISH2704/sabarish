import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-icons-page',
  templateUrl: './icons-page.component.html',
  styleUrls: ['./icons-page.component.css']
})
export class IconsPageComponent {

  constructor(private router: Router) { }
  redirectToVideo() {
    this.router.navigate(['/historyPage']);
  }
  notificationHistory() {
    this.router.navigate(['/historyPage']);
  }
  requestVideo() {
    this.router.navigate(['/requestvideo']);
  }

}
