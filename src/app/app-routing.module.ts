import { NgModule } from '@angular/core';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertySearchComponent } from './property-search/property-search.component';
import { SearchResultsComponent } from './search-results/search-results.component';

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


