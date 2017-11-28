import {Parse,Node} from './parse';
export function render(obj:Node,parentNode:any){
    let node:any;
    obj.children.forEach(i=>{
        if(i.tagName==='textNode'){
           parentNode.appendChild( document.createTextNode(i.content))
        }else{
            node=document.createElement(i.tagName);
            parentNode.appendChild(node);
            if(i.attr&&Object.keys(i.attr)){
                for(let key in i.attr){
                    node.setAttribute(key,i.attr[key]);
                }
            }
            if(i.children&&i.children.length)render(i,node);
        }
    })
}


export function Render(html:string,containerNode:any){
    const main:Node=Parse(html);
    console.log(main)
    const mainNode=document.createElement('div');
    render(main,mainNode);
    containerNode.appendChild(mainNode);
}