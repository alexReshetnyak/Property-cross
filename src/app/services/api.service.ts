import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, JsonpModule, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ApiService {
  private searchUrl: string = '/api/users';

  constructor(private http: Http, private jsonp: Jsonp) {}

  getProperty(text, page){
    let apiURL = `http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=${page}&place_name=${text}&callback=JSONP_CALLBACK`
    return this.jsonp.request(apiURL)
             .map(res => res.json().response)
  }
}
