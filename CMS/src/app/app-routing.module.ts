import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinComponentComponent } from './cabin-component/cabin-component.component';
import { VideoRequestComponent } from './video-request/video-request.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { IconsPageComponent } from './icons-page/icons-page.component';

const routes: Routes = [
  { path: '', component: CabinComponentComponent },
  { path: 'historyPage', component: HistoryPageComponent},
  { path: 'requestvideo', component: VideoRequestComponent},
  { path: 'icons-menu', component: IconsPageComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
