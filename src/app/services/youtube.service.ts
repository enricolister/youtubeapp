import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = "https://www.googleapis.com/youtube/v3";
  private apiKey = "";
  private playList = "UUHRTziAevLPgAE9Y5VhSs5g"
  private channelId = "UCHRTziAevLPgAE9Y5VhSs5g";
  private nextPageToken = "";

  constructor(public http: HttpClient) { }

  getVideos() {
    let url = `${this.youtubeUrl}/playlistItems?part=snippet&maxResults=10&key=${this.apiKey}&playlistId=${this.playList}`;

    /* let params = new HttpParams();
    params.set('part', 'snippet');
    params.set('maxResults', '10');
    params.set('playlistId', this.playList);
    params.set('key', this.apiKey); */

    return this.http.get(url)
      .pipe( map ( (data: any) => {
        console.log(data);
        this.nextPageToken = data.nextPageToken;
        let videos: any[] = [];
        for (let video of data.items) {
          let snippet = video.snippet;
          videos.push(snippet);
        }
        return videos;
      }));
  }
}
