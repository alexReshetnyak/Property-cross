import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { House } from '../models/house';
//import 'rxjs/add/operator/map';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  text: string = "";
  errorMessage: string = "";
  currentPage: number = 1;
  numberHouses: number;
  houses:Array<House> = [];
  resultsReady: boolean = false;
  noResults: boolean = false;
  title:string = "";

  constructor(public apiService: ApiService,
              private activatedRoute: ActivatedRoute,
              public userService: UserService,
              private router: Router
            ){}

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      this.text = params['text'];
      if (this.text === 'favorite'){
        this.getFavoriteProperties();
        this.title = 'Favorite Properties';
      }else if(this.text === 'location'){
        this.startSearchUsingLocation();
        this.title = 'Search Results';
      }else{
        this.startSearch(this.text, 1);
        this.title = 'Search Results';
      }
    });
  }

  startSearch(text, page){
    this.resultsReady = false;
    this.apiService.getProperty(text, page)
      .subscribe(res => {
        let favoriteP = this.userService.getDataFromStorage("favoriteProperties");
        this.resultsReady = true;
        this.numberHouses = res.total_results;
        res.listings = res.listings.map(res => this.apiService.toHouse(res, favoriteP));
        this.houses = [...this.houses, ...res.listings];
        this.userService.saveSearchResult(text, this.numberHouses, page);
        if (this.houses.length === 0) {
          this.noResults = true;
        }
      }),
      err => {
        this.errorMessage = err;
        console.error(err);
      }
  }

  startSearchUsingLocation(){
    this.resultsReady = false;
    this.apiService.getPropertyUsingLocation(this.currentPage)
      .subscribe(res => {
        let favoriteP = this.userService.getDataFromStorage("favoriteProperties");
        this.resultsReady = true;
        this.numberHouses = res.total_results;
        res.listings = res.listings.map(res => this.apiService.toHouse(res, favoriteP));
        this.houses = [...this.houses, ...res.listings];
        if (this.houses.length === 0) {
          this.noResults = true;
        }
      }),
      err => {
        this.errorMessage = err;
        console.error(err);
      }
  }

  getFavoriteProperties(){
    this.resultsReady = true;
    this.houses = this.userService.getDataFromStorage('favoriteProperties');
    if (this.houses.length === 0) {
      this.noResults = true;
    }
    this.numberHouses = this.houses.length;
  }

  openPropertyPage(house){
    this.userService.currentPropperty = Object.assign({}, house);
    this.router.navigate(['/propertylisting']);
  }

  getMoreProperty(){
    this.currentPage++;
    this.startSearch(this.text, this.currentPage);
  }
}
