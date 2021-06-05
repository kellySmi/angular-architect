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
  private componentList = [];
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
    const rtnObj : any = {name:'', selector: '', template:'', importFiles:[], declarations:[],imports:[]};
    const node = ts.createSourceFile('app.module.ts',fileStr,ts.ScriptTarget.Latest);
    //console.log("node",node);
    let selTxt = node.text.substr(node.text.indexOf("selector:"));
    selTxt = selTxt.substr(0,selTxt.indexOf(","));
    if(selTxt){
      selTxt = selTxt.replace('selector:','').replace(/'/g,'').trim();
      rtnObj.selector = selTxt;
      this.componentList.push(selTxt);
    }
    let tempTxt = node.text.substr(node.text.indexOf("template:"));
    if(tempTxt){
      tempTxt = tempTxt.replace('template:','').replace(/'/g,'');
      rtnObj.template = tempTxt;

    }
    node.forEachChild(child => {
      //console.log("child",child);
      if (ts.SyntaxKind[child.kind] === 'ImportDeclaration') {
        const dec = child['importClause'].namedBindings.elements.map(el => el.name.escapedText);
        rtnObj.declarations = rtnObj.declarations.concat(dec);
      }
      if (ts.SyntaxKind[child.kind] === 'ClassDeclaration') {
        rtnObj.name = child['name'].escapedText;
      }
    });

    return of(rtnObj);
  }

  public parseTemplateFile(fileStr:string):any {
    const rtnObj : any = {components:[]};
    const parser = new DOMParser();
    const tempObj = parser.parseFromString(fileStr, "text/html");
    console.log("comps",this.componentList);
    this.componentList.forEach(cp => {

      const q = tempObj.querySelectorAll(cp);
      if(q.length) rtnObj.components.push(cp);
      console.log("cp q",cp,q);
    });
    //console.log(tempObj.querySelectorAll('app-hours'));
    return of(rtnObj);
  }

  private collectionContains(collection, searchText) {
    for (let i = 0; i < collection.length; i++) {
      if( collection[i].innerText.toLowerCase().indexOf(searchText) > -1 ) {
        return true;
      }
    }
    return false;
  }
}
