import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface DataItem {
  message: string;
  detail: string;
  timestamp: string;
  notification_id: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tmobile-CMS';
  modalMessage: string = '';
  showForm: boolean = true;
  notifications: DataItem[] = [];
  private notificationTimeout?: number;

  constructor(private http: HttpClient, private router: Router,) { }
  
  ngOnInit(): void {
    setInterval(() => {
      this.modalData();
    }, 15000)
  }
  modalData() {
    this.showForm = false;
    this.http.get<DataItem>(`http://3.110.153.31:5002/notification`)
      .subscribe({
        next: (data) => {
          if (data && data.message) {
            this.notifications.push(data);
            this.showNotification(data);
          }
        },
        error: (error) => {
        }
      });
  }
  redirectToVideo() {
    this.router.navigate(['/requestvideo']);
  }
  close() {
    this.showForm = true;
  }
  private showNotification(data: DataItem): void {
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }
    this.showForm = false;
    this.modalMessage = data.message;
  }
}
