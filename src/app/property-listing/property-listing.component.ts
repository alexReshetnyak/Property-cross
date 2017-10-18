import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { House } from '../models/house';

@Component({
  selector: 'app-property-listing',
  templateUrl: './property-listing.component.html',
  styleUrls: ['./property-listing.component.css']
})
export class PropertyListingComponent implements OnInit {

  house: House;
  favorite: boolean = false;
  
  constructor(public userService: UserService) {
  }
  
  ngOnInit() {
    this.house = this.userService.currentPropperty;
    if (this.house.favorite) {
      this.favorite = this.house.favorite;
    }else{
      this.house.favorite = false;
      this.favorite = false;
    }
  }

  saveFavorite(){
    if (!this.favorite){
      this.favorite = true;
      this.house.favorite = true;
      this.userService.saveHouseInStorage(this.house);
    }else{
      this.favorite = false;
      this.house.favorite = false;
      this.userService.deleteHouseFromStorage(this.house);
    }
  }

}
