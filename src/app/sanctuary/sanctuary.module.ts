import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SanctuaryRoutingModule } from './sanctuary-routing.module';
import { SanctuaryListComponent } from './sanctuary-list/sanctuary-list.component';
import { SanctuaryDetailComponent } from './sanctuary-detail/sanctuary-detail.component';

@NgModule({
  declarations: [SanctuaryListComponent, SanctuaryDetailComponent],
  imports: [
    CommonModule,
    SanctuaryRoutingModule
  ],
})
export class SanctuaryModule { }
