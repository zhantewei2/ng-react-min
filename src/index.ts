import './lib/check';
import {Parse} from './lib/parseHTML/parse';
const container=document.getElementById('root');
(window as any).btn2=(e:any)=>{
    console.log(e,'btn2')
};

container.innerHTML=`
    <span>html</span>
    <div>pagination</div>
    <button id="btn"> btn</button>
    <button onclick="btn2(event)">btn2</button>
`;
const btn=document.getElementById('btn');
btn.addEventListener('click',()=>{
    console.log('click');
});

Parse(`
    <div>html</div>
    <div>
        
    aaa/div>
    <img src="1" alt="2">
    </div>
`)



