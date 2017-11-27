
export class Node{
    name:string;
    index:number;
    children:Array<any>=[];
    attr:any={};
    constructor(){};
}
export class TextNode{
    content:string='';
    tagName:string='textNode';
}

export function Parse(html:any){
    let index:number=0;
    const main=new Node();
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
        textNode=new TextNode();
        (renderNodes[renderNodes.length-1]||main).children.push(textNode);
    },
    catchAttr=(value:string)=>{
        let
        abbrev:string,
        val:string,
        v:string,
        isAbbrev:boolean=true,
        valBegin:boolean; //none use!
        value.split(' ').forEach(str=>{
            abbrev=val='';
            isAbbrev=true;
            for(let i=0,len=str.length;i<len;i++){
                v=str[i];
                if(v==='='){
                    isAbbrev=false;
                    valBegin=true;
                    continue;
                }
                if(isAbbrev){
                    abbrev+=v;
                }else{
                    val+=v;
                }
            }
            nowNode.attr[abbrev]=val.slice(1,-1);
        })
    },
    endStartTag=()=>{
        if(name){
            catchAttr(name);
        }
        isTagStart=false;
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
                    name='';
                    catchTag=false;
                    if(v==='>')endStartTag();
                }else if(v==='>'){
                    endStartTag();
                }else{
                    name+=v;
                }
                return true;
            }

        }
    },
    checkInner=(v:string)=>{
        if(isInner&&v!=='<'&&v!=' '&&v!='\n'){
            if(!textNode)createTextNode();
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
    console.log(main)
}
