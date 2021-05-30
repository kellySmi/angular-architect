import { Component, Input, OnChanges } from '@angular/core';
import { ProjectNodeModel } from '../models/ProjectNode';
//import { Observable } from 'rxjs';
import { ArchitectService } from '../services/architect.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnChanges {
  @Input() projectFiles: ProjectNodeModel[];
  public projectApp: ProjectNodeModel[];
  public projectInfo: any;
  constructor(private archService: ArchitectService) { }

  ngOnChanges(): void {
    this.analyzeProject();
  }

  private analyzeProject(){
    this.parseProject();
    this.archService.anaylizeProject(this.projectFiles).subscribe(res => this.projectInfo = res);
  }
  private parseProject(){
    this.projectFiles.forEach(pf => {
      if(pf.name == 'app'){
        this.projectApp =  pf.dirContents;
      }
    });
  }
}
