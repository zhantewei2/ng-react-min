import {Parse,Node,TextNode} from './parse';
export function render(component:any,parentNode:any):any{
    const nodeCollection:any={};
    const _render=(obj:any,parent:any)=>{
        let node:any;
        obj.children.forEach((i:any)=>{
            if(i.tagName==='textNode'){
                let pjStr:string=i.content;
                if(i.bindVar){
                    let pjName:string;
                    i.bindVar.forEach((varName:string)=>{
                        pjName='{{'+varName+'}}';
                        pjStr=pjStr.replace(new RegExp(pjName,'g'),component[varName]);
                    })
                }
                node=document.createTextNode(pjStr);
            }else{
                node=document.createElement(i.tagName);
                parent.appendChild(node);
                if(i.attr&&Object.keys(i.attr)){
                    for(let key in i.attr){
                        node.setAttribute(key,i.attr[key]);
                    }
                }
                if(i.children&&i.children.length)_render(i,node);
            }
            parent.appendChild(node);
            nodeCollection[i.name]=node;
        });
    };
    _render(component.ng_nodeMsn,parentNode);
    return nodeCollection;
    /*
     Init varCollection params value;

    for(let param in component.ng_varColletion){
        component.ng_varColletion[param]['value']=component[param];
    }
    */
}

