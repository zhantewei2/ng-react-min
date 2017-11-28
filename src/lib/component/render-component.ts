import {DynamicRender} from '../parseHTML/dynamicRender';
import {render} from '../parseHTML/render';

export function RenderRoot(Component:any,container:Element){
    const _com=new Component();

    _com.__proto__.ng_nodeCollection=render(_com,container);
    const preValues:any={};
    const catchPreValue=()=>{
        for (let i in _com.ng_varColletion){
            preValues[i]=_com[i];
        }
    };
    catchPreValue();

    (window as any).zgGLOB.check.subscribe(()=>{
        DynamicRender(_com,preValues);
    });
    console.log(_com,preValues);
    _com.zgDone&&_com.zgDone();
}