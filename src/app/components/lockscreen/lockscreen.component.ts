import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { CommonService } from 'fccore2/common/common';
@Component({
  selector: 'lockscreen',
  templateUrl: './lockscreen.component.html',
  styles: [`
  
  `]
})
export class LockscreenComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    let token = CommonService.guid();
    CommonService.event('openDialog',{token:token});
    
    }

}
