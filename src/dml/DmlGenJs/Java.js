import {formatDateTime} from '../Utils/ctutil'
import {callDmlMetaObjCmd} from '../DmlGraph/DmlObjs'
import {curOut, getDataTypeName, extStr, getCamelCaseOfUnderlineName, getProtectName, getPublicName, getDesName, gFieldName, replaceAllCRs,
   getTableComments, getFieldComments} from './genutil.js'

//fun(curTable: any, opt: any): string;
export function dmlgen_Java(curTable, opt){
  curOut.clear();


  function DEF_CTMETAFIELD_DATATYPE_NAMES_JAVA(cfType)
  {
    if(cfType.indexOf("cfdt")==0)
        return cfType.substr(4);
    else
        return cfType;
  }
  
  function gFieldType(f)
  {
    if (getDataTypeName(f) == 'cfdtOther')
      return f.DataTypeName;
    else if (getDataTypeName(f) == 'cfdtEnum')
      return getPublicName(gFieldName(f));
    else
      return DEF_CTMETAFIELD_DATATYPE_NAMES_JAVA(getDataTypeName(f));
  }
  
  function addFieldInfo(f)
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
      if (ft == '')
        ft = 'void';
      if (t)
        t2 = '/**\r\n * ' + t + '\r\n */\r\n';
      else
        t2 = '';
      s = t2+ 'public ' + ft + ' ' + getPublicName(s) + '()\r\n'
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
        ft = DEF_CTMETAFIELD_DATATYPE_NAMES_JAVA(tp);
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
      s = t1+'public ' + ft + ' get' + getPublicName(s) + '()\r\n'
        + '{\r\n'
        + '  return ' + getProtectName(s) + ';\r\n'
        + '}\r\n'
        + t2+'public void set' + getPublicName(s) + '(' + ft + ' value)\r\n'
        + '{\r\n'
        + '  this.' + getProtectName(s) + ' = value;\r\n'
        + '}';
    }
  
    s = replaceAllCRs(s, "  ");
    curOut.add('  ' + s);
  }
  
var i,f;
var tb=curTable;
var s = getTableComments(tb);
curOut.add('/**');
curOut.add(' * ###Java Code Generate###');
curOut.add(' * ' + tb.Name);
if (s)
  curOut.add(' * ' + replaceAllCRs(s, ' * '));
curOut.add(' * @author User(EMAIL) ' + formatDateTime());
curOut.add(' * @version 1.0');
curOut.add('');
let desc=callDmlMetaObjCmd(tb,'GetDescribe')+'\n';
curOut.add(desc);
curOut.add('');


s="True";
if(s=="True"){
	curOut.add('SQLMAP:');
	curOut.add('<resultMap id="resMap_' + tb.Name + '"');
	curOut.add('	class="' + tb.Name + '.' + tb.Name + '">');
	for (i=0; i< tb.MetaFields.items.length;i++)
	{
	  f = tb.MetaFields.items[i];
	  curOut.add('	<result property="' + getProtectName(gFieldName(f)) + '" column="' + gFieldName(f).toUpperCase() + '" />');
	}
	curOut.add('</resultMap>');
	curOut.add('<select id="sel_' + tb.Name + '" resultMap="resMap_' + tb.Name + '"><![CDATA[');
	curOut.add('  select t.* from ' + tb.Name + ' t');
	curOut.add(']]></select>');
	curOut.add('');
}
curOut.add('*/');
curOut.add('');

curOut.add('package ' + tb.Name + ';');
curOut.add('');
curOut.add('import java.sql.Date;');
curOut.add('');

s = getTableComments(tb);
if (s)
{
  curOut.add('/** \r\n * ' + replaceAllCRs(s, ' * ') + '\r\n */');
}

var L = 0;
for (i=0;i<tb.MetaFields.items.length;i++)
{
  f = tb.MetaFields.items[i];
  s = getDesName(f.Name, f.DisplayName);
  if (L < s.length)
	L = s.length;
}

var clsName = getPublicName(tb.Name);

curOut.add('public class ' + clsName);
curOut.add('{');

