import {parseVariable} from './variable';

export class Node{
    name:string;
    index:number;
    children:Array<any>=[];
    attr:any={};
    constructor(){};
}
export class TextNode{
    content:string='';
    tagName:string;
    name:string;
    bindVar:Array<string>=[];
    constructor(index:number){
        this.tagName='textNode';
        this.name=this.tagName+index;
    }
}

export function Parse(html:any,component:any){
    let index:number=0;
    const
    main=new Node(),
        //variable:{textNode:,element:}
    varCollection:any={},
    innerVariable=new parseVariable(),
    attrVariable=new parseVariable();


    let
    str='',
    value,
    name='',
    isTagStart:boolean,
    isTagEnd:boolean,
    isInner:boolean,
    catchTag:boolean,
    preValue:string,
    parent:any=main,
    renderNodes:Array<any>=[],
    textNode:TextNode,
    attr_key:string='',
    attr_value:string='',
    attr_isValue:boolean,
    attr_quote:string,
    attr_isRun:boolean,
    nowNode:any;
    const
    createNode=(name:string):Node=>{
        nowNode={
            index:++index,
            name:name+index,
            tagName:name,
            children:[],
            attr:{},
        };
        parent=renderNodes[renderNodes.length-1]||main;
        parent.children.push(nowNode);
        return nowNode;
    },
    createTextNode=()=>{
        textNode=new TextNode(++index);
        (renderNodes[renderNodes.length-1]||main).children.push(textNode);
    },
    catchAttr=(value:string)=>{

        if(preValue=='='&&(value=='\''||value=='\"')){
            attr_quote=value;
            attr_isValue=true;
            attr_value='';
            return;
        }
        if(!attr_isValue){
            if(attr_isRun&&value===' '){
                nowNode.attr[attr_key]=true;
            }
            attr_isRun=value!==' ';
            if(attr_isRun&&value!='='){
                attr_key+=value;
            }
        }
        else{
            if(value==attr_quote){
                nowNode.attr[attr_key]=attr_value;
                attr_key=attr_value='';
                attr_isValue=attr_isRun=false;
            }else{
                attr_value+=value;
            }
        }


    },
    endStartTag=()=>{
        isTagStart=attr_isRun=false;
        isInner=true;
        textNode=null;
    },
    checkTag=(v:string)=>{
        if(v==='<'){
            isTagStart=true;
            isInner=false;
            name='';
            catchTag=true;
            return true;
        }

        if(isTagStart){
            //endTag:
            if(preValue==='<'&&v==='\/'){
                isTagEnd=true;
                isTagStart=false;
                name='';
                return true;
            }else{
                if( (v===' '||v==='>')&&catchTag){
                    if(name==='img'||name==='input'){
                        createNode(name);
                    }else{
                        renderNodes.push(createNode(name));
                    }
                    attr_isRun=catchTag=false;
                    name=attr_key=attr_value='';
                    if(v==='>')endStartTag();
                }else if(v==='>'){
                    endStartTag();
                }else{
                    //catchAttr:
                    catchTag?(name+=v):catchAttr(v);
                }
                return true;
            }

        }
    },
    checkInner=(v:string)=>{
        if(isInner&&v!=='<'&&v!=' '&&v!='\n'){
            if(!textNode)createTextNode();
            innerVariable.parse(v,(name:string)=>{
                if(!varCollection[name])varCollection[name]={
                    textNode:[],
                    element:[]
                };
                const textArr=varCollection[name]['textNode'];
                if(textArr.indexOf(textNode)==-1)textArr.push(textNode);
                if(textNode.bindVar.indexOf(name)==-1) textNode.bindVar.push(name);
            });
            textNode.content+=v;
            return true;
        }
    },
    checkTagEnd=(v:string)=>{
        if(isTagEnd){
            name+=v;
            if(v==='>'){
                renderNodes.pop();
                isTagEnd=false;
                isInner=true;
                textNode=null;
            }
        }
    };

    for(let i=1,len=html.length;i<len;i++){
        value=html[i];
        if(checkTag(value)){
            preValue=value;
            continue;
        }
        if(checkInner(value)){
            preValue=value;
            continue;
        }
        checkTagEnd(value);
        preValue=value;
    }
    return {
        nodeMsn:main,
        varCollection:varCollection
    };
}
