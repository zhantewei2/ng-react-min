
import {Parse} from '../parseHTML/parse';
import {ComponentParams,ComponentAttr} from './ComponentParams';

export function Component(params:ComponentParams){

    return (target:any)=>{
        const {nodeMsn,varCollection}=Parse(params.template,target);

        const attr:ComponentAttr={
            ng_tagName:params.selector,
            ng_nodeMsn:nodeMsn,
            ng_varColletion:varCollection
        };
        (Object as any).assign(target.prototype,attr);

    }
}