/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { ElectronService } from '../core/services/electron/electron.service';
import { ArchitectService } from './services/architect.service';
@Component({
  selector: 'app-architect',
  templateUrl: './architect.component.html',
  styleUrls: ['./architect.component.css']
})
export class ArchitectComponent implements OnInit {
  public loadedProject = false;
  public filesAr: any[];
  constructor(public electron: ElectronService,private archService: ArchitectService){}

  ngOnInit(): void {
    this.checkLoaded();
  }

  public selectProject(){
    from(this.electron.openDialog())
      .subscribe(r => {
        this.filesAr = r.filter(f => f.name == 'src')[0]['dirContents'];
        console.log("Arr",this.filesAr);
        localStorage.setItem('angularProject',JSON.stringify(this.filesAr));
        this.loadedProject = true;
      });
  }

  private checkLoaded(){
    const ls = localStorage.getItem('angularProject');
    if(ls){
      this.filesAr = JSON.parse(ls);
      this.loadedProject = true;
    }

  }

}
