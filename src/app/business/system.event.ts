export default class SystemEvent{
    /**
     * 弹窗时间
     */
    static openDialog:string="openDialog";
    static openConfirm:string="openConfirm";
}

export interface FcEvent{
    evnetName:string;
    callback:any;
    process:any;
}