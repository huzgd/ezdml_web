import {formatDateTime} from '../Utils/ctutil'
import {callDmlMetaObjCmd} from '../DmlGraph/DmlObjs'
import {curOut, getDataTypeName, extStr, getCamelCaseOfUnderlineName, getProtectName, getPublicName, getDesName, gFieldName, replaceAllCRs,
   getTableComments, getFieldComments} from './genutil.js'

//fun(curTable: any, opt: any): string;
export function dmlgen_Cpp(curTable, opt){
  curOut.clear();

  var clsName='';

  function DEF_CTMETAFIELD_DATATYPE_NAMES_CPP(cfType)
  {
    const cpp_tps=[
      'Unknown',
      'char *',
      'int',
      'double',
      'Date',
      'bool',
      'enum',
      'Object',
      'Object',
      'List',
      'void',
      'EventClass',
      'class'];
    if(cfType>=0 && cfType<cpp_tps.length)
        return cpp_tps[cfType];
    else
        return 'Unknown';
  }

  function gFieldType(f)
  {
    if (getDataTypeName(f) == 'cfdtOther')
      return f.DataTypeName;
    else if (getDataTypeName(f) == 'cfdtEnum')
      return getPublicName(gFieldName(f)) + 'Enum';
    else
      return DEF_CTMETAFIELD_DATATYPE_NAMES_CPP(f.DataType);
  }


  function addFieldInfo(f,isHeader)
  {
    var s = getDesName(f.Name, f.DisplayName);
    var t = getFieldComments(f);
    if (t)
    {
      t = replaceAllCRs(t, " * ");
    }
  
    var ft="";
    var t1="";
    var t2="";
    var tp=getDataTypeName(f);
    if (tp == 'cfdtFunction')
    {
      ft = f.DataTypeName;
      if (!ft)
        ft = 'void';
      if (t)
        t2 = '/**\r\n * ' + t + '\r\n */\r\n';
      else
        t2 = '';
      if(isHeader)
        s = t2 + ft + ' ' + getPublicName(s) + '();';
      s = t2+ clsName+'::' + ft + ' ' + getPublicName(s) + '()\r\n'
        + '{\r\n'
        + '}';
    }
    else
    {
      if (tp == 'cfdtOther')
        ft = f.DataTypeName
      else if (tp == 'cfdtEnum')
        ft = gFieldType(f)
      else
        ft = DEF_CTMETAFIELD_DATATYPE_NAMES_CPP(f.DataType);
      if (t)
      {
        t1 = '/**\r\n * Get ' + t + '\r\n */\r\n';
        t2 = '/**\r\n * Set ' + t + '\r\n */\r\n';
      }
      else
      {
        t1 = '';
        t2 = '';
      }
      if(isHeader)
        s = t1+'' + ft + ' '+clsName+'::Get' + getPublicName(s) + '();\r\n'
          + t2+'void '+clsName+'::Set' + getPublicName(s) + '(' + ft + ' value);'
      else
      s = t1+'' + ft + ' '+clsName+'::Get' + getPublicName(s) + '()\r\n'
        + '{\r\n'
        + '  return ' + getProtectName(s) + ';\r\n'
        + '}\r\n'
        + t2+'void '+clsName+'::Set' + getPublicName(s) + '(' + ft + ' value)\r\n'
        + '{\r\n'
        + '  this->' + getProtectName(s) + ' = value;\r\n'
        + '}';
    }
  
    if(isHeader)
      s = replaceAllCRs(s, "  ");
    curOut.add('  ' + s);
  }


let I, L;
let S, T, V, FT;
let f, tb;

tb=curTable;

// 获取表注释
S = getTableComments(tb);
curOut.add('/*');
curOut.add('  ###C++ Code Generate###');
curOut.add('  ' + tb.Name);
S = S.replace(/}/g, '%7D');
if (S !== '') {
  curOut.add('  ' + S.replace(/\r\n/g, '\r\n  '));
}
curOut.add('  Create by User(EMail) ' + formatDateTime());
curOut.add('');
let desc=callDmlMetaObjCmd(tb,'GetDescribe')+'\n';
curOut.add(desc);
curOut.add('*/');
curOut.add('');

curOut.add('/******** ' + tb.Name + '.h ********/');
curOut.add('');
curOut.add('#ifndef _INCL_' + tb.Name.toUpperCase() + '_H_');
curOut.add('#define _INCL_' + tb.Name.toUpperCase() + '_H_');
curOut.add('');

S = getTableComments(tb);
if (S !== '') {
  S = S.replace(/}/g, '%7D');
  curOut.add('/* ' + S.replace(/\r\n/g, '\r\n  ') + ' */');
}

curOut.add('');
curOut.add('typedef char * Date;');
curOut.add('typedef char * Object;');
curOut.add('');

L = 0;
for (I = 0; I < tb.MetaFields.items.length; I++) {
  f = tb.MetaFields.items[I];
  S = getDesName(f.Name, f.DisplayName);
  if (L < S.length) {
    L = S.length;
  }
}

