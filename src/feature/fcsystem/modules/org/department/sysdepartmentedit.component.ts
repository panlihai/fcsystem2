import { Component } from '@angular/core';
import { ParentEditComponent } from 'fccomponent2';
@Component({
    selector: 'sysdepartmentedit',
    templateUrl: './sysdepartmentedit.component.html',
    styles: [``]
})
export class SysdepartmenteditComponent extends ParentEditComponent {
    addNew(mainObj: any): boolean {
        // throw new Error("Method not implemented.");
        return true
    }

    getDefaultQuery() {
        
    }
    constructor(){
       super('SYSTEM', 'SYSDEPARTMENT'); 
  
    }
    init(): void {

    }
  
    event(eventName: string, param: any): void {
  
    }


}