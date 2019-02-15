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
    let url = `${this.youtubeUrl}/playlistItems`;

    let params = new HttpParams().set('part', 'snippet').set('maxResults', '10').set('playlistId', this.playList).set('key', this.apiKey);

    if (this.nextPageToken) {
      console.log('there is a next page token');
      params = params.append('pageToken', this.nextPageToken);
    }

    if (params.has('pageToken')) {
      console.log('has nextpage');
    } else {
      console.log('non has next page');
    }
    return this.http.get(url, { params })
      .pipe( map ( (data: any) => {
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
