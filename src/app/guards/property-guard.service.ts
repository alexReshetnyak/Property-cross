import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';

import { Router } from "@angular/router";
import { UserService } from "../services/user.service";

@Injectable()
export class PropertyGuard implements CanActivate {


  constructor(
    private userService: UserService, 
    private router: Router) { }

  canActivate() {
    let isAvalible = this.userService.getCurrentProperty();
    if(isAvalible) {
        return true;
    }else{
        this.router.navigate(['/propertysearch']);
        return false;
    }
  }
}