import { Component,Input, OnInit } from '@angular/core';

import { ProjectNodeModel } from '../../models/ProjectNode';
import { ArchitectService } from '../../services/architect.service';

@Component({
  selector: 'app-project-node',
  templateUrl: './project-node.component.html',
  styleUrls: ['./project-node.component.scss']
})

export class ProjectNodeComponent implements OnInit {

  @Input() node: ProjectNodeModel;
  constructor(private architectService: ArchitectService) { }

  ngOnInit(): void {
  }

  public showDirFileContents():void{
    if(this.node.fileContents){
      if(!this.node.fileObj){
        this.architectService.parseModuleFile(this.node.fileContents)
          .subscribe(res => {
            this.node.fileObj = res;
            this.node.displayFileDir = this.node.displayFileDir ? false : true;
          });
      }else{
        this.node.displayFileDir = this.node.displayFileDir ? false : true;
      }
    }else{
      this.node.displayFileDir = this.node.displayFileDir ? false : true;
    }
  }

}
