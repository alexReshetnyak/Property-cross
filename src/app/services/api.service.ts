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
    navigator.geolocation.getCurrentPosition(position => {
            this.currentPosition.lat = position.coords.latitude;
            this.currentPosition.lng = position.coords.longitude;
    });
  }

  toHouse(property, propertiesFromStorage): House {
    
    propertiesFromStorage.forEach(element => {
      if (element.title === property.title){
        property = element;
      }
    });

    return {
      img_url: property.img_url,
      price_formatted: property.price_formatted,
      title: property.title,
      bedroom_number: property.bedroom_number,
      bathroom_number: property.bathroom_number,
      summary: property.summary,
      favorite: property.favorite || false,
      id: property.id || "",
    };
  }
}
