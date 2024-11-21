import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { Observable, Subscription, switchMap, timer } from 'rxjs';
import { VideoRequestComponent } from '../video-request/video-request.component';
// import { Platform } from '@angular/cdk/platform';
// import { LocalNotifications, ActionPerformed } from '@capacitor/local-notifications';


interface DataItem {
  message: string;
  detail: string;
  timestamp: string;
  notification_id: string;
}
interface VinResponse {
  vins: string[];
}
interface History {
  notifications: DataItem[];
}

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent {
  dataForm: FormGroup;
  dataItems: DataItem[] = [];
  errorMessage: string = '';
  modalMessage: string = '';
  showForm: boolean = true;
  today: string;
  notifications: DataItem[] = [];
  data: any;
  dialog = inject(MatDialog);
  isLoading: boolean = false;
  // subscription: Subscription = new Subscription();
  lastData: any;
  // private notificationId = 0;
  vinList: string[] = [];
  isLoadingVins: boolean = false;
  vinError: string | null = null;
  private notificationTimeout?: number;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    // private platform: Platform
  ) {
    this.dataForm = this.fb.group({
      vin: [''],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
    const todayDate = new Date();
    this.today = todayDate.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.loadVins();
    //  setInterval(() => {
    //   this.modalData();
    //  }, 10000)
  }
  redirectToVideo() {
      this.router.navigate(['/requestvideo']);
  }
  private loadVins(): void {
    this.isLoadingVins = true;
    this.vinError = null;

    this.http.get<VinResponse>('http://3.110.153.31:5001/get_all_vins')
      .subscribe({
        next: (response) => {
          this.vinList = response.vins;
          this.isLoadingVins = false;
        },
        error: (error) => {
          console.error('Error loading VINs:', error);
          this.vinError = 'Failed to load vehicle numbers. Please try again later.';
          this.isLoadingVins = false;
        }
      });
  }

  // private showNotification(data: DataItem): void {
  //   if (this.notificationTimeout) {
  //     clearTimeout(this.notificationTimeout);
  //   }
  //   this.showForm = false;
  //   this.modalMessage = data.message;
  // }

  // private fetchData1(): Observable<DataItem> {
  //   return this.http.get<DataItem>(`http://3.110.153.31:5002/notification`);
  // }

  // modalData() {
  //   this.showForm = false;
  //   this.http.get<DataItem>(`http://3.110.153.31:5002/notification`)
  //     .subscribe({
  //       next: (data) => {
  //         if (data && data.message) {
  //           this.notifications.push(data);
  //           this.showNotification(data);
  //         }
  //       },
  //       error: (error) => {
  //       }
  //     });
  // }

  // closeNotification(): void {
  //   this.showForm = true;
  //   this.modalMessage = '';
  //   if (this.notificationTimeout) {
  //     clearTimeout(this.notificationTimeout);
  //   }
  // }

  // hasNewData(newData: DataItem): boolean {
  //   if (!this.lastData) {
  //     return true;
  //   }
  //   return newData.notification_id !== this.lastData.notification_id;
  // }

  fetchData() {
    if (this.dataForm.invalid) {
      this.errorMessage = 'Please fill in all fields before submitting.';
      return;
    }
    this.errorMessage = '';
    this.isLoading = true;
    const vin = this.dataForm.value.vin;
    const startTime = this.dataForm.value.startTime;
    const endTime = this.dataForm.value.endTime;

    this.http.get<History>(`http://3.110.153.31:5001/get_notifications_history?starttime=${startTime}&endtime=${endTime}`)
      .subscribe({
        next: (data) => {
          this.dataItems = data.notifications;
          this.isLoading = false;
          console.log(data.notifications);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Error fetching data';
        }
      });
  }

  // requestVideo(notification_id: string) {
  //   const videoUrl = `http://3.110.153.31:5001/get_video/${notification_id}`;
  //   const dialogRef: MatDialogRef<VideoRequestComponent> = this.dialog.open(VideoRequestComponent, {
  //     width: '888px',
  //     panelClass: 'ap-modal',
  //     data: { videoUrl }
  //   });
  //   dialogRef.afterClosed().subscribe(() => { });
  // }

  // close() {
  //   this.showForm = true;
  // }
}
