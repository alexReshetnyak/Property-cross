import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, JsonpModule, Jsonp } from '@angular/http';
import { House } from '../models/house';

@Injectable()
export class UserService {
  currentProperty:House;
  constructor(){}

  getCurrentProperty(){
    return this.currentProperty;
  }

  setCurrentProperty(property){
    this.currentProperty = property;
  }

  saveHouseInStorage(house){
    let properties = this.getDataFromStorage('favoriteProperties');
    let propertiesJson = "";
    if(house.id === ""){
      house.id = this.makeId();
    }
    if (properties){
      properties.unshift(house);
    }else{
      properties.push(house);
    }
    propertiesJson = JSON.stringify(properties);
    localStorage.setItem("favoriteProperties", propertiesJson);
  }

  deleteHouseFromStorage(house){
    let properties = this.getDataFromStorage('favoriteProperties');
    let propertiesJson = "";
    for (var i = 0; i < properties.length; i++) {
      if (properties[i].title === house.title) {
        properties.splice(i, 1);
      }
    }
    propertiesJson = JSON.stringify(properties);
    localStorage.setItem("favoriteProperties", propertiesJson);
  }

  getDataFromStorage(key){
    let houses =  localStorage.getItem(key);
    if(houses){
      return JSON.parse(houses);
    }else{
      return [];
    }
  }

  saveSearchResult(text, numberHouses, page){
    if (page === 1){
      let properties = this.getDataFromStorage('lastSearchProperties');
      let searchParamsObj = {'searchText': text, 'numberResults': numberHouses};
      let propertiesJson = "";
      if (properties){
        if (properties.length > 10) {
          properties.length = 10;
        }
        properties.unshift(searchParamsObj);
      }else{
        properties.push(searchParamsObj);
      }
      propertiesJson = JSON.stringify(properties);
      localStorage.setItem("lastSearchProperties", propertiesJson);
    }
  }

  makeId(){
    let dateNow = new Date();
    let time = dateNow.getTime();
    let id = time + "" + Math.round(Math.random()*1000);
    return id;
  }
}
