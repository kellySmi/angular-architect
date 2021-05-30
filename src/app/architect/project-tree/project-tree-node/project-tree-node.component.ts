import { Component, Input, OnChanges } from '@angular/core';
//import { Observable } from 'rxjs';
import { ArchitectService } from '../../services/architect.service';

@Component({
  selector: 'app-project-tree-node',
  templateUrl: './project-tree-node.component.html',
  styleUrls: ['./project-tree-node.component.scss']
})
export class ProjectTreeNodeComponent implements OnChanges {
  @Input() node : any;
  public fileInfo: string;
  public fileContent: any;
  constructor(private architectService : ArchitectService) { }

  ngOnChanges() : void{
    if(this.node && this.node.name &&this.node.name.endsWith('component.ts')){
      this.architectService.parseModuleFile(this.node.fileContents)
        .subscribe(res => {
          this.fileContent = res;
          this.fileInfo = "component";
          //console.log("fileContent",this.fileContent);
        });
    }else{
      this.fileInfo = "file";
    }

  }
}
