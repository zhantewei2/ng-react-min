import {Subject} from 'rxjs/Subject';
import {events} from './onEvents';
const proto:any=HTMLElement.prototype;
//addEventListener
(window as any).zgGLOB={};
let check=new (Subject as any)();
//glob zg check:
(window as any).zgGLOB.check=check;

const addEvent=proto.addEventListener;


proto.addEventListener=function(method:any,cb:any,option:any){
    addEvent.call(this,method,function($event:any){
        cb.call(this,$event);
        check.next();
    })
};



check.subscribe(()=>{
    console.log('render')
});