for (i=0;i<tb.MetaFields.items.length;i++)
{
  f = tb.MetaFields.items[i];
  if(getDataTypeName(f) == 'cfdtEnum')
  {
	curOut.add('  public enum ' + getPublicName(gFieldName(f)) + ' {');
	curOut.add('     ' + getPublicName(gFieldName(f)) + '_Unknow = 0,');
	curOut.add('     ' + getPublicName(gFieldName(f)) + '_Value1 = 1,');
	curOut.add('     ' + getPublicName(gFieldName(f)) + '_Value2 = 2');
	curOut.add('  }');
	curOut.add('');
  }
}

for (i=0;i<tb.MetaFields.items.length;i++)
{
  f = tb.MetaFields.items[i];
  if(getDataTypeName(f) != 'cfdtFunction')
  {
	s = getFieldComments(f);
	if (s)
	{
      s = replaceAllCRs(s, "   * ");
	  s = '  /**\r\n   * ' + s + '\r\n   */';
	  curOut.add(s);
	}
	curOut.add('  protected ' + gFieldType(f) + ' ' + getProtectName(gFieldName(f)) + ';');
  }
}
curOut.add('');

curOut.add('  public ' + clsName + '()');
curOut.add('  {');
curOut.add('  }');


curOut.add('');
for (i=0;i<tb.MetaFields.items.length;i++)
{
  f = tb.MetaFields.items[i];
  addFieldInfo(f);
}

curOut.add('');
curOut.add('  public void reset()');
curOut.add('  {');
for (i=0;i<tb.MetaFields.items.length;i++)
{
  f = tb.MetaFields.items[i];
  s = getProtectName(gFieldName(f));
  let v = '';
  var fTp=getDataTypeName(f);
  if(fTp == 'cfdtInteger' || fTp == 'cfdtFloat')
	  curOut.add('    ' + extStr(v + s, L) + ' = 0;');
  else if(fTp == 'cfdtString')
	  curOut.add('    ' + extStr(v + s, L) + ' = null;');
  else if(fTp == 'cfdtDate')
	  curOut.add('    ' + extStr(v + s, L) + ' = null;');
  else if(fTp == 'cfdtEnum')
	  curOut.add('    ' + extStr(v + s, L) + ' = ' + getPublicName(gFieldName(f)) + '_Unknown;');
  else if(fTp == 'cfdtBool')
	  curOut.add('    ' + extStr(v + s, L) + ' = false;');
  else if(fTp == 'cfdtList')
	  curOut.add('    ' + extStr(v + s, L) + '.Clear();');
  else if(fTp == 'cfdtEvent')
	  curOut.add('    ' + extStr(v + s, L) + ' = null;');
  else if(fTp == 'cfdtFunction'){}
  else
	  curOut.add('    ' + extStr(s, L) + ' .reset();');
}
curOut.add('  }');
curOut.add('');


curOut.add('  public void assignFrom(' + clsName + ' AObj)');
curOut.add('  {');
curOut.add('    if(AObj==null)');
curOut.add('    {');
curOut.add('      Reset();');
curOut.add('      return;');
curOut.add('    }');
for (i=0;i<tb.MetaFields.items.length;i++)
{
  f = tb.MetaFields.items[i];
  s = getProtectName(gFieldName(f));
  let v = ''; //RemRootCtField(f.Name);
  fTp = getDataTypeName(f);
  if( fTp == 'cfdtString'|| fTp == 'cfdtInteger' ||fTp == 'cfdtFloat'|| fTp == 'cfdtDate'|| fTp == 'cfdtBool'|| fTp == 'cfdtEnum')
	  curOut.add('    ' + extStr(v + s, L) + ' = AObj.' + s + ';');
  else if( fTp == 'cfdtFunction'|| fTp == 'cfdtEvent'){}
  else
  	curOut.add('    ' + extStr(s, L) + ' .  assignFrom(AObj.' + s + ');');
}
curOut.add('  }');
curOut.add('');


curOut.add('}');
curOut.add(''); 

  return curOut.data.join('\n');
}
