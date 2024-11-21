import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';

interface DataItem {
  message: string;
  detail: string;
  timestamp: string;
  notification_id: string;
}

@Component({
  selector: 'app-video-request',
  templateUrl: './video-request.component.html',
  styleUrls: ['./video-request.component.css']
})
export class VideoRequestComponent {

  @ViewChild('videoContainer', { static: false }) videoContainer!: ElementRef;
  videoUrl: string | null = null;
  dataItems: DataItem | null = null;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.http.get<DataItem>('http://3.110.153.31:5002/notification')
      .subscribe(data => {
        this.dataItems = data;
      });
  }

  onSubmit() {
    if (!this.dataItems || !this.dataItems.notification_id) {
      console.error('Notification ID is not available.');
      return;
    }

    this.http.get(`http://3.110.153.31:5001/get_video/${this.dataItems.notification_id}`, { responseType: 'blob' })
      .subscribe(
        (response: Blob) => {
          const url = URL.createObjectURL(response);
          const video = document.createElement('video');
          video.src = url;
          video.controls = true;
          video.style.width = '100%';
          video.style.maxHeight = '200px';
          
          if (this.videoContainer) {
            this.videoContainer.nativeElement.innerHTML = '';
            this.videoContainer.nativeElement.appendChild(video);
          }
        },
        (error) => {
          console.error('Error fetching MP4:', error);
        }
      );
  }
}
