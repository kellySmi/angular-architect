import { Pipe, PipeTransform } from '@angular/core';
import * as ts from 'typescript';

@Pipe({
  name: 'readFile'
})
export class ReadFilePipe implements PipeTransform {

  transform(fileStr: string): any {
    const rtnObj : any = {name:'', importFiles:[], declarations:[],imports:[]};
    const node = ts.createSourceFile('app.module.ts',fileStr,ts.ScriptTarget.Latest);
    console.log('node',node);
    node.forEachChild(child => {
      if (ts.SyntaxKind[child.kind] === 'ImportDeclaration') {
        const x = child['importClause'].namedBindings.elements.map(el => el.name.escapedText);
        rtnObj.declarations = rtnObj.declarations.concat(x);
      }
      if (ts.SyntaxKind[child.kind] === 'ClassDeclaration') {
        rtnObj.name = child['name'].escapedText;
      }
    });
    return rtnObj;
  }

}
