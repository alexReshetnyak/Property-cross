import { NgModule } from '@angular/core';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertySearchComponent } from './property-search/property-search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { PropertyListingComponent } from './property-listing/property-listing.component';

import { PropertyGuard } from './guards/property-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/propertysearch',
    pathMatch: 'full'
  },
  {
    path: 'propertysearch',
    component: PropertySearchComponent
  },
  {
    path: 'searchresults',
    component: SearchResultsComponent
  },
  {
    path: 'propertylisting',
    component: PropertyListingComponent,
    canActivate: [PropertyGuard]
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}


