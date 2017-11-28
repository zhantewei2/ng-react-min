export class parseVariable{
    parse:any;
    clear:any;
    constructor(){
        let preValue:any;
        let isVar:boolean;
        let str='';
        this.clear=()=>{
            preValue=str='';
            isVar=false
        };
        this.parse=(v:string,handle?:Function)=>{
            if(v=='{'&&preValue=='{'){
                str='';
                isVar=true;
                return;
            }
            if(isVar&&v=='}'){
                isVar=false;
                handle(str);
                this.clear();
            }
            if(isVar){
                str+=v;
            }
            preValue=v;
        };
    }

}