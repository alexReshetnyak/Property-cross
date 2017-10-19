import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { House } from '../models/house';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';

@Component({
  selector: 'app-property-listing',
  templateUrl: './property-listing.component.html',
  styleUrls: ['./property-listing.component.css']
})
export class PropertyListingComponent implements OnInit {

  house: House;
  favorite: boolean = false;
  
  constructor(public userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router
              ){}
  
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.house = this.userService.getPropertyFromSrorage(id);
      if (this.house.favorite){
        this.favorite = this.house.favorite;
      }else{
        this.favorite = false;
      }
    });
  }

  saveFavorite(){
    if (!this.favorite){
      this.favorite = true;
      this.house.favorite = true;
      this.userService.saveHouseInStorage(this.house);
    }else{
      this.favorite = false;
      this.house.favorite = false;
      this.userService.saveHouseInStorage(this.house);
    }
  }

}
