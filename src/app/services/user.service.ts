import { Injectable } from '@angular/core';
import { House } from '../models/house';

@Injectable()
export class UserService {

  constructor() {}

  public saveHouseInStorage(house): void {
    let properties = this.getDataFromStorage('properties');
    let propertiesJson = '';
    if(house.id === '') {
      house.id = this.makeId();
    }
    if (properties) {
      let newElement = true;
      for (let i = 0; i < properties.length; i++) {
        if (properties[i].id == house.id) {
          properties[i] = house;
          newElement = false;
        }
      }
      if (newElement) {
        properties.unshift(house);
      }
    } else {
      properties.push(house);
    }
    propertiesJson = JSON.stringify(properties);
    localStorage.setItem('properties', propertiesJson);
  }


  public saveSearchResult( searchParamsObj, page ): void {
    const maxCountSearchResunts = 10;
    if (page === 1) {
      let properties = this.getDataFromStorage('lastSearchProperties');
      let propertiesJson = '';
      if (properties) {
        if (properties.length > maxCountSearchResunts) {
          properties.length = maxCountSearchResunts;
        }
        properties.unshift(searchParamsObj);
      } else {
        properties.push(searchParamsObj);
      }
      propertiesJson = JSON.stringify(properties);
      localStorage.setItem('lastSearchProperties', propertiesJson);
    }
  }

  public savePropertyAndGetId(house): string {
    this.saveHouseInStorage(house);
    return house.id;
  }

  public getPropertyFromSrorage(id): House {
    const properties = this.getDataFromStorage('properties');
    let property;
    for (let i = 0; i < properties.length; i++) {
      if (properties[i].id === id) {
        property = properties[i];
        break;
      }
    }
    return property;
  }

  public getFavoriteDataFromStorage(): House[] {
    let properties = this.getDataFromStorage('properties');
    return properties.filter(property => property.favorite);
  }

  public getDataFromStorage(key): any[] {
    const houses =  localStorage.getItem(key);
    if(houses) {
      return JSON.parse(houses);
    } else {
      return [];
    }
  }

  public makeId(): string {
    const dateNow = new Date();
    const time = dateNow.getTime();
    const random = Math.round(Math.random()*1000);
    const id = `${time}${random}`;
    return id;
  }
}
