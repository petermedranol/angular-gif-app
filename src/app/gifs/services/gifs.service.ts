import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient) {

    this.loadLocalStorage();

    if(this._tagsHistory.length > 0) {
      this.searchTag(this._tagsHistory[0]);
    }

  }

  private _tagsHistory: string[] = [];

  public gifsList:Gif[] = [];

  private apiKey: string = 'RZAP5601MyKQsZGJbbU9DGjgF9HkB5Ki';
  private url: string = 'https://api.giphy.com/v1/gifs';

  get tagsHistory(): string[] {
    return [ ...this._tagsHistory ];
  }

  private organizeHistory(tag:string): void {
    tag = tag.trim().toLowerCase();
    if(this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter( t => t !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
  }

  private saveLocalStorage(): void {
    localStorage.setItem('tags', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    const tags = localStorage.getItem('tags');
    if(tags) {
      this._tagsHistory = JSON.parse(tags);
    }
  }

  searchTag( tag: string ):void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);
    this.saveLocalStorage();

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', '10');

    this.http.get<SearchResponse>(`${ this.url }/search`, { params })
      .subscribe( (resp) => {
        this.gifsList = resp.data;
      }
    );
  }

}
