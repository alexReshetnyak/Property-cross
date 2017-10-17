import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';

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
  houses;

  constructor(public apiService: ApiService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      this.text = params['text'];
      this.startSearch(this.text, 1);
    });
  }

  startSearch(text, page){
    this.apiService.getProperty(text, page)
      .subscribe(res => {
        this.numberHouses = res.total_results;
        this.houses = res.listings;
        console.log(this.houses);
      }),
      err => {
        this.errorMessage = err;
        console.error(err);
      }
  }
}
