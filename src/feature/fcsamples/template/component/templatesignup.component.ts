import { Component} from '@angular/core';
import { ComponentParent } from '../../componentparent';
import { ComponentService } from '../../services/component.service';
@Component({
  selector: 'templatesignup',
  templateUrl: './templatesignup.component.html',
  styles: [`
  .fc-signup-wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 80px;
    background: #EBEFF5;
  }

  .fc-signup-wrap .fc-signup {
    width:100%;
    height:100%;
    padding: 30px;
    background: #ffffff;
    color: #d1d1ff;
    border-radius:10px;
    box-shadow: 0 2px 12px 0 #dfe3eb;
    position:relative;
  }
  .fc-signup-module {
    width: 40%;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -150px;
    margin-left: -20%;
    }
  .fc-signup .fc-signup-title {
    width:100%;
    height:48px;
    line-height:48px;
    text-align:center;
    color:#333;
    margin-bottom:30px;
  }
  .fc-signup .signup-btn{
    width: 100%;
    display: block;
  }
  .fc-signup input{
    border-color:#dadfe6;
  }
  .has-account {
    text-align:right;
  }
  .has-account span {
    font-size:12px;
    color:#9B9EA0;
  }
  .has-account a{
    color:#108ee9;
    font-weight:bold;
  }`]
})
export class TemplatesignupComponent extends ComponentParent {
  constructor(public mainService: ComponentService) {
    super('SYSCOMPONENT', mainService);
  }
}