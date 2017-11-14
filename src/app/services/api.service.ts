import { Injectable } from '@angular/core';
import { Jsonp} from '@angular/http';
import { House } from '../models/house';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  private searchUrl: string = 'http://api.nestoria.co.uk/api?country=uk' +
                              '&pretty=1&action=search_listings&encoding=json' +
                              '&listing_type=buy&callback=JSONP_CALLBACK';
  private currentPosition: {lat, lng} = {lat: 51.684183, lng: -3.431481};

  constructor(private jsonp: Jsonp) {}

  public getProperties(text, page): Observable<any> {
    const apiURL = `${this.searchUrl}&page=${page}&place_name=${text}`;
    return this.jsonp.request(apiURL)
              .map(res => res.json().response);
  }

 public  getPropertiesUsingLocation(page): Observable<any> {
    const apiURL = `${this.searchUrl}&page=1&centre_point=${this.currentPosition.lat},${this.currentPosition.lng}`;
    return this.jsonp.request(apiURL)
              .map(res => res.json().response);
  }

  public getCurrentPossition(): void {
    navigator.geolocation.getCurrentPosition(position => {
            this.currentPosition.lat = position.coords.latitude;
            this.currentPosition.lng = position.coords.longitude;
    });
  }

  public toHouse(property, propertiesFromStorage): House {
    propertiesFromStorage.forEach(element => {
      if (element.title === property.title) {
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
      id: property.id || '',
    };
  }
}
