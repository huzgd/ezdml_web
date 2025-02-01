
import { DML_LogicTypeNames} from '../DmlGraph/DmlObjs'

export var curGenLangType="java";

export const curOut={
    data:[], 
    clear:function(){
        curOut.data=[];
    }, 
    add:function(t){
        curOut.data.push(t);
    } 
};

export function getDataTypeName(f){
  if(!f.DataType) return 'cfdtUnknow';
  return 'cfdt'+DML_LogicTypeNames[f.DataType];
}

export function extStr(str, len)
{
  str = str.trim();
  if (str.length <= len)
    for(var i=str.length; i<=len; i++)
      str = str + ' ';
  return str;
}

export function getCamelCaseOfUnderlineName(aName)
{
  if (aName.toUpperCase()==aName)
    return aName;

  var res=aName;
  while (res.indexOf('_')>=0)
  {
    var s = res;
    var po = s.indexOf('_');
      var s1=s.substring(0,po);
      var s2=s.substr(po+1);
    if (s2.length>0)
        s2=s2.charAt(0).toUpperCase()+s2.substr(1);
    res=s1+s2;
  }
  return res;
}

export function getProtectName(aName)
{
  var res = getCamelCaseOfUnderlineName(aName);
  if(res!="")
    res=res.charAt(0).toLowerCase()+res.substr(1);
  return res;
}

export function getPublicName(aName)
{
  var res = getCamelCaseOfUnderlineName(aName);
  if(res!="")
    res=res.charAt(0).toUpperCase()+res.substr(1);
  return res;
}


export function getDesName(p, n)
{
  if (!p)
    return n;
  else
    return p;
}

export function gFieldName(f)
{
  return getDesName(f.Name, f.DisplayName);
}

export function replaceAllCRs(s, ns){
    var t=s;
    t = t.replace(/\r\n/g, "\n");
    t = t.replace(/\r/g, "\n");
    t = t.replace(/\n/g, "\n"+ns);
    return t;
}

export function getTableComments(tb){
  let result = tb.Memo;
  if (result) {
      if (tb.Name && tb.Caption && tb.Name !== tb.Caption && tb.PhysicalName !== tb.Caption) {
          result = tb.Caption + ' ' + result;
      }
  } else if (tb.Name !== tb.Caption && tb.Caption && tb.Caption !== tb.PhysicalName) {
      result = tb.Caption;
  }

  return result;
}

export function getFieldComments(f){
  let T = f.Memo;
  if(!T) T=f.DisplayName;
  else if(f.Name && f.DisplayName && f.Name!=f.DisplayName && T.indexOf(f.DisplayName)!=0)
    T=f.DisplayName+' '+T;
  return T;
}
