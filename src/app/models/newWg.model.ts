import {ICustomAttribute} from './../interfaces/customAttribute.interface';
export class NewWg{
    wgName:string;
    wgExtension:string;
    wgType:string;
    customAttributes:Array<ICustomAttribute>;

    // בנאי שמאפס את הערכים של הקבוצה החדשה
    constructor(){
        this.wgName = null;
        this.wgExtension=null;
        this.wgType = 'default';
        this.customAttributes = []; 
    }
    // איפןס הערכים של הקבוצה החדשה
    resetWg():void{
        this.wgName = null;
        this.wgExtension=null;
        this.wgType = null;
        this.customAttributes = [];         
    }
}

