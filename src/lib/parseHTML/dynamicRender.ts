export function DynamicRender(_com:any,preValue:any){
    let value:any;
    for(let i in _com.ng_varColletion){
        value=_com[i];
        if(value!==preValue[i]){
            _com.ng_varColletion[i]['textNode'].forEach((textNodeMsn:any)=>{
                let str='';
                textNodeMsn.bindVar.forEach((varName:string)=>{

                });
                //_com.ng_nodeCollection[textNodeMsn.name].nodeValue=
            });

            preValue[i]=value;
        }
    }
}