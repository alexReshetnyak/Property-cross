import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-search',
  templateUrl: './property-search.component.html',
  styleUrls: ['./property-search.component.css']
})
export class PropertySearchComponent implements OnInit {

  searchText: string = "";
  lastSearchParams:Array<{searchText, numberResults}>;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getLastSearchParams();
  }

  startNewSearch(text){
    this.router.navigate(['/searchresults', {text}]);
  }

  startSearchUsingLocation(){
    this.router.navigate(['/searchresults', {text: 'location'}]);
  }

  getLastSearchParams(){
    this.lastSearchParams = this.userService.getDataFromStorage('lastSearchProperties');
  }
}
