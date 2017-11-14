import { UserService } from '../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-search',
  templateUrl: './property-search.component.html',

  styleUrls: ['./property-search.component.css']
})

export class PropertySearchComponent implements OnInit {

  public searchText: string = '';
  public lastSearchParams: Array<{searchText, numberResults}>;

  constructor(public userService: UserService, private router: Router) { }

  public ngOnInit(): void {
    this.getLastSearchParams();
  }

  public startNewSearch(text): void {
    this.router.navigate(['/searchresults', {text}]);
  }

  public startSearchUsingLocation(): void {
    this.router.navigate(['/searchresults', {text: 'location'}]);
  }

  public getLastSearchParams(): void {
    this.lastSearchParams = this.userService.getDataFromStorage('lastSearchProperties');
  }
}
