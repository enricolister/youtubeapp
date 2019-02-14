import { YoutubeService } from './../../services/youtube.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {

  videos: any[] = [];

  constructor(public _yts: YoutubeService) {
    this._yts.getVideos().subscribe(videos => {
      console.log(videos);
      this.videos = videos;
    });
  
  }



}
