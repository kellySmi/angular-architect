import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { ArchitectModule } from '../architect/architect.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule,ArchitectModule,
    NzGridModule]
})
export class HomeModule {}
