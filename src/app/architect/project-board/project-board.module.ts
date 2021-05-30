import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectBoardComponent } from './project-board.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CanvasBoardComponent } from './canvas-board/canvas-board.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ProjectNodeComponent } from './project-node/project-node.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ProjectBoardComponent, CanvasBoardComponent, ProjectNodeComponent],
  imports: [
    CommonModule,
    SharedModule,
    NzGridModule,
    NzCardModule
  ],
  exports: [ProjectBoardComponent]
})
export class ProjectBoardModule { }
