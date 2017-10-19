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
      for (let i = 0; i < properties.length; i++) {
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


  saveSearchResult( searchParamsObj, page ){
    const maxCountSearchResunts = 10;
    if (page === 1){
      let properties = this.getDataFromStorage('lastSearchProperties');
      let propertiesJson = "";
      if (properties){
        if (properties.length > maxCountSearchResunts) {
          properties.length = maxCountSearchResunts;
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
    let property;
    for (let i = 0; i < properties.length; i++){
      if (properties[i].id === id){
        property = properties[i];
        break;
      }
    }
    return property;
  }

  getFavoriteDataFromStorage(){
    let properties = this.getDataFromStorage('properties');
    return properties.filter(property => property.favorite);
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
    let random = Math.round(Math.random()*1000);
    let id = `${time}${random}`;
    return id;
  }
}
