import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { ProjectComponent } from './project/project.component';
import { ArchitectComponent } from './architect.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectTreeComponent } from './project-tree/project-tree.component';
import { ProjectTreeNodeComponent } from './project-tree/project-tree-node/project-tree-node.component';
import { ProjectBoardModule } from './project-board/project-board.module';



@NgModule({
  declarations: [ArchitectComponent,ProjectComponent, ProjectTreeComponent, ProjectTreeNodeComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    ProjectBoardModule
  ],
  exports: [ArchitectComponent]
})
export class ArchitectModule { }
