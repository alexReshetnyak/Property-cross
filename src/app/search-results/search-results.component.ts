import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { House } from '../models/house';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  public text: string = '';
  public errorMessage: string = '';
  public currentPage: number = 1;
  public numberHouses: number;
  public houses: Array<House> = [];
  public resultsReady: boolean = false;
  public noResults: boolean = false;
  public title: string = '';

  constructor(public apiService: ApiService,
              private activatedRoute: ActivatedRoute,
              public userService: UserService,
              private router: Router
            ) {}

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.text = params['text'];
      this.startSearch();
    });
  }

  public startSearch(): void {
    if (this.text === 'favorite') {
      this.getFavoriteProperties();
      this.title = 'Favorite Properties';
    }else if (this.text === 'location') {
      this.startSearchUsingLocation();
      this.title = 'Search Results';
    } else {
      this.startSearchUsingText(this.text, 1);
      this.title = 'Search Results';
    }
  }

  public startSearchUsingText(text, page): void {
    this.resultsReady = false;
    this.apiService.getProperties(text, page)
      .subscribe(res => {
        this.processResponse(res);
        this.userService.saveSearchResult({text, numberResults: this.numberHouses}, page);
      }),
      err => {
        this.errorMessage = err;
        console.error(err);
      }
  }

  public startSearchUsingLocation(): void {
    this.resultsReady = false;
    this.apiService.getPropertiesUsingLocation(this.currentPage)
      .subscribe(res => {
        this.processResponse(res);
      }),
      err => {
        this.errorMessage = err;
        console.error(err);
      }
  }

  public getFavoriteProperties(): void {
    this.resultsReady = true;
    this.houses = this.userService.getFavoriteDataFromStorage();
    if (this.houses.length === 0) {
      this.noResults = true;
    } else {
      this.numberHouses = this.houses.length;
    }
  }

  public processResponse(res): void {
    this.resultsReady = true;
    this.numberHouses = res.total_results;

    const propertiesFromStorage = this.userService.getDataFromStorage('properties');
    res.listings = res.listings.map(res => this.apiService.toHouse(res, propertiesFromStorage));
    this.houses = [...this.houses, ...res.listings];
    if (this.houses.length === 0) {
      this.noResults = true;
    }
  }

  public openPropertyPage(house): void {
    if (house.id === '') {
      house.id = this.userService.savePropertyAndGetId(house);
    }
    this.router.navigate([`/propertylisting/${house.id}`]);
  }

  public getMoreProperty(): void {
    this.currentPage++;
    this.startSearchUsingText(this.text, this.currentPage);
  }
}
