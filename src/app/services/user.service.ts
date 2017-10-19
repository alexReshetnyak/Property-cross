import { Injectable } from '@angular/core';
import { Http, Response, JsonpModule, Jsonp } from '@angular/http';
import { House } from '../models/house';

@Injectable()
export class UserService {

  constructor(){}

  saveHouseInStorage(house){
    let properties = this.getDataFromStorage('properties');
    let propertiesJson = "";
    if(house.id === ""){
      house.id = this.makeId();
    }
    if (properties){
      let newElement = true;
      for (var i = 0; i < properties.length; i++) {
        if (properties[i].id == house.id) {
          properties[i] = house;
          newElement = false;
        }
      }
      if(newElement){
        properties.unshift(house);
      }
    }else{
      properties.push(house);
    }   
    propertiesJson = JSON.stringify(properties);
    localStorage.setItem("properties", propertiesJson);
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

  savePropertyAndGetId(house){
    this.saveHouseInStorage(house);
    return house.id;
  }

  getPropertyFromSrorage(id){
    let properties = this.getDataFromStorage('properties');
    for (var i = 0; i < properties.length; i++){
      if (properties[i].id === id){
        return properties[i];
      }
    }
  }

  getFavoriteDataFromStorage(){
    let properties = this.getDataFromStorage('properties');
    let favorite = properties.filter(prop => prop.favorite);
    return favorite;
  }

  getDataFromStorage(key){
    let houses =  localStorage.getItem(key);
    if(houses){
      return JSON.parse(houses);
    }else{
      return [];
    }
  }

  makeId(){
    let dateNow = new Date();
    let time = dateNow.getTime();
    let id = time + "" + Math.round(Math.random()*1000);
    return id;
  }
}
