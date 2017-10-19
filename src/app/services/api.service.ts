import { Injectable } from '@angular/core';
import { Http, Response, JsonpModule, Jsonp } from '@angular/http';
import { House } from '../models/house';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  private searchUrl: string = 'http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&callback=JSONP_CALLBACK';
  private currentPosition = {lat: 51.684183, lng: -3.431481};

  constructor(private http: Http, private jsonp: Jsonp){
    //this.getCurrentPossition();
  }

  getProperties(text, page){
    let apiURL = `${this.searchUrl}&page=${page}&place_name=${text}`;
    return this.jsonp.request(apiURL)
              .map(res => res.json().response);
              
  }

  getPropertiesUsingLocation(page){
    let apiURL = `${this.searchUrl}&page=1&centre_point=${this.currentPosition.lat},${this.currentPosition.lng}`;
    return this.jsonp.request(apiURL)
              .map(res => res.json().response);
  }

  getCurrentPossition(){
    var self = this;
    navigator.geolocation.getCurrentPosition(function(position){
            self.currentPosition.lat = position.coords.latitude;
            self.currentPosition.lng = position.coords.longitude;
    });
  }

  toHouse(res, propertiesFromStorage): House {
    
    propertiesFromStorage.forEach(element => {
      if (element.title === res.title){
        res = element;
      }
    });

    return {
      img_url: res.img_url,
      price_formatted: res.price_formatted,
      title: res.title,
      bedroom_number: res.bedroom_number,
      bathroom_number: res.bathroom_number,
      summary: res.summary,
      favorite: res.favorite || false,
      id: res.id || "",
    };
  }
}