clsName = getPublicName(tb.Name);

for (I = 0; I < tb.MetaFields.items.length; I++) {
  f = tb.MetaFields.items[I];
  if (f.DataType === 'cfdtEnum') {
    curOut.add('typedef enum {');
    curOut.add('    ' + getPublicName(gFieldName(f)) + '_Unknown = 0,');
    curOut.add('    ' + getPublicName(gFieldName(f)) + '_Value1,');
    curOut.add('    ' + getPublicName(gFieldName(f)) + '_Value2');
    curOut.add('}' + gFieldType(f) + ';');
    curOut.add('');
  }
}

curOut.add('class ' + clsName);
curOut.add('{');

curOut.add('private:');
curOut.add('protected:');
for (I = 0; I < tb.MetaFields.items.length; I++) {
  f = tb.MetaFields.items[I];
  if (f.DataType !== 'cfdtFunction') {
    curOut.add('    ' + gFieldType(f) + ' ' + getProtectName(gFieldName(f)) + ';');
  }
}
curOut.add('');

curOut.add('public:');
curOut.add('    ' + clsName + '(void);');
curOut.add('    ~' + clsName + '(void);');

curOut.add('');
for (I = 0; I < tb.MetaFields.items.length; I++) {
  f = tb.MetaFields.items[I];
  addFieldInfo(f,true);
}
curOut.add('');
curOut.add('    void Reset();');
curOut.add('    void AssignFrom(' + clsName + ' * AObj);');
curOut.add('};');
curOut.add('');

curOut.add('#endif');
curOut.add('/******** END of ' + tb.Name + '.h ********/');
curOut.add('');
curOut.add('');
curOut.add('/******** ' + tb.Name + '.cpp ********/');
curOut.add('');
curOut.add('#include "stdafx.h"');
curOut.add('#include "' + tb.Name + '.h"');
curOut.add('');

curOut.add(clsName + '::' + clsName + '(void)');
curOut.add('{');
curOut.add('}');
curOut.add('');
curOut.add(clsName + '::~' + clsName + '(void)');
curOut.add('{');
curOut.add('}');
curOut.add('');

for (I = 0; I < tb.MetaFields.items.length; I++) {
  f = tb.MetaFields.items[I];
  addFieldInfo(f,false);
}

curOut.add('');
curOut.add('void ' + clsName + '::Reset()');
curOut.add('{');
for (I = 0; I < tb.MetaFields.items.length; I++) {
  f = tb.MetaFields.items[I];
  S = getProtectName(gFieldName(f));
  V = '';
  let tpName=getDataTypeName(f);
  switch (tpName) {
    case 'cfdtInteger':
    case 'cfdtFloat':
      curOut.add('    ' + extStr(V + S, L) + ' = 0;');
      break;
    case 'cfdtString':
      curOut.add('    ' + extStr(V + S, L) + ' = NULL;');
      break;
    case 'cfdtDate':
      curOut.add('    ' + extStr(V + S, L) + ' = NULL;');
      break;
    case 'cfdtEnum':
      curOut.add('    ' + extStr(V + S, L) + ' = ' + getPublicName(gFieldName(f)) + '_Unknown;');
      break;
    case 'cfdtBool':
      curOut.add('    ' + extStr(V + S, L) + ' = false;');
      break;
    case 'cfdtList':
      curOut.add('    ' + extStr(V + S, L) + '->Clear();');
      break;
    case 'cfdtEvent':
      curOut.add('    ' + extStr(V + S, L) + ' = NULL;');
      break;
    case 'cfdtFunction':
      break;
    default:
      curOut.add('    ' + extStr(S, L) + ' ->Reset();');
  }
}
curOut.add('}');
curOut.add('');

curOut.add('void ' + clsName + '::AssignFrom(' + clsName + ' * AObj)');
curOut.add('{');
curOut.add('    if (AObj == NULL)');
curOut.add('    {');
curOut.add('      Reset();');
curOut.add('      return;');
curOut.add('    }');
for (I = 0; I < tb.MetaFields.items.length; I++) {
  f = tb.MetaFields.items[I];
  S = getProtectName(gFieldName(f));
  V = ''; // RemRootCtField(f.Name);
  let tpName=getDataTypeName(f);
  switch (tpName) {
    case 'cfdtString':
    case 'cfdtInteger':
    case 'cfdtFloat':
    case 'cfdtDate':
    case 'cfdtBool':
    case 'cfdtEnum':
      curOut.add('    ' + extStr(V + S, L) + ' = AObj->' + S + ';');
      break;
    case 'cfdtFunction':
    case 'cfdtEvent':
      break;
    default:
      curOut.add('    ' + extStr(S, L) + ' -> AssignFrom(AObj->' + S + ');');
  }
}
curOut.add('}');
curOut.add('');

  return curOut.data.join('\n');
}
