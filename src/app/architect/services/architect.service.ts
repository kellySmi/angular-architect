import { Injectable } from '@angular/core';
import { of } from 'rxjs';
//import { Observable } from 'rxjs';
import * as ts from 'typescript';
//import { from } from 'rxjs/operators';
// interface AppDir {
//   name: string;
//   path: string;
//   fileContents? : string;
//   dirContents?: AppDir[];
// }

@Injectable({
  providedIn: 'root'
})
export class ArchitectService {
  //public project$ : Observable<any> = new Observable();
  constructor() { }

  anaylizeProject(appDir: any[] ): any{
    const projectInfo:any  = {projectName:"",rootDir:"", project:{}};
    //console.log("appDir",appDir);
    appDir.forEach(a => {
      // we are at the top level of the project
      // angular.json is all we are interested here
      if(a.name == "angular.json"){
        //process project info
        const angFile = JSON.parse(a.fileContents);
        //console.log(angFile);
        projectInfo['projectName'] = angFile.defaultProject;
        projectInfo['rootDir'] = angFile[angFile.newProjectRoot][angFile.defaultProject]['sourceRoot'];
      }//projectInfo['project'] = {};
      else if(a.name == projectInfo['rootDir']){
        const projSrc = a.dirContents;
        projSrc.forEach(p => {
          if(p.name == 'app'){
            p.dirContents.forEach(app => {
              //console.log('app',app);
              // if(app.name.endsWith('-routing.module.ts')){
              //   projectInfo['project']['routing'] = this.parseModuleFile(app.fileContents);
              //   return;
              // }
              if(app.name.endsWith('.module.ts')){
                projectInfo['project']['appModule'] = this.parseModuleFile(app.fileContents);
                return;
              }
              // if(app.name.endsWith('component.ts')){
              //   projectInfo['project']['components'] = this.parseModuleFile(app.fileContents);
              //   return;
              // }
              // if(app.dirContents){
              //   projectInfo['project']['dirContents'] = app.dirContents.map(d => d);
              //   return;
              // }
            });
          }
        });
      }
    });
    // console.log('projectinfo',projectInfo);
    //this.project$.lift(projectInfo);
    return of(projectInfo); //this.project$;
  }
  private traverseDir(app: any){
    console.log(app);
    const projectInfo = [];
    if(app.name.endsWith('-routing.module.ts')){
      projectInfo.push({routing:this.parseModuleFile(app.fileContents)});
    }
    if(app.name.endsWith('.module.ts')){
      projectInfo.push({module:this.parseModuleFile(app.fileContents)});
    }
    // if(app.name.endsWith('component.ts')){
    //   //projectInfo['project']['components'] = this.parseModuleFile(app.fileContents);
    //   projectInfo.push({component:this.parseModuleFile(app.fileContents)});
    // }
    if(app.dirContents){
      //console.log("dc",app.dirContents);
      projectInfo.push({dirContents : app.dirContents.map(dc => {

        return this.traverseDir(dc);
      })});
    }
    return projectInfo;
  }

  /**
   *
   * @param fileStr
   * @returns observable <any>
   * uses typescript api to get module information.
   *
   */
  public parseModuleFile(fileStr:string):any {
    const rtnObj : any = {name:'', importFiles:[], declarations:[],imports:[]};
    const node = ts.createSourceFile('app.module.ts',fileStr,ts.ScriptTarget.Latest);

    console.log('node',node);
    node.forEachChild(child => {
      console.log(child.kind);
      if (ts.SyntaxKind[child.kind] === 'ImportDeclaration') {
        console.log("imprt-child",child);
        const x = child['importClause'].namedBindings.elements.map(el => el.name.escapedText);
        //console.log('dec',x);
        rtnObj.declarations = rtnObj.declarations.concat(x);
        //console.log('elements',child['importClause'].namedBindings.elements);
      }
      if (ts.SyntaxKind[child.kind] === 'ClassDeclaration') {
        rtnObj.name = child['name'].escapedText;
      }
    });
    return of(rtnObj);
  }



}
