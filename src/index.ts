import './lib/check';

import {Component} from './lib/component/component';
import {RenderRoot} from './lib/component/render-component';

const container=document.getElementById('root');

@Component({
    selector:'app-root',
    template:`
        <h2 class="align-center">react-ng </h2>
        <button class="btn btn-primary">
            {{name}}
        </button>
        <button id="btn1" class="btn btn-warning">
            {{city}}
        </button>
        <div class="alert alert-success">{{age}}</div>
    `
})
export class mainComponent{
    name:string='ztw';
    age:number=12;
    city:string='shanghai';
    zgDone(){
        console.log('view init!');
        const btn=document.getElementById('btn1');
        btn.addEventListener('click',()=>{
            this.age++;
        })
    }
}

RenderRoot(mainComponent,container);



