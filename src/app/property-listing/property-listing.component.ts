import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { House } from '../models/house';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-property-listing',
  templateUrl: './property-listing.component.html',
  styleUrls: ['./property-listing.component.css']
})
export class PropertyListingComponent implements OnInit {

  public house: House;

  constructor(public userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router
              ) {}

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.house = this.userService.getPropertyFromSrorage(id);
    });
  }

  public switchFavorite(): void {
    if (!this.house.favorite) {
      this.house.favorite = true;
      this.userService.saveHouseInStorage(this.house);
    } else {
      this.house.favorite = false;
      this.userService.saveHouseInStorage(this.house);
    }
  }
}
