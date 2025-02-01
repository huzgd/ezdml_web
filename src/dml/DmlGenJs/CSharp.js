import {formatDateTime} from '../Utils/ctutil'
import {callDmlMetaObjCmd} from '../DmlGraph/DmlObjs'
import {curOut, getDataTypeName, extStr, getCamelCaseOfUnderlineName, getProtectName, getPublicName, getDesName, gFieldName, replaceAllCRs,
   getTableComments, getFieldComments} from './genutil.js'

//fun(curTable: any, opt: any): string;
export function dmlgen_CSharp(curTable, opt){
  curOut.clear();

  function DEF_CTMETAFIELD_DATATYPE_NAMES_CSHARP(cfType){
    const c_tps=[
      'unknown',
      'string',
      'int',
      'double',
      'DateTime',
      'bool',
      'enum',
      'var',
      'object',
      'List',
      'function',
      'EventHnadler',
      'type'];
    if(cfType>=0 && cfType<c_tps.length)
        return c_tps[cfType];
    else
        return 'unknown';
  }
  
  function gFieldType(f)
  {
    if (getDataTypeName(f) == 'cfdtOther')
      return f.DataTypeName;
    else if (getDataTypeName(f) == 'cfdtEnum')
      return getPublicName(gFieldName(f)) + 'Enum';
    else
      return DEF_CTMETAFIELD_DATATYPE_NAMES_CSHARP(f.DataType);
  }
  
  function addFieldInfo(f)
  {
    var s = getDesName(f.Name, f.DisplayName);
    var t = getFieldComments(f);
    if (t)
    {
      if(t.indexOf('\n')>=0){
        t = replaceAllCRs(t, " * ");
        t = '/**\r\n * ' + t + '\r\n */\r\n';
      } else
        t = '// '+t+'\r\n';
    }
  
    var ft="";
    var tp=getDataTypeName(f);
    if (tp == 'cfdtFunction')
    {
      ft = f.DataTypeName;
      if (ft == '')
        ft = 'void';
      s = t+ 'public ' + ft + ' ' + getPublicName(s) + '()\r\n'
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
        ft = DEF_CTMETAFIELD_DATATYPE_NAMES_CSHARP(f.DataType);
      s = t+'public ' + ft + '  ' + getPublicName(s) + '\r\n'
        + '{\r\n'
        + '  get { return ' + getProtectName(s) + '; }\r\n'
        + '  set { ' + getProtectName(s) + ' = value; }\r\n'
        + '}';
    }
  
    s = replaceAllCRs(s, "    ");
    curOut.add('    ' + s);
  }
  
var i,f;
var tb=curTable;
var clsName = getPublicName(tb.Name);
var s = getTableComments(tb);
curOut.add('/*');
curOut.add('  ###CSharp Code Generate###');
curOut.add('  ' + tb.Name);
s = s.replace(/}/g, '%7D');
if (s !== '') {
  curOut.add('  ' + s.replace(/\r\n/g, '\r\n  '));
}
curOut.add('  Create by User(EMail) ' + formatDateTime());
curOut.add('');
let desc=callDmlMetaObjCmd(tb,'GetDescribe')+'\n';
curOut.add(desc);
curOut.add('*/');
curOut.add('');

curOut.add('using System;');
curOut.add('using System.Text;');
curOut.add('');
curOut.add('namespace ' + clsName + ';');
curOut.add('{');

var L = 0;
for (i=0;i<tb.MetaFields.items.length;i++)
{
  f = tb.MetaFields.items[i];
  s = getDesName(f.Name, f.DisplayName);
  if (L < s.length)
	L = s.length;
}

for (i=0;i<tb.MetaFields.items.length;i++)
{
  f = tb.MetaFields.items[i];
  if(getDataTypeName(f) == 'cfdtEnum')
  {
	curOut.add('  public enum ' + gFieldType(f) + '{ Unknown, Value1, Value2 }');
	curOut.add('');
  }
}

s = getTableComments(tb);
if (s)
{
  curOut.add('  /** \r\n   * ' + replaceAllCRs(s, '   * ') + '\r\n   */');
}


curOut.add('  public class ' + clsName);
curOut.add('  {');

for (i=0;i<tb.MetaFields.items.length;i++)
{
  f = tb.MetaFields.items[i];
  if(getDataTypeName(f) != 'cfdtFunction')
  {
	s = getFieldComments(f);
	if (s)
	{
    if(s.indexOf('\n')>=0){
      s = replaceAllCRs(s, "     * ");
	    s = '    /**\r\n     * ' + s + '\r\n     */';
    } else 
      s = '    // '+s;
	  curOut.add(s);
	}
	curOut.add('    protected ' + gFieldType(f) + ' ' + getProtectName(gFieldName(f)) + ';');
  }
}
curOut.add('');

curOut.add('    public ' + clsName + '()');
curOut.add('    {');
curOut.add('    }');


curOut.add('');
for (i=0;i<tb.MetaFields.items.length;i++)
{
  f = tb.MetaFields.items[i];
  addFieldInfo(f);
}

curOut.add('');
curOut.add('    public void Reset()');
curOut.add('    {');
for (i=0;i<tb.MetaFields.items.length;i++)
{
  f = tb.MetaFields.items[i];
  s = getProtectName(gFieldName(f));
  let v = '';
  var fTp=getDataTypeName(f);
  if(fTp == 'cfdtInteger' || fTp == 'cfdtFloat')
	  curOut.add('      ' + extStr(v + s, L) + ' = 0;');
  else if(fTp == 'cfdtString')
	  curOut.add('      ' + extStr(v + s, L) + ' = null;');
  else if(fTp == 'cfdtDate')
	  curOut.add('      ' + extStr(v + s, L) + ' = null;');
  else if(fTp == 'cfdtEnum')
	  curOut.add('      ' + extStr(v + s, L) + ' = ' + gFieldType(f) + '.Unknown;');
  else if(fTp == 'cfdtBool')
	  curOut.add('      ' + extStr(v + s, L) + ' = false;');
  else if(fTp == 'cfdtList')
	  curOut.add('      ' + extStr(v + s, L) + '.Clear();');
  else if(fTp == 'cfdtEvent')
	  curOut.add('      ' + extStr(v + s, L) + ' = null;');
  else if(fTp == 'cfdtFunction'){}
  else
	  curOut.add('      ' + extStr(s, L) + ' .reset();');
}
curOut.add('    }');
curOut.add('');


curOut.add('    public void AssignFrom(' + clsName + ' AObj)');
curOut.add('    {');
curOut.add('      if(AObj==null)');
curOut.add('      {');
curOut.add('        Reset();');
curOut.add('        return;');
curOut.add('      }');
for (i=0;i<tb.MetaFields.items.length;i++)
{
  f = tb.MetaFields.items[i];
  s = getProtectName(gFieldName(f));
  let v = ''; //RemRootCtField(f.Name);
  fTp = getDataTypeName(f);
  if( fTp == 'cfdtString'|| fTp == 'cfdtInteger' ||fTp == 'cfdtFloat'|| fTp == 'cfdtDate'|| fTp == 'cfdtBool'|| fTp == 'cfdtEnum')
	  curOut.add('      ' + extStr(v + s, L) + ' = AObj.' + s + ';');
  else if( fTp == 'cfdtFunction'|| fTp == 'cfdtEvent'){}
  else
  	curOut.add('      ' + extStr(s, L) + ' .  AssignFrom(AObj.' + s + ');');
}
curOut.add('    }');
curOut.add('');


curOut.add('  }');
curOut.add(''); 
curOut.add('}');
curOut.add(''); 

  return curOut.data.join('\n');
}
