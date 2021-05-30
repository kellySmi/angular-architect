import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeOfPipe } from './pipes/typeOf.pipe';
@NgModule({
  declarations: [TypeOfPipe],
  imports: [
    CommonModule
  ],
  exports: [TypeOfPipe]
})
export class CoreModule { }
