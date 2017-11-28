import './lib/check';
import {Render} from './lib/parseHTML/render';

const container=document.getElementById('root');
(window as any).btn2=(e:any)=>{
    console.log(e,'btn2')
};

container.innerHTML=`
    <span>html</span>
    <div>pagination</div>
    <button class="btn" id="btn"> btn</button>
    <button class="btn" onclick="btn2(event)">btn2</button>                                                                                                                                                                                                                                                                                                                                                                                                
`;
const btn=document.getElementById('btn');
btn.addEventListener('click',()=>{
    console.log('click');
});

Render(`
    <div>html</div>
    <div>
        image{{}}
        <input required class="form-control" type="number" max="5" min="1">
    </div>
`,container);
const readonly=function(n:string):any{
    return (target:any,name:any,descriptor:any)=>{
        console.log(target,name)
    }
};


class Person{
    @readonly('n')name:any;
}
const person=new Person();


