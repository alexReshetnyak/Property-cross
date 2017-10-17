import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-search',
  templateUrl: './property-search.component.html',
  styleUrls: ['./property-search.component.css']
})
export class PropertySearchComponent implements OnInit {

  searchText: string = "";

  constructor(public userService: ApiService, private router: Router) { }

  ngOnInit() {
  }

  startNewSearch(text){
    console.log(text);
    this.router.navigate(['/searchresults', {'text': text}]);
  }

}
