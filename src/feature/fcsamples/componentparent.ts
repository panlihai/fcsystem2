import { ComponentService } from "./services/component.service";
import { FCEVENT } from "fccomponent2/fc";
export class ComponentParent {
    public fcOption: any;
    public fcCondition: string;
    public pid:string;
    constructor(public appId: string, public mainService: ComponentService) {
        this.fcOption = mainService.fcOption;
        this.fcCondition = '{"APPID":"' + appId + '"}';
        // this.pid = mainService.resId;
    }
    event(event:FCEVENT){
        this.mainService.providers.logService.debug(event);
    }
}