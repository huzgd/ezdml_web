var FieldNameMaxDrawSize=64;
var FieldTypeMaxDrawSize=48;
var TableFieldMaxDrawCount=50;
var CurrentDmlDbEngine='';
var DML_FONTSC=6.6;
var DML_FONTSC_FD=7.4; //字段计算专用
var DML_FONT_EXWIDTH=8;
var DEF_TEXT_CLOB_LEN=99999;
var DEF_DMLLINK_PICK_DIST=4;

const DML_FieldTypeNames = [
  '未知', '主键', '外键', '字符串', '整数', '小整数', '浮点数', '日期',
  '真假', '二进制数据', '对象', '计算字段', '列表', '函数', '事件', '其它'
];

const DML_PhyFieldTypeNames_Ora = [
  '[UNKNOWN]', 'NUMBER', 'NUMBER', 'VARCHAR2', 'NUMBER', 'NUMBER(2)', 'NUMBER', 'DATE',
  'NUMBER(1)', 'BLOB', 'OBJECT', 'CALC', 'LIST', 'FUNCTION', 'EVENT', 'OTHER'
];

const DML_PhyFieldTypeNames_Mysql = [
  '[UNKNOWN]', 'INTEGER', 'INTEGER', 'VARCHAR', 'INTEGER', 'TINYINT', 'DOUBLE', 'DATETIME',
  'BIT', 'BINARY', 'OBJECT', 'CALC', 'LIST', 'FUNCTION', 'EVENT', 'OTHER'
];

const DML_PhyFieldTypeNames_Sqlsvr = [
  '[UNKNOWN]', 'INT', 'INT', 'VARCHAR', 'INT', 'TINYINT', 'NUMERIC', 'DATETIME',
  'BIT', 'BINARY', 'OBJECT', 'CALC', 'LIST', 'FUNCTION', 'EVENT', 'OTHER'
];

const DML_PhyFieldTypeNames_Std = [
  '[UNKNOWN]', 'INTEGER', 'INTEGER', 'VARCHAR', 'INTEGER', 'TINYINT', 'NUMERIC', 'DATETIME',
  'BIT', 'BINARY', 'OBJECT', 'CALC', 'LIST', 'FUNCTION', 'EVENT', 'OTHER'
];

const DML_LogicTypeNames = [
  'UNKNOWN', 'String', 'Integer', 'Float', 'Date', 'Bool', 'Enum', 
  'Blob', 'Object', 'Calculate', 'List', 'Function', 'Event', 'Other'
];


export enum DMLFieldType{  
  cfdtUnknow,
  cfdtString,
  cfdtInteger,
  cfdtFloat,
  cfdtDate,
  cfdtBool,
  cfdtEnum,
  cfdtBlob,
  cfdtObject,
  cfdtCalculate,
  cfdtList,
  cfdtFunction,
  cfdtEvent,
  cfdtOther,
  cfdtOther2,
};             

export enum DmlKeyType{
  cfktNormal,
  cfktId,
  cfktPid,
  cfktRid,
  cfktName,
  cfktCaption,
  cfktComment,
  cfktTypeName,
  cfktOrgId,
  cfktPeriod,
  cfktCreatorId,
  cfktCreatorName,
  cfktCreateDate,
  cfktModifierId,
  cfktModifierName,
  cfktModifyDate,
  cfktVersionNo,
  cfktHistoryId,
  cfktLockStamp,
  cfktInstNo,
  cfktProcID,
  cfktURL,
  cfktDataLevel,
  cfktStatus,
  cfktOrderNo,
  cfktOthers   
}

export enum DmlIndexType{
  cfitNone,
  cfitUnique,
  cfitNormal 
}

export function genGuid() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
}

const cloneMap=(jmap:any)=>{
  let js=JSON.stringify(jmap);
  let res=JSON.parse(js);
  return res;
}

const removeFromList=(ds:any, obj:any)=>{
  for(var idx=ds.length-1;idx>=0;idx--){
    if(ds[idx]==obj){
      ds.splice(idx,1);
      return true;
    }
  }
  return false;
}

const getDmlItemByName=(items:any[], name:any)=>{
  var res=null;
  items.some(item=>{
    if(item.Name==name){
      res=item;
      return true;
    }
  })
  return res as any;
};

export function valEqs(v1:number, v2:number){
    let d=Math.abs(v1-v2);
    if(d<0.000001)
      return true;
    else
      return false;
}

function drawVal(val:number){
  return Math.round(val)+0.5;
}

export function dmLength(str:string){  
  var len = 0;  
  if(!str)
    return 0;
  for (var i=0; i<str.length; i++) {   
   var c = str.charCodeAt(i);   
  //单字节加1   
   if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {   
     len++;   
   }   
   else {   
    len+=2;   
   }   
  }   
  return len;  
} 

export function extractCompStr(str:string, sBegin:string, sEnd:string){
  if(!str || !sBegin)
	  return null;
  var po=str.indexOf(sBegin);
  if(po<0)
	  return "";
  var po2=str.indexOf(sEnd,po+sBegin.length);
  if(po2<0)
	  return "";
  return str.substring(po+sBegin.length,po2);
}

function readIniLned(iniStr:string, prop:string){
  return extractCompStr(iniStr,"\n"+prop+"=","\n");
}
function readIniLned_num(iniStr:string, prop:string, def: number){
  let res=extractCompStr(iniStr,"\n"+prop+"=","\n");
  if(res){
    let v=parseFloat(res);
    if(isNaN(v))
      return def;
    else
      return v;
  }
  else
    return def;
}

function Rgb2CssColor(r:number,g:number,b:number){
  let rgb=(r<<16) | (g<<8) | b;
  let res=rgb.toString(16);
  while(res.length<6){
    res='0'+res;
  }
  return '#'+res;
}

function delphi2CssColor(dCL: number){
  let r=dCL & 0xff;
  let g=(dCL >> 8) & 0xff;
  let b=(dCL >> 16) & 0xff;

  return Rgb2CssColor(r,g,b);
}

function css2DelphiColor(color: string){
  if(color.indexOf('#')==0){
    //#rrggbb
    let r=color.substring(1,3);
    let g=color.substring(3,5);
    let b=color.substring(5,7);
    let s=b+g+r;
    let cl=parseInt(s,16);
    return cl;
  } else {
    return '';
  }
}

function readIniLned_color(iniStr:string, prop:string, def: string){
  let dCL=readIniLned_num(iniStr, prop, -1);
  if(dCL>=0){
    return delphi2CssColor(dCL);
  } else
    return def;
}

function readIniLned_point(iniStr:string, prop:string, pt: DmlPoint){  
  let res=extractCompStr(iniStr,"\n"+prop+"=","\n");
  if(!res)
    return false;
  let po=res.indexOf(',');
  if(po<0)
    return false;
  let s1=res.substring(0,po);
  let s2=res.substring(po+1);
  let vx=parseFloat(s1);
  let vy=parseFloat(s2);
  if(isNaN(vx) || isNaN(vy))
    return false;
  pt.x=vx;
  pt.y=vy;
  return true;
}

export function readIniStr(iniStr:string, prop:string){
  if(!iniStr || !prop)
    return null;
  let s="\n"+iniStr.trim()+"\n";
  s=s.replace(/\r\n/g,"\n");
  let res=extractCompStr(s,"\n"+prop+"=","\n");
  return false;
}

export function rectCrossOrTouchRect(x1:number, y1:number, w1:number, h1:number,
  x2:number, y2:number, w2:number, h2:number){
  if (x1 > x2 + w2 ) return false;
  if (x1 + w1 < x2 ) return false;
  if (y1 + h1 < y2 ) return false;
  if (y1 > y2 + h2 ) return false;
  return true;
}

export function rectCrossOrTouchRect2(x1:number, y1:number, x1b:number, y1b:number,
  x2:number, y2:number, w2:number, h2:number){
  if(x1>x1b){
    let t=x1;
    x1=x1b;
    x1b=t;
  }
  if(y1>y1b){
    let t=y1;
    y1=y1b;
    y1b=t;
  }
  let w1=x1b-x1;
  let h1=y1b-y1;
  if (x1 > x2 + w2 ) return false;
  if (x1 + w1 < x2 ) return false;
  if (y1 + h1 < y2 ) return false;
  if (y1 > y2 + h2 ) return false;
  return true;
}

function calAttPos(a1:number, a2:number, b1:number, b2:number, edge:number, def:number, LnkIdx1:number, LnkIdx2:number) {
  let t, da, db, edist, idxDist1, idxDist2;
  let Result = def;

  idxDist1 = LnkIdx1 * 8;
  idxDist2 = LnkIdx2 * 8;

  if (a1 > a2) {
    t = a1;
    a1 = a2;
    a2 = t;
  }
  da = a2 - a1;

  if (b1 > b2) {
    t = b1;
    b1 = b2;
    b2 = t;
  }
  db = b2 - b1;

  if (edge < 2) {
    edge = 2;
  }

  if (da < edge * 2.0) {
    Result = a1 + da / 2.0 + idxDist1;
    return Result;
  }

  a1 = a1 + edge;
  a2 = a2 - edge;

  if (db < edge * 2.0) {
    b1 = b1 + db / 2.0;
    b2 = b1;
  } else {
    b1 = b1 + edge;
    b2 = b2 - edge;
  }

  da = a2 - a1;
  db = b2 - b1;

  if ((b1 <= a1) && (a2 <= b2)) {
    Result = a1 + da / 2.0 + idxDist1;
    return Result;
  }

  if ((a1 <= b1) && (b2 <= a2)) {
    Result = b1 + db / 2.0 + idxDist2;
    return Result;
  }

  if ((b1 <= a1) && (a1 <= b2) && (b2 <= a2)) {
    Result = a1 + (b2 - a1) / 2.0;
    return Result;
  }

  if ((a1 <= b1) && (b1 <= a2) && (a2 <= b2)) {
    Result = b1 + (a2 - b1) / 2.0;
    return Result;
  }

  edist = da / 2 - 8;

  if (a2 < b1) {
    if (LnkIdx1 * 8 < edist) {
      Result = a2 - LnkIdx1 * 8;
    } else {
      Result = a2 - edist;
    }

    return Result;
  }

  if (b2 < a1) {
    if (LnkIdx1 * 8 < edist) {
      Result = a1 + LnkIdx1 * 8;
    } else {
      Result = a1 + edist;
    }

    return Result;
  }

  return Result;
}


function GetDMLFieldPhyTypeName(dbe:string, fieldType:DMLFieldType, fieldLen:number){
  let res;
  if (dbe == 'ORACLE')
    res = DML_PhyFieldTypeNames_Ora[fieldType]
  else if (dbe == 'MYSQL')
    res = DML_PhyFieldTypeNames_Mysql[fieldType]
  else if (dbe == 'SQLSERVER')
    res = DML_PhyFieldTypeNames_Sqlsvr[fieldType]
  else
    res = DML_PhyFieldTypeNames_Std[fieldType];
  return res;
}

function Proc_CheckCustDataTypeReplaces(s:string){
  return s;
}

function Proc_CheckStringMaxLen(dbType: string, fieldTypeName: string, oldRes: string, fieldLen:number) {
  return null;
}

export class DmlPoint{
    public x: number=0;
    public y: number=0;
    constructor(x:number=0, y:number=0){
        this.x=x;
        this.y=y;
    }
    public assign(p:DmlPoint){
      this.x=p.x;
      this.y=p.y;
    }
}

function moveDmlPoint(p:DmlPoint, dx:number, dy:number){
  p.x=p.x+dx;
  p.y=p.y+dy;
}

export class DmlDrawer{
  protected canvas: HTMLCanvasElement;
  public cvsContext: CanvasRenderingContext2D;

  public iconImage:HTMLImageElement|null=null;
  
  protected _viewLeftX: number=0;
  protected _viewTopY: number=0;
  protected _viewScale: number=1;
  
  public boundsLeft: number=0;
  public boundsTop: number=0;
  public boundsRight: number=400;
  public boundsBottom: number=300;
  public boundsWidth: number=400;
  public boundsHeight: number=300;

  protected _contentWidth: number=2000;
  protected _contentHeight: number=1600;
  protected _canvasWidth: number=1000;
  protected _canvasHeight: number=800;

  public defFontSize:number = 1;
  public textFontSize: number = 1;
  public defTextColor: string = 'black';
  public grayTextColor: string = 'gray';
  public selectedColor: string = '';
  public selectedForeColor: string = '';    
  public workAreaColor: string='';
  public defaultObjectColor: string=''; 
  public defaultTitleColor: string='';
  public defaultPKColor: string='';
  public defaultFKColor: string=''; 
  public defaultBorderColor: string=''; 
  public defaultLineColor: string='';
  public defaultGroupEdgeColor: string=''; 

  public modelData: any={};
  public dmlObjList: DmlObj[]=[];
  public dmlTables = {};
  public selectionList: DmlObj[]=[];

  public _showPhyFieldName: number=2;
  private modifyCounter: number=0;
  public dataLoading: boolean=true;
  public onEmitEvents=[];

  constructor(elem: HTMLCanvasElement){
    if(!elem)
      throw new Error('HTMLCanvasElement not assigned');
    let canvas = elem;
    let context = canvas.getContext("2d");
    if(!context)
      throw new Error('Canvas 2d Context not found');

    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 1;

    this.canvas = canvas;
    this.cvsContext = context;

    this.reinit();
  }
    
  public get viewLeftX(){
    return this._viewLeftX;
  }  
  public set viewLeftX(value: number){
    this._viewLeftX=value;
  }

  public get viewTopY(){
    return this._viewTopY;
  }  
  public set viewTopY(value: number){
    this._viewTopY=value;
  }
  
  public get viewCenterX(){
    let x=this.canvasWidth/2;
    return x/this._viewScale + this._viewLeftX;
  }  
  public set viewCenterX(value: number){
    this._viewLeftX=value-this.canvasWidth/2/this._viewScale;
  }

  public get viewCenterY(){
    let y=this.canvasHeight/2;
    return y/this._viewScale + this._viewTopY;
  }  
  public set viewCenterY(value: number){
    this._viewTopY=value-this.canvasHeight/2/this._viewScale;
  }
  
  public get viewScale(){
    return this._viewScale;
  }  
  public set viewScale(value: number){
    this._viewScale=value;
  }

  public get contentWidth()
  {
    return this._contentWidth;
  }
  public set contentWidth(value: number)
  {
    this._contentWidth = value;
  }
  public get contentHeight()
  {
    return this._contentHeight;
  }
  public set contentHeight(value: number)
  {
    this._contentHeight = value;
  }
  public get canvasWidth()
  {
    return this._canvasWidth;
  }
  public set canvasWidth(value: number)
  {
    this._canvasWidth = value;
  }
  public get canvasHeight()
  {
    return this._canvasHeight;
  }
  public set canvasHeight(value: number)
  {
    this._canvasHeight = value;
  }
  public get showPhyFieldName(){
    return this._showPhyFieldName;
  }
  public set showPhyFieldName(value:number){
    this._showPhyFieldName=value;
  }
  public get textVisible(){
    if(this.textFontSize<=3)
      return false;
    else
      return true;
  }
  
  protected reinit(){
    this._viewLeftX=0;
    this._viewTopY=0;
    this._viewScale=1;
    this._contentWidth  = 2000;
    this._contentHeight = 1600;
    this._canvasWidth  = 1000;
    this._canvasHeight = 800;
    
    this.defFontSize = 12;
    this.textFontSize = 12;
    this.selectedColor = 'blue'; 
    this.selectedForeColor = 'white'; 
    this.workAreaColor = 'white';
    this.defaultObjectColor = Rgb2CssColor(242, 242, 242);
    this.defaultPKColor = 'fuchsia';
    this.defaultFKColor = 'blue';
    this.defaultTitleColor = 'red';
    this.defaultBorderColor = 'silver';
    this.defaultLineColor = 'blue';
    this.defaultGroupEdgeColor = 'maroon';

    this._showPhyFieldName=2;
  }

  public emitEvent(evt: string, par1:any, par2:any){
    this.onEmitEvents.forEach(fun=>{
      var fevt=fun as any;
      fevt(evt,par1,par2);
    })
  }

  public objInVision(obj: DmlObj, bCheckCenter:boolean=false){
    if(bCheckCenter){
      let cx=obj.left+obj.width/2;
      let cy=obj.top+obj.height/2;
      return this.rectInVision(cx-1,cy-1,cx+1,cy+1);
    } else
      return obj.rectTouchObj(this.boundsLeft, this.boundsTop, this.boundsWidth, this.boundsHeight)
  }

  public rectInVision(x:number, y:number, w:number, h:number){
    return rectCrossOrTouchRect(this.boundsLeft, this.boundsTop, this.boundsWidth, this.boundsHeight, x, y, w, h);
  }

  public contentToCanvasD(d:number){
    return Math.round(d*this._viewScale);
  }

  public contentToCanvasX(x:number){
    if(valEqs(this._viewScale, 1)){
      return Math.round(x-this._viewLeftX);
    } else {
      return Math.round((x-this._viewLeftX)*this._viewScale);
    }
  }

  public contentToCanvasY(y:number){
    if(valEqs(this._viewScale, 1)){
      return Math.round(y-this._viewTopY);
    } else {
      return Math.round((y-this._viewTopY)*this._viewScale);
    }
  }

  public getX(x:number){
    if(this._viewScale==1 || valEqs(this._viewScale, 1)){
      return Math.round(x-this._viewLeftX)+0.5;
    } else {
      return Math.round((x-this._viewLeftX)*this._viewScale)+0.5;
    }
  }
  
  public getY(y:number){
    if(this._viewScale==1 || valEqs(this._viewScale, 1)){
      return Math.round(y-this._viewTopY)+0.5;
    } else {
      return Math.round((y-this._viewTopY)*this._viewScale)+0.5;
    }
  }

  public canvasToContentD(d:number){
    return d/this._viewScale;
  }

  public canvasToContentX(x:number){
    return x/this._viewScale + this._viewLeftX;
  }

  public canvasToContentY(y:number){
    return y/this._viewScale + this._viewTopY;
  }

  public redraw(){
    this.boundsLeft=this.canvasToContentX(0);
    this.boundsTop=this.canvasToContentY(0);
    this.boundsRight=this.canvasToContentX(this.canvasWidth);
    this.boundsBottom=this.canvasToContentY(this.canvasHeight);
    this.boundsWidth=this.boundsRight-this.boundsLeft;
    this.boundsHeight=this.boundsBottom-this.boundsTop;
    
    let ctx=this.cvsContext;
    this.textFontSize=this.defFontSize*this._viewScale;
    if(this.textFontSize<2){
      this.textFontSize=0;
    } else {
      ctx.font=this.textFontSize+"px Verdana";      
    }
    
    ctx.strokeStyle='#dfdfdf';
    this.drawWorkAreaEdge();

    var ds=this.dmlObjList;
    for(var j=2;j>=0;j--)
    {
      for(var k=ds.length-1;k>=0;k--){
        let obj=ds[k];
        if(obj.drawOnBackground==j)
        {
          obj.paintTo(this);
        }
      };
    }

    ds.forEach(obj=>{
      if(obj.selected)
      {
        obj.drawSelectedGrips(this);
      }
    });
  }

  public drawWorkAreaEdge(){
    let x1=this.getX(0), y1=this.getY(0),x2=this.getX(this.contentWidth),y2=this.getY(this.contentHeight);
    this.drawVHLine(x1,y1,x2,y1);
    this.drawVHLine(x1,y1,x1,y2);
    this.drawVHLine(x2,y1,x2,y2);
    this.drawVHLine(x1,y2,x2,y2);
  }

  public drawVHLine(x1:number,y1:number,x2:number,y2:number){
    if(!rectCrossOrTouchRect2(x1,y1,x2,y2,0,0,this.canvasWidth,this.canvasHeight))
      return;
    if(x1>x2){
      let t=x1;
      x1=x2;
      x2=t;
    }
    if(y1>y2){
      let t=y1;
      y1=y2;
      y2=t;
    }
    if(x1<-1) x1=-1;
    if(x2>this.canvasWidth+1)
      x2=this.canvasWidth+1;
    if(y1<-1) y1=-1;
    if(y2>this.canvasHeight+1)
      y2=this.canvasHeight+1;
    
    let ctx=this.cvsContext;
    ctx.beginPath();
    ctx.moveTo(drawVal(x1),drawVal(y1));
    ctx.lineTo(drawVal(x2),drawVal(y2));
    ctx.stroke();
  }

  public drawIcon(icoIdx:number, x:number, y:number){
    if(!this.iconImage)
      return;
    let sx=0, sy=icoIdx*16, sw=16, sh=16;
    if(valEqs(this.viewScale,1)){
      let dx=drawVal(x);
      let dy=drawVal(y);
      this.cvsContext.drawImage(this.iconImage,sx-0.5,sy-0.5,sw,sh,dx,dy,sw,sh);
      return;
    }
    let dw=sw*this.viewScale, dh=sh*this.viewScale;
    this.cvsContext.drawImage(this.iconImage,sx-0.5,sy-0.5,sw,sh,drawVal(x),drawVal(y),dw,dh);
  }
  

  public findItemAt(x:number, y:number){
    var ds=this.dmlObjList;
    var res=null;
    for(var j=2;j>=0;j--)
    {
      ds.some(obj=>{
        if(obj.drawOnBackground==j)
        {
          if(obj.pointInObj(x,y)){
            res=obj;
            return true;
          }
        }
      });
    }
    return res;
  }

  public getObjByName(name: string){
    var ds=this.dmlObjList;
    var res=null;
    ds.some(obj=>{
      if(obj.name==name)
      {
        res=obj;
        return true;
      }
    });
    return res;
  }

  public getTableByName(name: string){
    let tbs=this.dmlTables as any;
    let res=tbs[name];
    if(!res)
      return null;
    else
      return res as DmlTableObj;
  }

  public getObjByGuid(guid: string){
    var ds=this.dmlObjList;
    var res=null;
    ds.some(obj=>{
      if(obj.guid==guid)
      {
        res=obj;
        return true;
      }
    });
    return res;
  }

  protected doSelectObj(){
    let mt=null;
    if(this.selectionList.length>0)
      mt=this.selectionList[0].metaData;
    this.emitEvent('selectObj', this.selectionList.length, mt);
  }

  public selectAll(){
    var res=false;
    this.dmlObjList.forEach(obj=>{
        if(!obj.selected){
          this.addToSelection(obj);
          res=true;
        }
      }
    );
    if(res)
      this.doSelectObj();
  }

  public selectByRect(x1:number, y1:number, x2:number, y2:number){
    if(x1>x2){
      let t=x1;
      x1=x2;
      x2=t;
    }
    if(y1>y2){
      let t=y1;
      y1=y2;
      y2=t;
    }
    let w=x2-x1;
    let h=y2-y1;
    var res=false;
    this.dmlObjList.forEach(obj=>{
      if(obj.rectTouchObj(x1,y1,w,h)){
        if(!obj.selected){
          this.addToSelection(obj);
          res=true;
        }
      } else if(obj.selected){
        this.removeFromSelection(obj);
        res=true;
      }
    });
    if(res)
      this.doSelectObj();
  }

  public selectionCount(){
    return this.selectionList.length;
  }

  public selectedTableCount(){
    let res=0;
    this.selectionList.forEach(obj=>{
      if(obj instanceof DmlEntityObj)
      {
        res++;
      }
    });
    return res;
  }

  public selectedTableMetaList(){
    let res:any=[];
    this.selectionList.forEach(obj=>{
      if(obj instanceof DmlEntityObj)
      {
        res.push(obj.metaData);
      }
    });
    return res;
  }

  public selectedTableColor(){
    let res='';
    this.selectionList.some(obj=>{
      if(obj instanceof DmlEntityObj)
      {
        res=obj.fillColor;
      }
    });
    return res;
  }

  public setSelectedTableColor(color: string){
    let rc=0;
    this.selectionList.some(obj=>{
      if(obj instanceof DmlEntityObj)
      {
        obj.fillColor=color;
        if(!color){
          if(obj.metaData.BgColor)
            delete(obj.metaData.BgColor);
        }
        else{
          obj.metaData.BgColor=css2DelphiColor(color);
          this.emitEvent('tableColorChanged', obj.metaData, obj.metaData.BgColor);
        }
        rc++;
      }
    });
    return rc;
  }

  public selectedTable():DmlEntityObj|null{
    let res=null;
    this.selectionList.some(obj=>{
      if(obj instanceof DmlEntityObj)
      {
        res=obj;
        return true;
      }
    });
    return res;
  }
  
  public selectedLink():DmlLinkObj|null{
    let res=null;
    this.selectionList.some(obj=>{
      if(obj instanceof DmlLinkObj)
      {
        res=obj;
        return true;
      }
    });
    return res;
  }

  public clearSelection(){
    var res=false;
    this.dmlObjList.forEach(obj=>{
        if(obj.selected){
          obj.selected=false;
          res=true;
        }
      }
    )
    this.selectionList.length=0;
    if(res)
      this.doSelectObj();
    return res;
  }

  public addToSelection(obj: DmlObj){
    obj.selected=true;
    if(!this.selectionList.some(sel=>sel==obj))
      this.selectionList.push(obj);
  }

  public removeFromSelection(obj: DmlObj){
    obj.selected=false;
    removeFromList(this.selectionList,obj);
  }

  public moveSelection(dx:number, dy:number){
    if(dx==0 && dy==0)
      return;
    let wx=this.contentWidth;
    let wy=this.contentHeight;
    this.dmlObjList.forEach(obj=>{
        if(obj.selected){
          if(obj instanceof DmlLinkObj){
            (obj as DmlLinkObj).doMove(dx, dy);
          } else {
            obj.left=obj.left+dx;
            obj.top=obj.top+dy;
            obj.checkMoved(dx, dy);
            obj.setModified();
            if(wx<obj.right+20)
              wx=obj.right+20;
            if(wy<obj.bottom+80)
              wy=obj.bottom+80;
          }
        }
      }
    )
    this.contentWidth=wx;
    this.contentHeight=wy;
  }

  public removeObj(obj: DmlObj){
    if(obj.selected)
      this.removeFromSelection(obj);
    removeFromList(this.dmlObjList, obj);
    if(obj instanceof DmlTableObj){
      let pName=obj.name;
      var tbMap=this.dmlTables as any;
      delete tbMap[pName];
    }
  }

  public deleteSelectedObjs(){
    var res=0;
    var sels=[] as DmlObj[];
    this.selectionList.forEach(obj=>sels.push(obj));
    sels.forEach(obj=>{
      if(obj instanceof DmlLinkObj){
        let lnk=obj as DmlLinkObj;
        if (!lnk.obj2.selected){
          this.deleteLink(lnk);
          res++;
        } else {
          this.removeObj(lnk);
          res++;
        }
      }
    });
    
    sels.forEach(obj=>{
      if(obj instanceof DmlEntityObj){
        let ent=obj as DmlEntityObj;
        this.deleteEntity(ent);
        res++;

      }
    });

    return res;
  }

  public deleteEntity(ent: DmlEntityObj){
    ent.links.forEach(lnk=>{
      this.removeObj(lnk);
    });
    let mTb=ent.metaData;
    this.removeObj(ent);
    let tbs=this.modelData.Tables.items;
    if(removeFromList(tbs,mTb))
      this.emitEvent('tableDeleted',mTb,null);
  }
  
  public deleteLink(lnk:DmlLinkObj){
    if(lnk.selected)
      this.removeFromSelection(lnk);
    let ent1=lnk.obj2 as DmlEntityObj;
    let ent2=lnk.obj2 as DmlEntityObj;
    
    removeFromList(ent1.links, lnk);
    removeFromList(ent2.links, lnk);

    if(! (ent2 instanceof DmlTableObj))
      return;

    let tb=ent2 as DmlTableObj;
    let fd=tb.fieldByName(lnk.obj2Field);
    if(!fd) return;
    this.removeObj(lnk);

    let mTb=tb.metaData;
    let mMetaFd=getDmlItemByName(mTb.MetaFields.items,lnk.obj2Field);
    if(!mMetaFd) return;
    if(mMetaFd.RelateTable || mMetaFd.RelateField){
      let oldTbCopy=cloneMap(mTb);
      if(mMetaFd.RelateTable)
        delete mMetaFd.RelateTable;
      if(mMetaFd.RelateField)
        delete mMetaFd.RelateField;
      if(mMetaFd.GraphDesc)
        delete mMetaFd.GraphDesc;
      if(mMetaFd.KeyFieldType==3)
        delete mMetaFd.KeyFieldType;
      this.emitEvent('tableChanged',mTb,oldTbCopy);
    }
  }

  public getNewMetaLinkInfo():any{
    if(this.selectionCount()!=2)
      return null;
    let obj1=this.selectionList[0];
    let obj2=this.selectionList[1];
    if(! (obj1 instanceof DmlEntityObj))
      return null;
    if(! (obj2 instanceof DmlTableObj))
      return null;
    let mid='', sid='';
    let fds=obj1.metaData.MetaFields.items as any[];
    fds.some(fd=>{
      if(fd.KeyFieldType==1){
        mid=fd.Name;
        return true;
      }
    });

    obj2.fields.some(field=>{
      if(field.fieldFocusMode==3){
        sid=field.name;
        return true;
      }
    });

    return {
      DmlLinkGuid: '',
      Title: 'Link '+obj1.metaData.Name+' - '+obj2.metaData.Name,
      MasterMetaTable:obj1.metaData,
      SlaveMetaTable:obj2.metaData,
      "MasterField": mid,
      "SlaveField": sid,
      "CreateNewField": false,
      "NewSlaveField": '',
      "LinkType": 1
    };
  }

  public createDmlObjFromMeta(meta:any){
    let obj;
    if(meta.TypeName=='GROUP')
      obj=new DmlGroupBox();
    else if(meta.TypeName=='TEXT')
      obj=new DmlTextObj();
    else
      obj=new DmlTableObj();
    obj.loadFromMeta(meta);
    return obj;
  }

  public addMetaTable(meta:any){
    var obj=this.createDmlObjFromMeta(meta);
    obj.checkResize();
    obj.owner=this;
    this.modelData.Tables.items.push(meta);
    this.dmlObjList.push(obj);
    var tbMap=this.dmlTables as any;
    if(obj instanceof DmlEntityObj)
      tbMap[obj.name]=obj;
    return obj;
  }

  public addMetaLink(linkInfo:any){
    var mtb1=linkInfo.MasterMetaTable;
    var mtb2=linkInfo.SlaveMetaTable;
    var tb1=this.getTableByName(mtb1.Name);
    var tb2=this.getTableByName(mtb2.Name);
    if(!tb1)
      return null;
    if(!tb2)
      return null;
    var fdName=linkInfo.CreateNewField?linkInfo.NewSlaveField:linkInfo.SlaveField;
    var f=tb2.fieldByName(fdName);
    if(!f)
      return null;
    var fd=f as DmlField;
    var metaF=fd.metaData;
    metaF.RelateTable=mtb1.Name;
    if(linkInfo.LinkType==1 || linkInfo.LinkType==2){
      metaF.RelateField=linkInfo.MasterField;
      if(metaF.KeyFieldType!=1)
        metaF.KeyFieldType=3;
    }
    else if(linkInfo.LinkType==3)
      metaF.RelateField='{Link:Direct}';
    else if(linkInfo.LinkType==4)
      metaF.RelateField='{Link:OppDirect}';
    else
      metaF.RelateField='{Link:Line}';
    

    fd.relateTable=metaF.RelateTable;
    fd.relateField=metaF.RelateField;
    fd.extraKeyType=metaF.KeyFieldType;

    var o=new DmlLinkObj();
    o.obj1=tb1;
    o.obj2=tb2;
    if(fd.isFK()){
      if(fd.isUnique()){
        o.linkType=DmlLinkType.dmllFKUnique;
      } else {
        o.linkType=DmlLinkType.dmllFKNormal;
      }
    } else {
      if(fd.relateField=='{Link:Direct}'){
        o.linkType=DmlLinkType.dmllDirect;
      } else if(fd.relateField=='{Link:OppDirect}'){
        o.linkType=DmlLinkType.dmllOppDirect;
      } else {
        o.linkType=DmlLinkType.dmllLine;
      }
    }
    o.obj1Field = fd.relateField;
    o.obj2Field = fd.name;
    o.graphDesc = fd.graphDesc;

    this.dmlObjList.push(o);
    o.owner=this;
    tb1.links.push(o);
    if(tb1!=tb2)
      tb2.links.push(o);
    o.checkPosition();
    return o;
  }

  public modifyMetaLink(linkInfo:any){
    let oL=this.getObjByGuid(linkInfo.DmlLinkGuid);
    if(!oL) return null;
    let oLnk=oL as DmlLinkObj;
    if(linkInfo.CreateNewField || oLnk.obj2Field != linkInfo.SlaveField){
      this.deleteLink(oLnk);
      return this.addMetaLink(linkInfo);
    }

    oLnk.obj1Field=linkInfo.MasterField;
    
    let tb=oLnk.obj2 as DmlTableObj;
    let f=tb.fieldByName(oLnk.obj2Field);
    if(!f)
      return null;
    var fd=f as DmlField;
    var metaF=fd.metaData;
    if(linkInfo.LinkType==1 || linkInfo.LinkType==2){
      metaF.RelateField=linkInfo.MasterField;
      if(metaF.KeyFieldType!=1)
        metaF.KeyFieldType=3;
    }
    else{
      if(metaF.KeyFieldType==3)
        metaF.KeyFieldType=0;
      if(linkInfo.LinkType==3)
        metaF.RelateField='{Link:Direct}';
      else if(linkInfo.LinkType==4)
        metaF.RelateField='{Link:OppDirect}';
      else
        metaF.RelateField='{Link:Line}';
    }
    

    fd.relateTable=metaF.RelateTable;
    fd.relateField=metaF.RelateField;
    fd.extraKeyType=metaF.KeyFieldType;

    if(fd.isFK()){
      if(fd.isUnique()){
        oLnk.linkType=DmlLinkType.dmllFKUnique;
      } else {
        oLnk.linkType=DmlLinkType.dmllFKNormal;
      }
    } else {
      if(fd.relateField=='{Link:Direct}'){
        oLnk.linkType=DmlLinkType.dmllDirect;
      } else if(fd.relateField=='{Link:OppDirect}'){
        oLnk.linkType=DmlLinkType.dmllOppDirect;
      } else {
        oLnk.linkType=DmlLinkType.dmllLine;
      }
    }
    oLnk.obj1Field = fd.relateField;
    oLnk.obj2Field = fd.name;

    return oLnk;
  }

  public findSpaceForObj(obj: DmlEntityObj){
    let dw=obj.width/4;
    let dh=obj.height/4;
    let orgLeft=obj.left;
    while(true){
      let cx=obj.left+obj.width/2;
      let cy=obj.top+obj.height/2;
      if(this.dmlObjList.some(o=>{
        if(o instanceof DmlEntityObj && o.drawOnBackground==0){
          if(o!=obj){
            if(o.rectTouchObj(cx-dw,cy-dh,dw+dw,dh+dh)){
              return true;
            }
          }
        }
      })){
        obj.left=obj.left+100;
        if(obj.right>=this.contentWidth){
          obj.left=orgLeft-obj.width-100;
          obj.top=obj.top+100;
        }
        dw=obj.width/2+20;
        dh=obj.height/2+20;
      } else {
        break;
      }
    }
  }
  
  public loadDmlModel(modelData: any){
    this.dataLoading=true;
    this.modelData=modelData;
    var tbMap=this.dmlTables as any;
    for(let key in tbMap){
      delete tbMap[key];
    }
    var ds=this.dmlObjList;
    ds.length=0;
    if(modelData.Tables && modelData.Tables.items){
      var tbs=modelData.Tables.items as any[];
      tbs.forEach(tb=>{
        var obj=this.createDmlObjFromMeta(tb);
        obj.owner=this;
        ds.push(obj);
        if(obj instanceof DmlEntityObj){
          tbMap[obj.name]=obj;
          obj.checkResize();
        }
      });
    }
    this.findAllFKLinks(null);
    this.checkContentSize();

    ds.forEach(obj=>{
      if(obj instanceof DmlLinkObj){
        (obj as DmlLinkObj).checkPositionEx(true, true, 2);
      }
    });
    
    this.setModified(false);
    this.dataLoading=false;
    //console.log('load dml model: ', this.modelData.Tables);
  }

  public getAllObjRect():number[]{
    var x1=0,y1=0,x2=0,y2=0;
    
    var ds=this.dmlObjList;
    ds.forEach((obj,index)=>{
      if(index==0){
        x1=obj.left;
        y1=obj.top;
        x2=obj.right;
        y2=obj.bottom;
      } else {
        if(x1>obj.left)
          x1=obj.left;
        if(y1>obj.top)
          y1=obj.top;
        if(x2<obj.right)
          x2=obj.right;
        if(y2<obj.bottom)
          y2=obj.bottom;
      }
    })
    return [x1,y1,x2,y2];
  }

  public checkContentSize(){
    let wx=this.contentWidth;
    let wy=this.contentHeight;
    this.dmlObjList.forEach(obj=>{
      if(obj instanceof DmlLinkObj){
      } else {
        if(wx<obj.right+20)
          wx=obj.right+20;
        if(wy<obj.bottom+80)
          wy=obj.bottom+80;
      }
    });
    this.contentWidth=wx;
    this.contentHeight=wy;
  }

  public getSelectionRect(){
    var x1=0,y1=0,x2=0,y2=0;
    
    var sds=this.selectionList;
    var ds:DmlObj[]=[];
    sds.forEach((dobj,index)=>{
      if(dobj instanceof DmlLinkObj){
        ds.push((dobj as DmlLinkObj).obj1);
        ds.push((dobj as DmlLinkObj).obj2);
      }else
        ds.push(dobj);
    });

    ds.forEach((obj,index)=>{
      if(index==0){
        x1=obj.left;
        y1=obj.top;
        x2=obj.right;
        y2=obj.bottom;
      } else {
        if(x1>obj.left)
          x1=obj.left;
        if(y1>obj.top)
          y1=obj.top;
        if(x2<obj.right)
          x2=obj.right;
        if(y2<obj.bottom)
          y2=obj.bottom;
      }
    })
    return [x1,y1,x2,y2];    
  }

  public findAllFKLinks(filterTbNames:any){
    var tbs=this.dmlTables as any;
    for(let tbName in tbs){
      if(filterTbNames)
        if(!filterTbNames[tbName])
          continue;
      var ent=tbs[tbName] as DmlEntityObj;
      if(! (ent instanceof DmlTableObj))
        continue;
      let tb=ent as DmlTableObj;
      tb.fields.forEach(fd=>{
        if(fd.isFK()){
          var ent2=tbs[fd.relateTable] as DmlEntityObj;
          if(!(ent2 instanceof DmlTableObj))
            return;
          let tb2=ent2 as DmlTableObj;
          if(tb2){
            if(!tb.hasLinked(tb2, tbName+'.'+fd.name) && tb2.fieldByName(fd.relateField)!=null){
              var o=new DmlLinkObj();
              o.obj1=tb2;
              o.obj2=tb;
              if(fd.isUnique()){
                o.linkType=DmlLinkType.dmllFKUnique;
              } else {
                o.linkType=DmlLinkType.dmllFKNormal;
              }
              o.obj1Field = fd.relateField;
              o.obj2Field = fd.name;
              o.graphDesc = fd.graphDesc;
              this.dmlObjList.push(o);
              o.owner=this;
              tb.links.push(o);
              if(tb!=tb2)
                tb2.links.push(o);
            }
          }
        } else if(fd.isLink()){
          var tb2=tbs[fd.relateTable] as DmlEntityObj;
          if(tb2){
            if(!tb.hasLinked(tb2, tbName+'.'+fd.name)){
              var o=new DmlLinkObj();
              o.obj1=tb2;
              o.obj2=tb;
              if(fd.relateField=='{Link:Direct}'){
                o.linkType=DmlLinkType.dmllDirect;
              } else if(fd.relateField=='{Link:OppDirect}'){
                o.linkType=DmlLinkType.dmllOppDirect;
              } else {
                o.linkType=DmlLinkType.dmllLine;
              }
              o.obj2Field = fd.name;
              o.graphDesc = fd.graphDesc;
              this.dmlObjList.push(o);
              o.owner=this;
              tb.links.push(o);
              if(tb!=tb2)
                tb2.links.push(o);
            }
          }
        }
      });
    }
  }

  public setModified(value:boolean=true){
    if(value)
      this.modifyCounter++;
    else
      this.modifyCounter=0;
  }

}
  
/**
DmlObj
----------------------------
id                PKInteger
Name              String
Caption           String
Comment           String
Left              Float
Top               Float
Width             Float
Height            Float
OLeft             Float
OTop              Float
OWidth            Float
OHeight           Float
BLeft             Float
BTop              Float
BWidth            Float
BHeight           Float
Selected          Bool
AutoSize          Bool
FillColor         String
DrawOnBackground  Integer
BriefMode         Bool

 */

export class DmlObj {
  protected _guid: string='';
    
  protected _id: string = '';
  protected _name: string = '';
  protected _caption: string = '';
  protected _comment: string = '';
  protected _oLeft: number = 0;
  protected _oTop: number = 0;
  protected _oWidth: number = 0;
  protected _oHeight: number = 0;
  protected _bLeft: number = 0;
  protected _bTop: number = 0;
  protected _bWidth: number = 0;
  protected _bHeight: number = 0;
  protected _selected: boolean = false;
  protected _autoSize: boolean = true;
  protected _fillColor: string = '';
  protected _drawOnBackground: number = 0;
  protected _briefMode: boolean = false;

  public rowHeight:number=16;

  public metaData: any;
  public owner: any=null;

  constructor()
  {
    this.reset();
  }

  public get guid()
  {
    return this._guid;
  }
  public get id()
  {
    return this._id;
  }
  public set id(value: string)
  {
    this._id = value;
  }
  public get name()
  {
    return this._name;
  }
  public set name(value: string)
  {
    this._name = value;
  }
  public get caption()
  {
    return this._caption;
  }
  public set caption(value: string)
  {
    this._caption = value;
  }
  public get hasCaption(){
    return (this.caption && this.caption!=this.name);
  }
  public get nameCaption(){
    let res=this.name;
    if(this.hasCaption)
      res=res+'('+this.caption+')';
    return res;
  }
  public get comment()
  {
    return this._comment;
  }
  public set comment(value: string)
  {
    this._comment = value;
  }
  public get left()
  {
    if(this._briefMode){
        if(!valEqs(this._bLeft, 0))
            return this._bLeft;
        else
            return this._oLeft/2.0;
    } else {
        if(!valEqs(this._oLeft, 0))
            return this._oLeft;
        else
            return this._bLeft*2.0;
    }
  }  
  public set left(value: number)
  {
    if(this._briefMode)
        this._bLeft = value;
    else
        this._oLeft = value;
  }
  public get top()
  {
    if(this._briefMode){
        if(!valEqs(this._bTop, 0))
            return this._bTop;
        else
            return this._oTop/2.0;
    } else {
        if(!valEqs(this._oTop, 0))
            return this._oTop;
        else
            return this._bTop*2.0;
    }
  }
  public set top(value: number)
  {
    if(this._briefMode)
        this._bTop = value;
    else
        this._oTop = value;
  }
  public get width()
  {
    if(this._briefMode){
        if(!valEqs(this._bWidth, 0))
            return this._bWidth;
        else
            return this._oWidth/2.0;
    } else {
        if(!valEqs(this._oWidth, 0))
            return this._oWidth;
        else
            return this._bWidth*2.0;
    }
  }
  public set width(value: number)
  {
    if(this._briefMode)
        this._bWidth = value;
    else
        this._oWidth = value;
  }
  public get height()
  {
    if(this._briefMode){
        if(!valEqs(this._bHeight, 0))
            return this._bHeight;
        else
            return this._oHeight/2.0;
    } else {
        if(!valEqs(this._oHeight, 0))
            return this._oHeight;
        else
            return this._bHeight*2.0;
    }
  }
  public set height(value: number)
  {
    if(this._briefMode)
        this._bHeight = value;
    else
        this._oHeight = value;
  }
  public get oLeft()
  {
    return this._oLeft;
  }
  public set oLeft(value: number)
  {
    this._oLeft = value;
  }
  public get oTop()
  {
    return this._oTop;
  }
  public set oTop(value: number)
  {
    this._oTop = value;
  }
  public get oWidth()
  {
    return this._oWidth;
  }
  public set oWidth(value: number)
  {
    this._oWidth = value;
  }
  public get oHeight()
  {
    return this._oHeight;
  }
  public set oHeight(value: number)
  {
    this._oHeight = value;
  }
  public get bLeft()
  {
    return this._bLeft;
  }
  public set bLeft(value: number)
  {
    this._bLeft = value;
  }
  public get bTop()
  {
    return this._bTop;
  }
  public set bTop(value: number)
  {
    this._bTop = value;
  }
  public get bWidth()
  {
    return this._bWidth;
  }
  public set bWidth(value: number)
  {
    this._bWidth = value;
  }
  public get bHeight()
  {
    return this._bHeight;
  }
  public set bHeight(value: number)
  {
    this._bHeight = value;
  }
  public get right(){
    return this.left+this.width;
  }
  public get bottom(){
    return this.top+this.height;
  }
  public get selected()
  {
    return this._selected;
  }
  public set selected(value: boolean)
  {
    this._selected = value;
  }
  public get autoSize()
  {
    return this._autoSize;
  }
  public set autoSize(value: boolean)
  {
    this._autoSize = value;
  }
  public get fillColor()
  {
    return this._fillColor;
  }
  public set fillColor(value: string)
  {
    this._fillColor = value;
  }
  public get drawOnBackground()
  {
    return this._drawOnBackground;
  }
  public set drawOnBackground(value: number)
  {
    this._drawOnBackground = value;
  }
  public get briefMode()
  {
    return this._briefMode;
  }
  public set briefMode(value: boolean)
  {
    this._briefMode = value;
  }
  public get graphDesc()
  {
    let s=''
    if(this.oLeft) s=s+'Left='+this.oLeft+"\n";
    if(this.oTop) s=s+'Top='+this.oTop+"\n";
    if(this.bLeft) s=s+'BLeft='+this.bLeft+"\n";
    if(this.bTop) s=s+'BTop='+this.bTop+"\n";
    if(!this.autoSize){
      s=s+"AutoSize=0\n";
      if(this.oWidth) s=s+'Width='+this.oWidth+"\n";
      if(this.oHeight) s=s+'Height='+this.oHeight+"\n";
      if(this.bWidth) s=s+'BWidth='+this.bWidth+"\n";
      if(this.bHeight) s=s+'BHeight='+this.bHeight+"\n";
    }
    return s.trim();
  }
  public set graphDesc(value: string)
  {
    let s=value;
    if(!s) return;
    s="\n"+s+"\n";
    s=s.replace(/\r\n/g,"\n");
    this.oLeft=readIniLned_num(s, 'Left', this.oLeft);
    this.oTop=readIniLned_num(s, 'Top', this.oTop);
    this.bLeft=readIniLned_num(s, 'BLeft', this.bLeft);
    this.bTop=readIniLned_num(s, 'BTop', this.bTop);

    let autoSz=readIniLned_num(s, 'AutoSize', 1);
    this.autoSize=autoSz==1;
    if(!autoSz){
      this.oWidth=readIniLned_num(s, 'Width', this.oWidth);
      this.oHeight=readIniLned_num(s, 'Height', this.oHeight);
      this.bWidth=readIniLned_num(s, 'BWidth', this.bWidth);
      this.bHeight=readIniLned_num(s, 'BHeight', this.bHeight);
    }

  }

  public reset()
  {
    this._guid             = genGuid();
    this._id               = '';
    this._name             = '';
    this._caption          = '';
    this._comment          = '';
    this._oLeft            = 0;
    this._oTop             = 0;
    this._oWidth           = 120;
    this._oHeight          = 180;
    this._bLeft            = 0;
    this._bTop             = 0;
    this._bWidth           = 0;
    this._bHeight          = 0;
    this._selected         = false;
    this._autoSize         = true;
    this._fillColor        = '';
    this._drawOnBackground = 0;
    this._briefMode        = false;
  }

  public loadFromMeta(meta: any){
    this.metaData=meta;
    this.id=meta.ID;
    this.name=meta.Name;
    this.caption=meta.Caption;
    this.comment=meta.Memo;
    this.graphDesc=meta.GraphDesc;
    if(meta.BgColor)
      this.fillColor=delphi2CssColor(meta.BgColor);
  }
  
  public saveToMeta(meta: any){    
  }

  public resetShape(){
    this.autoSize=true;
    this.checkResize();
  }

  public checkResize(){
  }

  public regenGraphicDesc(){
    this.metaData.GraphDesc=this.graphDesc;
  }

  public checkMoved(dx:number, dy:number){
    this.regenGraphicDesc();
  }

  public prepareDelete(){
  }

  public paintTo(drawer:DmlDrawer){
    if(!drawer)
      return;
    if(!drawer.objInVision(this))
      return;

    let rx1=drawer.getX(this.left);
    let ry1=drawer.getY(this.top);
    let rx2=drawer.getX(this.left+this.width);
    let ry2=drawer.getY(this.top+this.height);
    let rw=rx2-rx1;
    let rh=ry2-ry1;

    let ctx=drawer.cvsContext;
    ctx.beginPath();
    if(this.fillColor){
      ctx.fillStyle=this.fillColor;
    } else {
      ctx.fillStyle=drawer.defaultObjectColor;
    }
    ctx.lineWidth=1;
    ctx.strokeStyle=drawer.defaultBorderColor;
    ctx.rect(rx1, ry1, rw, rh);
    ctx.fill();
    ctx.stroke();
    ctx.textAlign = "center";
    ctx.fillStyle=drawer.defTextColor;
    let s=this.name;
    if(this.hasCaption){
      if(drawer._showPhyFieldName==1)
        s=this.caption;
      else if(drawer._showPhyFieldName==2)
        s=this.nameCaption;
    }
    ctx.fillText(s, (rx1+rx2)/2, (ry1+ry2)/2);
  }

  public drawSelectedGrips(drawer:DmlDrawer){
    if(!this.selected)
      return;
    let rx1=drawer.getX(this.left);
    let ry1=drawer.getY(this.top);
    let rx2=drawer.getX(this.left+this.width);
    let ry2=drawer.getY(this.top+this.height);
    let dd=1;
    let ctx=drawer.cvsContext;
    /*ctx.beginPath();
    ctx.strokeStyle=drawer.selectedColor;
    ctx.lineWidth=2;
    ctx.rect(rx1-dd,ry1-dd,rx2-rx1+dd+dd,ry2-ry1+dd+dd);
    ctx.stroke();*/
    dd=3;
    ctx.fillStyle=drawer.selectedColor;
    ctx.fillRect(rx1-dd,ry1-dd,dd+dd,dd+dd);
    ctx.fillRect(rx1-dd,ry2-dd,dd+dd,dd+dd);
    ctx.fillRect(rx2-dd,ry1-dd,dd+dd,dd+dd);
    ctx.fillRect(rx2-dd,ry2-dd,dd+dd,dd+dd);
  }
  
  public setClickPoint(x:number, y:number, drawer:DmlDrawer){

  }
  
  public pointInObj(x:number, y:number){
    return rectCrossOrTouchRect(this.left, this.top, this.width, this.height, x, y, 1, 1);
  }
  
  public rectTouchObj(x:number, y:number, w:number, h:number){
    return rectCrossOrTouchRect(this.left, this.top, this.width, this.height, x, y, w, h);
  }

  public setModified(){
    if(this.owner)
    this.owner.setModified();
  }

}

const EmptyDmlObj=new DmlObj();
EmptyDmlObj.id='_NULL';

export class DmlEntityObj extends DmlObj{
    
  protected _selectedGrip: number = 0;
  public links: DmlLinkObj[]=[];
  
  constructor()
  {
    super();
  }

  public get selectedGrip()
  {
    return this._selectedGrip;
  }  
  public set selectedGrip(value: number)
  {
    this._selectedGrip = value;
  }

  public isResizable(){
    return true;
  }

  public checkResize(){
    super.checkResize();
    if(this.autoSize && this.briefMode){
      this.checkSizeForName(this.name);
    }
    this.checkLinkPositions();
  }

  public checkSizeForName(name: string){
    this.width=90;
    this.height=45;
    let L=dmLength(name);
    if (L > FieldNameMaxDrawSize)
      L = FieldNameMaxDrawSize;  
    if (this.width < L * DML_FONTSC + 4)
      this.width = Math.round(L * DML_FONTSC + 4);
  }

  public hasLinked(obj:DmlObj, fieldId: string){
    let self=this;
    return this.links.some(lnk=>{
      if(lnk.obj1==self && lnk.obj2==obj && lnk.fieldId==fieldId){
        return true;
      }
      else if(lnk.obj1==obj && lnk.obj2==self && lnk.fieldId==fieldId){
        return true;
      }
    });
  }

  public getLinkIndex(lnk: DmlLinkObj){
    let res=-1;
    this.links.some((lk,i)=>{
      if(lnk==lk)
      {
        res=i;
        return true;
      }
    });
    return res;
  }

  public checkLinkPositions(){
    this.links.forEach(lnk=>lnk.checkPosition());
  }

  public checkMoved(dx:number, dy:number){
    if(dx==0 && dy==0)
      return;
    this.links.forEach(lnk=>lnk.checkObjMoved(this, dx,dy));
    this.regenGraphicDesc();
  }

  
  public paintTo(drawer:DmlDrawer){
    super.paintTo(drawer);
  }

}

export enum DmlLinkType {
    dmllLine, dmllFKNormal, dmllFKUnique, dmllDirect, dmllOppDirect
};

export class DmlLinkObj extends DmlObj{
  //DmlPoint
  
  public obj1: DmlObj = EmptyDmlObj;  //主表
  public obj2: DmlObj = EmptyDmlObj;  //从表
  public obj1Field: string = '';  //主表ID
  public obj2Field: string = '';  //从表RID
  public linkType: DmlLinkType = DmlLinkType.dmllLine;
  protected p1: DmlPoint = new DmlPoint;
  protected p2: DmlPoint = new DmlPoint;
  protected p3: DmlPoint = new DmlPoint;
  protected p4: DmlPoint = new DmlPoint;

  protected _clickPos: number=0;
  protected mod_OP1: boolean=false;
  protected mod_OP2: boolean=false;
  protected mod_CP: boolean=false;
  protected hookP1: DmlPoint = new DmlPoint;
  protected hookP2: DmlPoint = new DmlPoint;
  protected horz1: boolean=false;
  protected horz2: boolean=false;
  protected bfHookP1: DmlPoint = new DmlPoint; 
  protected bfHookP2: DmlPoint = new DmlPoint; 

  public fieldId: string='';
  public isMoving: boolean=false;

  constructor()
  {
    super();
    this.drawOnBackground=1;
  }

  public get clickPos(){
    return this._clickPos;
  }

  public set clickPos(value:number){
    if(this._clickPos!=value){
      this._clickPos=value;
      //if(value==0)
        //this.checkPosition();
    }
  }

  public get graphDesc(){
    //return super.graphDesc;
    let s='';
    s=s+'P1='+this.p1.x+','+this.p1.y+"\n";
    s=s+'P2='+this.p2.x+','+this.p2.y+"\n";
    s=s+'P3='+this.p3.x+','+this.p3.y+"\n";
    s=s+'P4='+this.p4.x+','+this.p4.y+"\n";
    
    s=s+'HookP1='+this.hookP1.x+','+this.hookP1.y+"\n";
    s=s+'HookP2='+this.hookP2.x+','+this.hookP2.y+"\n";

    if(this.mod_OP1) s=s+"Mod_OP1=1\n";
    if(this.mod_OP2) s=s+"Mod_OP2=1\n";
    if(this.mod_CP) s=s+"Mod_CP=1\n";
    if(this.horz1) s=s+"Horz1=1\n";
    if(this.horz2) s=s+"Horz2=1\n";

    return s.trim();
  }

  public set graphDesc(value: string)
  {
    //super.graphDesc=value;
    let s=value;
    if(!s) return;
    s="\n"+s+"\n";
    s=s.replace(/\r\n/g,"\n");
    //this.left=readIniLned_num(s, 'Left', this.left);
    //this.top=readIniLned_num(s, 'Top', this.top);
    readIniLned_point(s,'P1',this.p1);
    readIniLned_point(s,'P2',this.p2);
    readIniLned_point(s,'P3',this.p3);
    readIniLned_point(s,'P4',this.p4);
    readIniLned_point(s,'HookP1',this.hookP1);
    readIniLned_point(s,'HookP2',this.hookP2);

    this.mod_OP1=readIniLned_num(s,'Mod_OP1',0)==1;
    this.mod_OP2=readIniLned_num(s,'Mod_OP2',0)==1;
    this.mod_CP=readIniLned_num(s,'Mod_CP',0)==1;
    this.horz1=readIniLned_num(s,'Horz1',0)==1;
    this.horz2=readIniLned_num(s,'Horz2',0)==1;

  }
  
  public get selected()
  {
    return super.selected;
  }
  public set selected(value: boolean)
  {
    super.selected=value;

    if(!value){
      if(this.obj1 instanceof DmlTableObj){
        let tb=this.obj1 as DmlTableObj;
        tb.clearFocusField();
      }
      if(this.obj2 instanceof DmlTableObj){
        let tb=this.obj2 as DmlTableObj;
        tb.clearFocusField();
      }
    }
  }

  public getMetaLinkInfo():any{
    return {
      DmlLinkGuid: this.guid,
      Title: 'Link '+this.obj1.metaData.Name+' - '+this.obj2.metaData.Name,
      MasterMetaTable:this.obj1.metaData,
      SlaveMetaTable:this.obj2.metaData,
      "MasterField": this.obj1Field,
      "SlaveField": this.obj2Field,
      "CreateNewField": false,
      "NewSlaveField": '',
      "LinkType": this.linkType
    };
  }

  public resetShape(){
    this.mod_OP1 = false; 
    this.mod_OP2 = false; 
    this.mod_CP = false; 
    this._clickPos = 0;
    this.checkPosition();        
  }

  public checkResize(){
    if(this.p1.x < this.p4.x){
      this.left=this.p1.x;
      this.width=this.p4.x-this.p1.x;
    } else {
      this.left=this.p4.x;
      this.width=this.p1.x-this.p4.x;
    }
    
    if(this.p1.y < this.p4.y){
      this.top=this.p1.y;
      this.height=this.p4.y-this.p1.y;
    } else {
      this.top=this.p4.y;
      this.height=this.p1.y-this.p4.y;
    }
  }

  public regenGraphicDesc(){
    if(this.obj2 && this.obj2Field){
      let fd=(this.obj2 as DmlTableObj).fieldByName(this.obj2Field);
      if(fd){
        (fd as DmlField).metaData.GraphDesc=this.graphDesc;
      }
    }
  }

  public setClickPoint(x:number, y:number, drawer:DmlDrawer){
    if(this.briefMode){
      this.clickPos=0;
      return;
    }
    
    let dd=DEF_DMLLINK_PICK_DIST;
    if(this.owner){
      dd=(this.owner as DmlDrawer).canvasToContentD(dd);
    }
    if(rectCrossOrTouchRect2(this.p1.x,this.p1.y,this.p2.x,this.p2.y, x-dd, y-dd, dd+dd, dd+dd))
      this.clickPos=1;
    else if(rectCrossOrTouchRect2(this.p2.x,this.p2.y,this.p3.x,this.p3.y, x-dd, y-dd, dd+dd, dd+dd))
      this.clickPos=2;
    else if(rectCrossOrTouchRect2(this.p3.x,this.p3.y,this.p4.x,this.p4.y, x-dd, y-dd, dd+dd, dd+dd))
      this.clickPos=3;
    else
      this.clickPos=0;

    if(this.clickPos>0 && drawer.selectionList.length<=1)
    if(this.linkType==DmlLinkType.dmllFKNormal 
      || this.linkType==DmlLinkType.dmllFKUnique)
    {
      if(this.obj1 instanceof DmlTableObj){
        let tb=this.obj1 as DmlTableObj;
        tb.setFieldFocused(this.obj1Field, 1);
      }
      if(this.obj2 instanceof DmlTableObj){
        let tb=this.obj2 as DmlTableObj;
        tb.setFieldFocused(this.obj2Field, 2);
      }
    }
  }
  
  public doMove(dx:number, dy:number){
    if(this.briefMode)
      return;
    if(this.isMoving)
      return;
    if(!this.clickPos)
      return;
    if(dx==0 && dy==0)
      return;
    this.isMoving=true;
    try{
      let bNeedChange=false;
      if(this.clickPos==1){
        
        if(this.horz1)
        {
          this.p1.y = this.p1.y + dy;
          this.p2.y = this.p2.y + dy;
          if(this.hookP1.y != 0)
          {
            this.hookP1.y = this.hookP1.y + dy;
            if(this.hookP1.y <= 1)
            {
              this.hookP1.y = 1;
              this.hookP1.y = Math.round(this.obj1.height / 2 + this.getPosDY(this.obj1));
              bNeedChange = true;
            }
            if(this.hookP1.y >= this.obj1.height)
            {
              this.hookP1.y = Math.round(this.obj1.height / 2 + this.getPosDY(this.obj1));
              bNeedChange = true;
            }
          }
          if(! this.mod_OP1)
            this.hookP1.x = Math.round(this.obj1.width / 2 + this.getPosDX(this.obj1));
          if(! this.mod_OP1 && ! this.mod_OP2 && ! this.mod_CP && (this.horz1 = ! this.horz2))
          {
            this.mod_OP1 = true;
            this.mod_OP2 = true;
            this.mod_CP = true;
          }
          else
            this.mod_OP1 = true;
        }
        else
        {
          this.p1.x = this.p1.x + dx;
          this.p2.x = this.p2.x + dx;
          this.hookP1.x = this.hookP1.x + dx;
          if(this.hookP1.x != 0)
          {
            if(this.hookP1.x <= 1)
            {
              this.hookP1.x = 1;
              this.hookP1.x = Math.round(this.obj1.width / 2 + this.getPosDX(this.obj1));
              bNeedChange = true;
            }
            if(this.hookP1.x > this.obj1.width)
            {
              this.hookP1.x = Math.round(this.obj1.width / 2 + this.getPosDX(this.obj1));
              bNeedChange = true;
            }
          }
          if(! this.mod_OP1)
            this.hookP1.y = Math.round(this.obj1.height / 2 + this.getPosDY(this.obj1));
          if(! this.mod_OP1 && ! this.mod_OP2 && ! this.mod_CP && (this.horz1 = ! this.horz2))
          {
            this.mod_OP1 = true;
            this.mod_OP2 = true;
            this.mod_CP = true;
          }
          else
            this.mod_OP1 = true;
        }
        if(bNeedChange)
        {
          if(this.horz1 == this.horz2)
          {
            this.horz1 = ! this.horz1;
            this.horz2 = ! this.horz2;
            this.mod_CP = true;
            this.clickPos = 2;
            if(this.horz1)
              this.p3.x = this.p2.x
            else
              this.p3.y = this.p2.y;
          }
          else
          {
            this.horz1 = ! this.horz1;
            this.mod_CP = true;
            this.clickPos = 2;
            if(this.horz1)
            {
              this.p2.y = this.p1.y;
              this.p3.x = this.p2.x;
            }
            else
            {
              this.p2.x = this.p1.x;
              this.p3.y = this.p2.y;
            }
          }
        }

        this.checkPosition();
        this.setModified();
      }
      else if(this.clickPos==2){
        if(this.horz1==this.horz2){
          if(this.horz1){
            this.p2.x+=dx;
            this.p3.x+=dx;
            this.mod_CP=true;
          } else {
            this.p2.y+=dy;
            this.p3.y+=dy;
            this.mod_CP=true;
          }
          this.regenGraphicDesc();
          this.setModified();
        }
      } 
      else if(this.clickPos==3){
        
        if(this.horz2)
        {
          this.p3.y = this.p3.y + dy;
          this.p4.y = this.p4.y + dy;
          if(this.hookP2.y != 0)
          {
            this.hookP2.y = this.hookP2.y + dy;
            if(this.hookP2.y <= 1)
            {
              this.hookP2.y = 1;
              this.hookP2.y = Math.round(this.obj2.height / 2 + this.getPosDY(this.obj2));
              bNeedChange = true;
            }
            if(this.hookP2.y > this.obj2.height)
            {
              this.hookP2.y = Math.round(this.obj2.height / 2 + this.getPosDY(this.obj2));
              bNeedChange = true;
            }
          }
          if(! this.mod_OP2)
            this.hookP2.x = Math.round(this.obj2.width / 2 + this.getPosDX(this.obj2));
          if(! this.mod_OP1 && ! this.mod_OP2 && ! this.mod_CP && (this.horz1 = ! this.horz2))
          {
            this.mod_OP1 = true;
            this.mod_OP2 = true;
            this.mod_CP = true;
          }
          else
            this.mod_OP2 = true;
        }
        else
        {
          this.p3.x = this.p3.x + dx;
          this.p4.x = this.p4.x + dx;
          if(this.hookP2.x != 0)
          {
            this.hookP2.x = this.hookP2.x + dx;
            if(this.hookP2.x <= 1)
            {
              this.hookP2.x = 1;
              this.hookP2.x = Math.round(this.obj2.width / 2 + this.getPosDX(this.obj2));
              bNeedChange = true;
            }
            if(this.hookP2.x > this.obj2.width)
            {
              this.hookP2.x = Math.round(this.obj2.width / 2 + this.getPosDX(this.obj2));
              bNeedChange = true;
            }
          }
          if(! this.mod_OP2)
            this.hookP2.y = Math.round(this.obj2.height / 2 + this.getPosDY(this.obj2));
          if(! this.mod_OP1 && ! this.mod_OP2 && ! this.mod_CP && (this.horz1 = ! this.horz2))
          {
            this.mod_OP1 = true;
            this.mod_OP2 = true;
            this.mod_CP = true;
          }
          else
            this.mod_OP2 = true;
        }
        if(bNeedChange)
        {
          if(this.horz1 == this.horz2)
          {
            this.horz1 = ! this.horz1;
            this.horz2 = ! this.horz2;
            this.mod_CP = true;
            this.clickPos = 2;
            if(this.horz1)
              this.p2.x = this.p3.x
            else
              this.p2.y = this.p3.y;
          }
          else
          {
            this.horz2 = ! this.horz2;
            this.mod_CP = true;
            this.clickPos = 2;
            if(this.horz2)
            {
              this.p3.y = this.p4.y;
              this.p2.x = this.p3.x;
            }
            else
            {
              this.p3.x = this.p4.x;
              this.p2.y = this.p3.y;
            }
          }
        }
        this.checkPosition();
        this.setModified();
      }
    }finally{
      this.isMoving=false;
    }
  }

  public checkPosition(){
    if(this.owner && this.owner.dataLoading)
      return;
    this.checkPositionEx(true, true, 2);
    this.regenGraphicDesc();
  }

  private getPosDX(obj:DmlObj){
    let idx=(obj as DmlEntityObj).getLinkIndex(this);
    let res=idx*8;
    let dmax=Math.round(obj.width/2)-10;
    if(dmax<10)
      dmax=0;
    if(res>dmax)
      res=Math.round(Math.random()*dmax);
    if(idx%2==0)
      res=-res;
    return res;
  }

  private getPosDY(obj:DmlObj){
    let idx=(obj as DmlEntityObj).getLinkIndex(this);
    let res=idx*8;
    let dmax=Math.round(obj.height/2)-10;
    if(dmax<10)
      dmax=0;
    if(res>dmax)
      res=Math.round(Math.random()*dmax);
    if(idx%2==0)
      res=-res;
    return res;
  }

  private isOppAngle(obj1:DmlObj, obj2:DmlObj){
    let tol;
    if (obj1.width >= obj2.width)
      tol = obj1.width;
    else
      tol = obj2.width;

    let a1 = obj1.left;
    let a2 = obj1.left + obj1.width;
    let b1 = obj2.left;
    let b2 = obj2.left + obj2.width;
    if (a2 >= b1 && a2 <= b2)
      return false;
    if (a1 >= b1 && a1 <= b2)
      return false;
    if (b2 >= a1 && b2 <= a2)
      return false;
    if (b1 >= a1 && b1 <= a2)
      return false;
    let bFarX = false;
    if (a1 <= b1 && a2 <= b1 && a2 + tol < b1)
      bFarX = true;
    if (a1 >= b2 && a2 >= b2 && a1 - tol > b2)
      bFarX = true;

    a1 = obj1.top;
    a2 = obj1.top + obj1.height;
    b1 = obj2.top;
    b2 = obj2.top + obj2.height;
    if (a2 >= b1 && a2 <= b2)
      return false;
    if (a1 >= b1 && a1 <= b2)
      return false;
    if (b2 >= a1 && b2 <= a2)
      return false;
    if (b1 >= a1 && b1 <= a2)
      return false;
    if (bFarX)
    {
      if (a1 <= b1 && a2 <= b1 && a2 + tol < b1)
        return false;
      if (a1 >= b2 && a2 >= b2 && a1 - tol > b2)
        return false;
    }

    return true;
  }
  private isObjProjOverlay(obj1:DmlObj, obj2:DmlObj, bHorz:boolean){
    let tol = 4;
    let a1,a2,b1,b2;
    if (bHorz)
    {
      a1 = obj1.left;
      a2 = obj1.left + obj1.width;
      b1 = obj2.left;
      b2 = obj2.left + obj2.width;
    }
    else
    {
      a1 = obj1.top;
      a2 = obj1.top + obj1.height;
      b1 = obj2.top;
      b2 = obj2.top + obj2.height;
    }
    if (a1 < b1 - tol && a2 < b1 - tol)
      return false;
    else if (a1 > b2 + tol && a2 > b2 + tol)
      return false;
    else
      return true;
  }

  private checkMoveLinkDist(obj:DmlEntityObj, obj2:DmlEntityObj | null, link:DmlLinkObj, dp:DmlPoint) {
    let Result = false;
    let C = obj.links.length;
    let ap = {
      x: dp.x - obj.left,
      y: dp.y - obj.top
    };
    let dx = 0;
    let dy = 0;
    let CC = C;
    if (obj2 !== null) {
      CC = CC + obj2.links.length;
    }
    for (let J = 0; J <= CC * 5 + 10; J++) {
      let bNearX = false;
      let bNearY = false;
      for (let I = 0; I < C; I++) {
        let item = obj.links[I] as DmlLinkObj;
        if (item === link) {
          continue;
        }
        if (item.obj1 === obj) {
          if (item.horz1) {
            if (Math.abs(item.hookP1.y - ap.y) < 6) {
              bNearY = true;
            }
          } else {
            if (Math.abs(item.hookP1.x - ap.x) < 6) {
              bNearX = true;
            }
          }
        } else if (item.obj2 === obj) {
          if (item.horz2) {
            if (Math.abs(item.hookP2.y - ap.y) < 6) {
              bNearY = true;
            }
          } else {
            if (Math.abs(item.hookP2.x - ap.x) < 6) {
              bNearX = true;
            }
          }
        }
      }
  
      if (obj2 !== null) {
        for (let I = 0; I < obj2.links.length; I++) {
          let item = obj2.links[I] as DmlLinkObj;
          if (item === link) {
            continue;
          }
          if (item.obj1 === obj2) {
            if (item.horz1) {
              if (Math.abs((item.hookP1.y + obj2.top) - (ap.y + obj.top)) < 6) {
                bNearY = true;
              }
            } else {
              if (Math.abs((item.hookP1.x + obj2.left) - (ap.x + obj.left)) < 6) {
                bNearX = true;
              }
            }
          } else if (item.obj2 === obj2) {
            if (item.horz2) {
              if (Math.abs((item.hookP2.y + obj2.top) - (ap.y + obj.top)) < 6) {
                bNearY = true;
              }
            } else {
              if (Math.abs((item.hookP2.x + obj2.left) - (ap.x + obj.left)) < 6) {
                bNearX = true;
              }
            }
          }
        }
      }
  
      if (bNearX) {
        dx++;
      } else if (bNearY) {
        dy++;
      } else if (ap.x < 6 || ap.x > obj.width - 6) {
        dx++;
      } else if (ap.y < 6 || ap.y > obj.height - 6) {
        dy++;
      } else {
        dp.x = ap.x + obj.left;
        dp.y = ap.y + obj.top;
        return true;
      }
      Result = true;
      if (dx % 2 === 0) {
        ap.x = dp.x - obj.left + 3 * dx;
      } else {
        ap.x = dp.x - obj.left - 3 * dx;
      }
      if (dy % 2 === 0) {
        ap.y = dp.y - obj.top + 3 * dy;
      } else {
        ap.y = dp.y - obj.top - 3 * dy;
      }
    }
    return false;
  }
  
  private calLinkAttachPointV2(obj1:DmlObj, obj2:DmlObj, a1:DmlPoint, a2:DmlPoint){
    
    if(obj1==obj2){
      if (Math.abs(a1.x-a2.x)<=2)
        if (Math.abs(a1.y-a2.y)<=2)
        {
          a1.y = Math.round(obj1.top + 26);
          a2.y = a1.y+36;
        }
      return;
    }

    let LnkIdx1 = (obj1 as DmlEntityObj).getLinkIndex(this);
    let LnkIdx2 = (obj2 as DmlEntityObj).getLinkIndex(this);
    let DEF_LINK_EDGE_SPACE=20;

    a1.x = calAttPos(obj1.left, obj1.left + obj1.width, obj2.left, obj2.left + obj2.width, DEF_LINK_EDGE_SPACE, a1.x, LnkIdx1, LnkIdx2);

    a1.y = calAttPos(obj1.top, obj1.top + obj1.height, obj2.top, obj2.top + obj2.height, DEF_LINK_EDGE_SPACE, a1.y, LnkIdx1, LnkIdx2);

    a2.x = calAttPos(obj2.left, obj2.left + obj2.width, obj1.left, obj1.left + obj1.width, DEF_LINK_EDGE_SPACE, a2.x, LnkIdx2, LnkIdx1);

    a2.y = calAttPos(obj2.top, obj2.top + obj2.height, obj1.top, obj1.top + obj1.height, DEF_LINK_EDGE_SPACE, a2.y, LnkIdx2, LnkIdx1);

    if (Math.abs(a1.x - a2.x) < 1.1 || Math.abs(a1.y - a2.y) < 1.1)
    {
      this.checkMoveLinkDist(obj1 as DmlEntityObj, obj2 as DmlEntityObj, this, a1);
      this.checkMoveLinkDist(obj2 as DmlEntityObj, obj1 as DmlEntityObj, this, a2);
    }
    else
    {
      this.checkMoveLinkDist(obj1 as DmlEntityObj, null, this, a1);
      this.checkMoveLinkDist(obj2 as DmlEntityObj, null, this, a2);
    }

    a1.x = Math.round(a1.x);
    a1.y = Math.round(a1.y);
    a2.x = Math.round(a2.x);
    a2.y = Math.round(a2.y);  
  }

  public checkPositionEx(bEnableRecheck: boolean, bCanNoun: boolean, iOptimize:number){
    if(!this.obj1) return;
    if(!this.obj2) return;
    if(this.briefMode) return;

    if(iOptimize==0){
      
    if( ! this.horz1 )
      {
        if( ! this.mod_OP1 || (this.hookP1.x == 0) )
          this.hookP1.x = this.p1.x - this.obj1.left;
      }
      else if( ! this.mod_OP1 || (this.hookP1.y == 0) )
        this.hookP1.y = this.p1.y - this.obj1.top;
      if( ! this.horz2 )
      {
        if( ! this.mod_OP2 || (this.hookP2.x == 0) )
          this.hookP2.x = this.p4.x - this.obj2.left;
      }
      else if( ! this.mod_OP2 || (this.hookP2.y == 0) )
        this.hookP2.y = this.p4.y - this.obj2.top;
      
      if( this.p1.x <= this.p4.x )
        this.left = this.p1.x - 2;
      else
        this.left = this.p4.x - 2;
      if( this.p1.y <= this.p4.y )
        this.top = this.p1.y - 2;
      else
        this.top = this.p4.y - 2;
      this.width = Math.abs(this.p4.x - this.p1.x) + 4;
      this.height = Math.abs(this.p4.y - this.p1.y) + 4; 
    
      return;
    }

    let a1=new DmlPoint();
    let a2=new DmlPoint();
    
    a1.x = Math.round(this.obj1.left + this.obj1.width / 2 + this.getPosDX(this.obj1));
    a1.y = Math.round(this.obj1.top + this.obj1.height / 2 + this.getPosDY(this.obj1));
    a2.x = Math.round(this.obj2.left + this.obj2.width / 2 + this.getPosDX(this.obj2));
    a2.y = Math.round(this.obj2.top + this.obj2.height / 2 + this.getPosDY(this.obj2));

    this.calLinkAttachPointV2(this.obj1, this.obj2, a1, a2);

    if( iOptimize > 0 )
    {
      if( ! this.mod_OP1 )
      {
        this.p1 = a1;
        this.hookP1.x = a1.x - this.obj1.left;
        this.hookP1.y = a1.y - this.obj1.top;
      }
      if( ! this.mod_OP2 )
      {
        this.p4 = a2;
        this.hookP2.x = a2.x - this.obj2.left;
        this.hookP2.y = a2.y - this.obj2.top;
      }
    }
    
    if( (this.hookP1.x < 1) || (this.hookP1.x >= this.obj1.width) )
    {
      if( a1.x < a2.x )
        this.hookP1.x = this.obj1.width;
      else
        this.hookP1.x = 1;
    }
    if( (this.hookP1.y < 1) || (this.hookP1.y >= this.obj1.height) )
    {
      if( a1.y < a2.y )
        this.hookP1.y = this.obj1.height;
      else
        this.hookP1.y = 1;
    }
    
    if( (this.hookP2.x < 1) || (this.hookP2.x >= this.obj2.width) )
    {
      if( a1.x > a2.x )
        this.hookP2.x = this.obj2.width;
      else
        this.hookP2.x = 1;
    }
    if( (this.hookP2.y < 1) || (this.hookP2.y >= this.obj2.height) )
    {
      if( a1.y > a2.y )
        this.hookP2.y = this.obj2.height;
      else
        this.hookP2.y = 1;
    }
    
    let bNeedRecheck = false;
    
    
    if( ! this.mod_CP && (iOptimize > 0) )
    {
    
      //判断中间线的合适位置，生成FP1到FP4共4个点坐标
      if (this.obj1==this.obj2)
      {
        this.horz1 = true;
        this.horz2 = true;
        this.p1.x=this.obj1.left+this.obj1.width;
        if (!this.mod_OP1 || (this.hookP1.y == 0))
          this.p1.y = a1.y;
        else
          this.p1.y = this.obj1.top + this.hookP1.y;

        this.p4.x = this.p1.x;
        if (!this.mod_OP2 || (this.hookP2.y == 0))
          this.p4.y = a2.y;
        else
          this.p4.y = this.obj2.top+this.hookP2.y;

        this.p2.x = Math.round(this.p1.x + 24);
        this.p2.y = this.p1.y;
        this.p3.x = this.p2.x;
        this.p3.y = this.p4.y;
      }                                             
      else if( ! this.mod_OP1 && ! this.mod_OP2 && bCanNoun && this.isOppAngle(this.obj1, this.obj2) )
      {
        if( (this.linkType == DmlLinkType.dmllFKNormal) && (this.obj1.height <= this.obj2.height * 3) && (this.obj2.height * 2 > this.obj2.width) )
        {
          this.horz1 = false;
          this.horz2 = true;
        }
    
        else if( this.obj1.height >= this.obj2.height )
        {
          this.horz1 = true;
          this.horz2 = false;
        }
        else
        {
          this.horz1 = false;
          this.horz2 = true;
        }
    
        for(let ii = 0; ii<=1; ii++)
        {
          if( this.horz1 )
          {
            if( this.obj1.left + this.obj1.width < this.obj2.left )
              this.p1.x = this.obj1.left + this.obj1.width;
            else
              this.p1.x = this.obj1.left;
            this.p1.y = a1.y;
    
            this.p2.y = this.p1.y;
    
            this.p3.y = this.p2.y;
          }
          else
          {
            if( this.obj1.top + this.obj1.height < this.obj2.top )
              this.p1.y = this.obj1.top + this.obj1.height;
            else
              this.p1.y = this.obj1.top;
            this.p1.x = a1.x;
    
            this.p2.x = this.p1.x;
    
            this.p3.x = this.p2.x;
          }
    
          if( this.horz2 )
          {
            if( this.obj2.left > this.obj1.left + this.obj1.width )
              this.p4.x = this.obj2.left;
            else
              this.p4.x = this.obj2.left + this.obj2.width;
            this.p4.y = a2.y;
    
            this.p3.y = this.p4.y;
    
            this.p2.y = this.p3.y;
          }
          else
          {
            if( this.obj2.top > this.obj1.top + this.obj1.height )
              this.p4.y = this.obj2.top;
            else
              this.p4.y = this.obj2.top + this.obj2.height;
            this.p4.x = a2.x;
    
            this.p3.x = this.p4.x;
    
            this.p2.x = this.p3.x;
          }
    
          if( (ii = 0) && (this.owner.findItemAt(this.p2.x, this.p2.y)!=null) )
          {
            this.horz1 = ! this.horz1;
            this.horz2 = ! this.horz2;
          }
          else
            break;
    
        }
      }
    
      else if( (Math.abs(a1.x - a2.x) > Math.abs(a1.y - a2.y)) || this.isObjProjOverlay(this.obj1, this.obj2, false) )
      {
    
        this.horz1 = true;
        this.horz2 = true;
        if( this.obj1.left < this.obj2.left )
          this.p1.x = this.obj1.left + this.obj1.width;
        else
          this.p1.x = this.obj1.left;
        if( ! this.mod_OP1 || (this.hookP1.y == 0) )
          this.p1.y = a1.y;
        else
          this.p1.y = this.obj1.top + this.hookP1.y;
    
        if( this.obj1.left > this.obj2.left )
          this.p4.x = this.obj2.left + this.obj2.width;
        else
          this.p4.x = this.obj2.left;
        if( ! this.mod_OP2 || (this.hookP2.y == 0) )
          this.p4.y = a2.y;
        else
          this.p4.y = this.obj2.top + this.hookP2.y;
    
        this.p2.x = Math.round((this.p1.x + this.p4.x) / 2);
        this.p2.y = this.p1.y;
        this.p3.x = Math.round((this.p1.x + this.p4.x) / 2);
        this.p3.y = this.p4.y;
      }
      else
      {
        this.horz1 = false;
        this.horz2 = false;
        if( this.obj1.top < this.obj2.top )
          this.p1.y = this.obj1.top + this.obj1.height;
        else
          this.p1.y = this.obj1.top;
        if( ! this.mod_OP1 || (this.hookP1.x == 0) )
          this.p1.x = a1.x;
        else
          this.p1.x = this.obj1.left + this.hookP1.x;
    
        if( this.obj1.top > this.obj2.top )
          this.p4.y = this.obj2.top + this.obj2.height;
        else
          this.p4.y = this.obj2.top;
        if( ! this.mod_OP2 || (this.hookP2.x == 0) )
          this.p4.x = a2.x;
        else
          this.p4.x = this.obj2.left + this.hookP2.x;
    
        this.p2.x = this.p1.x;
        this.p2.y = Math.round((this.p1.y + this.p4.y) / 2);
        this.p3.x = this.p4.x;
        this.p3.y = Math.round((this.p1.y + this.p4.y) / 2);
      }
    }
    else
    {
    
      if( this.horz1 )
      {
        if( this.obj1.left + this.obj1.width < this.p3.x )
          this.p1.x = this.obj1.left + this.obj1.width;
        else
          this.p1.x = this.obj1.left;
        if( ! this.mod_OP1 || (this.hookP1.y == 0) )
          this.p1.y = a1.y;
        else
          this.p1.y = this.obj1.top + this.hookP1.y;
    
        this.p2.y = this.p1.y;
        if( ! this.horz2 )
          this.p3.y = this.p2.y;
      }
      else
      {
        if( this.obj1.top + this.obj1.height < this.p3.y )
          this.p1.y = this.obj1.top + this.obj1.height;
        else
          this.p1.y = this.obj1.top;
        if( ! this.mod_OP1 || (this.hookP1.x == 0) )
          this.p1.x = a1.x;
        else
          this.p1.x = this.obj1.left + this.hookP1.x;
    
        this.p2.x = this.p1.x;
        if( this.horz2 )
          this.p3.x = this.p2.x;
      }
    
      if( this.horz2 )
      {
        if( this.obj2.left > this.p2.x )
          this.p4.x = this.obj2.left;
        else
          this.p4.x = this.obj2.left + this.obj2.width;
        if( ! this.mod_OP2 || (this.hookP2.y == 0) )
          this.p4.y = a2.y;
        else
          this.p4.y = this.obj2.top + this.hookP2.y;
    
        this.p3.y = this.p4.y;
        if( ! this.horz1 )
          this.p2.y = this.p3.y;
      }
      else
      {
        if( this.obj2.top > this.p2.y )
          this.p4.y = this.obj2.top;
        else
          this.p4.y = this.obj2.top + this.obj2.height;
        if( ! this.mod_OP2 || (this.hookP2.x == 0) )
          this.p4.x = a2.x;
        else
          this.p4.x = this.obj2.left + this.hookP2.x;
    
        this.p3.x = this.p4.x;
        if( this.horz1 )
          this.p2.x = this.p3.x;
      }
    
    }
    
    if( bEnableRecheck && this.isMoving )
    {
    
      if( this.obj1.pointInObj(this.p2.x, this.p2.y) )
      {
        if( this.obj1.pointInObj(this.p3.x, this.p3.y) )
        {
          this.mod_CP = false;
    
          bNeedRecheck = true;
        }
        else if( this.obj2.pointInObj(this.p3.x, this.p3.y) )
        {
          if( (this.clickPos == 244) || (this.clickPos == 660) )
          {
            this.mod_CP = true;
            this.mod_OP1 = true;
            this.mod_OP2 = true;
            this.clickPos = 1;
            this.horz1 = ! this.horz1;
            this.horz2 = this.horz1;
          }
          else
            this.mod_CP = false;
          bNeedRecheck = true;
        }
        else
        {
          this.horz1 = ! this.horz2;
    
          bNeedRecheck = true;
        }
      }
      else if( this.obj2.pointInObj(this.p3.x, this.p3.y) )
      {
        if( this.obj2.pointInObj(this.p2.x, this.p2.y) )
        {
          this.mod_CP = false;
    
          bNeedRecheck = true;
        }
        else
        {
          this.horz2 = ! this.horz1;
    
          bNeedRecheck = true;
        }
      }
    
    }
    else if( bEnableRecheck )
    {
    
      if( this.obj1.pointInObj(this.p2.x, this.p2.y) || this.obj1.pointInObj(this.p3.x, this.p3.y)
        || this.obj2.pointInObj(this.p2.x, this.p2.y) || this.obj2.pointInObj(this.p3.x, this.p3.y) )
      {
        this.mod_CP = false;
        bNeedRecheck = true;
      }
    }
    
    if( bNeedRecheck && bEnableRecheck )
    {
      this.checkPositionEx(false, true, iOptimize);
      return;
    }
    
    if( ! this.horz1 )
    {
      if( ! this.mod_OP1 || (this.hookP1.x == 0) )
        this.hookP1.x = this.p1.x - this.obj1.left;
    }
    else if( ! this.mod_OP1 || (this.hookP1.y == 0) )
      this.hookP1.y = this.p1.y - this.obj1.top;
    if( ! this.horz2 )
    {
      if( ! this.mod_OP2 || (this.hookP2.x == 0) )
        this.hookP2.x = this.p4.x - this.obj2.left;
    }
    else if( ! this.mod_OP2 || (this.hookP2.y == 0) )
      this.hookP2.y = this.p4.y - this.obj2.top;
    
    if( this.p1.x <= this.p4.x )
      this.left = this.p1.x - 2;
    else
      this.left = this.p4.x - 2;
    if( this.p1.y <= this.p4.y )
      this.top = this.p1.y - 2;
    else
      this.top = this.p4.y - 2;
    this.width = Math.abs(this.p4.x - this.p1.x) + 4;
    this.height = Math.abs(this.p4.y - this.p1.y) + 4; 

  }
  
  public checkObjMoved(obj:DmlObj, dx:number, dy:number){
    if(!this.obj1) return;
    if(!this.obj2) return;
    if(this.obj1.selected && this.obj2.selected){
      if(this.obj1==obj){
        moveDmlPoint(this.p1, dx, dy);
        moveDmlPoint(this.p2, dx, dy);
        moveDmlPoint(this.p3, dx, dy);
        moveDmlPoint(this.p4, dx, dy);
        moveDmlPoint(this.bfHookP1, dx, dy);
        moveDmlPoint(this.bfHookP2, dx, dy);
        this.left=this.left+dx;
        this.top=this.top+dy;
        this.regenGraphicDesc();
      }
    } else {
      this.checkPosition();
    }
  }

  public pointInObj(x:number, y:number){
    if(this.briefMode){
      return super.pointInObj(x,y);
    }
    let dd=DEF_DMLLINK_PICK_DIST;
    if(this.owner){
      dd=(this.owner as DmlDrawer).canvasToContentD(dd);
    }
    if(rectCrossOrTouchRect2(this.p1.x,this.p1.y,this.p2.x,this.p2.y, x-dd, y-dd, dd+dd, dd+dd))
      return true;
    if(rectCrossOrTouchRect2(this.p2.x,this.p2.y,this.p3.x,this.p3.y, x-dd, y-dd, dd+dd, dd+dd))
      return true;
    if(rectCrossOrTouchRect2(this.p3.x,this.p3.y,this.p4.x,this.p4.y, x-dd, y-dd, dd+dd, dd+dd))
      return true;
    return false;
  }
  
  public rectTouchObj(x:number, y:number, w:number, h:number){
    if(this.briefMode){
      return rectCrossOrTouchRect(this.left, this.top, this.width, this.height, x, y, w, h);
    } else {
      if(rectCrossOrTouchRect2(this.p1.x,this.p1.y,this.p2.x,this.p2.y, x, y, w, h))
        return true;
      if(rectCrossOrTouchRect2(this.p2.x,this.p2.y,this.p3.x,this.p3.y, x, y, w, h))
        return true;
      if(rectCrossOrTouchRect2(this.p3.x,this.p3.y,this.p4.x,this.p4.y, x, y, w, h))
        return true;
      return false;
    }
  }

  
  public paintTo(drawer:DmlDrawer){
    this.paintEx(drawer,0);
  }

  public drawSelectedGrips(drawer:DmlDrawer){
    this.paintEx(drawer,1);
    this.paintEx(drawer,2);
  }

  public paintEx(drawer:DmlDrawer, bSelMode:number){
    if(!drawer)
      return;
    if(!drawer.objInVision(this))
      return;

    let ctx=drawer.cvsContext;
    if(bSelMode==1){
      ctx.lineWidth=3;
      ctx.strokeStyle=drawer.selectedColor;
      ctx.fillStyle=drawer.selectedColor;
    }
    else if(bSelMode==2){
      ctx.lineWidth=1;
      ctx.strokeStyle=drawer.selectedForeColor;
      ctx.fillStyle=drawer.selectedForeColor;
    }
    else{
      ctx.lineWidth=1;
      ctx.strokeStyle=drawer.defaultLineColor;
      ctx.fillStyle=drawer.workAreaColor;
    }

    if(!drawer.textVisible){
      ctx.beginPath();
      ctx.moveTo(drawer.getX(this.p1.x),drawer.getY(this.p1.y));
      ctx.lineTo(drawer.getX(this.p2.x),drawer.getY(this.p2.y));
      ctx.lineTo(drawer.getX(this.p3.x),drawer.getY(this.p3.y));
      ctx.lineTo(drawer.getX(this.p4.x),drawer.getY(this.p4.y));
      ctx.stroke();
      return;
    }

    
    let cp1, cp2, dcp1, dcp2, Pa, Pb, Pc, Pd, PaH1, PaH2, PbH1, PbH2, pfa0, pfa1, pfa2, pfa3, pfb1, pfb2, pfb3, pfb4: DmlPoint;
    
    cp1 = new DmlPoint();
    cp2 = new DmlPoint();
    dcp1 = new DmlPoint();
    dcp2 = new DmlPoint();
    Pa = new DmlPoint();
    Pb = new DmlPoint();
    Pc = new DmlPoint();
    Pd = new DmlPoint();
    PaH1 = new DmlPoint();
    PaH2 = new DmlPoint();
    PbH1 = new DmlPoint();
    PbH2 = new DmlPoint();
    pfa0 = new DmlPoint();
    pfa1 = new DmlPoint();
    pfa2 = new DmlPoint();
    pfa3 = new DmlPoint();
    pfb1 = new DmlPoint();
    pfb2 = new DmlPoint();
    pfb3 = new DmlPoint();
    pfb4 = new DmlPoint();
    
    const paD = 10;
    const pfaD = 20;
    const pfaR = 2;
    const ARROWLEN = 12;

    dcp1.x = 0;
    dcp1.y = 0;
    dcp2.x = 0;
    dcp2.y = 0;

    if(this.horz1)
    {

      PaH1.assign(this.p1);
      if(this.p2.x > this.p1.x)
        PaH1.x = PaH1.x + paD
      else
        PaH1.x = PaH1.x - paD;
      PaH2.assign(PaH1);

      PaH1.y = PaH1.y - 4;
      PaH2.y = PaH2.y + 4;

      cp1.assign(this.p1);
      if(this.p2.x > this.p1.x)
      {
        cp1.x = cp1.x + pfaR;
        dcp1.x = 1;
      }
      else
      {
        cp1.x = cp1.x - pfaR;
        dcp1.x = -1;
      }
    }
    else
    {

      PaH1.assign(this.p1);
      if(this.p2.y > this.p1.y)
        PaH1.y = PaH1.y + paD
      else
        PaH1.y = PaH1.y - paD;
      PaH2.assign(PaH1);
      PaH1.x = PaH1.x - 4;
      PaH2.x = PaH2.x + 4;

      cp1.assign(this.p1);
      if(this.p2.y > this.p1.y)
      {
        cp1.y = cp1.y + pfaR;
        dcp1.y = 1;
      }
      else
      {
        cp1.y = cp1.y - pfaR;
        dcp1.y = -1;
      }
    }

    if(this.horz2)
    {

      PbH1.assign(this.p4);
      if(this.p4.x < this.p3.x)
        PbH1.x = PbH1.x + paD
      else
        PbH1.x = PbH1.x - paD;
      PbH2.assign(PbH1);

      PbH1.y = PbH1.y - 4;
      PbH2.y = PbH2.y + 4;

      cp2.assign(this.p4);
      if(this.p4.x < this.p3.x)
      {
        cp2.x = cp2.x + pfaR;
        dcp2.x = 1;
      }
      else
      {
        cp2.x = cp2.x - pfaR;
        dcp2.x = -1;
      }
    }
    else
    {

      PbH1.assign(this.p4);
      if(this.p4.y < this.p3.y)
        PbH1.y = PbH1.y + paD
      else
        PbH1.y = PbH1.y - paD;
      PbH2.assign(PbH1);
      PbH1.x = PbH1.x - 4;
      PbH2.x = PbH2.x + 4;

      cp2.assign(this.p4);
      if(this.p4.y < this.p3.y)
      {
        cp2.y = cp2.y + pfaR;
        dcp2.y = 1;
      }
      else
      {
        cp2.y = cp2.y - pfaR;
        dcp2.y = -1;
      }
    }

    if(this.horz2)
    {

      pfa0.assign(this.p4);
      pfa1.assign(this.p4);
      pfa2.assign(this.p4);
      pfa3.assign(this.p4);
      pfb1.assign(this.p4);
      pfb2.assign(this.p4);
      pfb3.assign(this.p4);
      pfb4.assign(this.p4);
      if(this.p4.x > this.p3.x)
      {
        pfa0.x = pfa0.x - pfaD;

        pfa1.x = pfa1.x - pfaD + pfaR;
        pfa2.x = pfa2.x - paD;
        pfa2.y = pfa2.y - 5;
        pfa3.x = pfa3.x - paD;
        pfa3.y = pfa3.y + 5;

        pfb1.x = pfb1.x - paD;
        pfb1.y = pfb1.y - 3;
        pfb2.y = pfb2.y - 3;

        pfb3.x = pfb3.x - paD;
        pfb3.y = pfb3.y + 3;
        pfb4.y = pfb4.y + 3;
      }
      else
      {
        pfa0.x = pfa0.x + pfaD;

        pfa1.x = pfa1.x + pfaD - pfaR;
        pfa2.x = pfa2.x + paD;
        pfa2.y = pfa2.y - 5;
        pfa3.x = pfa3.x + paD;
        pfa3.y = pfa3.y + 5;

        pfb1.x = pfb1.x + paD;
        pfb1.y = pfb1.y - 3;
        pfb2.y = pfb2.y - 3;
        pfb3.x = pfb3.x + paD;
        pfb3.y = pfb3.y + 3;
        pfb4.y = pfb4.y + 3;
      }

    }
    else
    {

      pfa0.assign(this.p4);
      pfa1.assign(this.p4);
      pfa2.assign(this.p4);
      pfa3.assign(this.p4);
      pfb1.assign(this.p4);
      pfb2.assign(this.p4);
      pfb3.assign(this.p4);
      pfb4.assign(this.p4);
      if(this.p4.y > this.p3.y)
      {
        pfa0.y = pfa0.y - pfaD;

        pfa1.y = pfa1.y - pfaD + pfaR;
        pfa2.y = pfa2.y - paD;
        pfa2.x = pfa2.x - 5;
        pfa3.y = pfa3.y - paD;
        pfa3.x = pfa3.x + 5;

        pfb1.y = pfb1.y - paD;
        pfb1.x = pfb1.x - 3;
        pfb2.x = pfb2.x - 3;
        pfb3.y = pfb3.y - paD;
        pfb3.x = pfb3.x + 3;
        pfb4.x = pfb4.x + 3;

      }
      else
      {
        pfa0.y = pfa0.y + pfaD;

        pfa1.y = pfa1.y + pfaD - pfaR;
        pfa2.y = pfa2.y + paD;
        pfa2.x = pfa2.x - 5;
        pfa3.y = pfa3.y + paD;
        pfa3.x = pfa3.x + 5;

        pfb1.y = pfb1.y + paD;
        pfb1.x = pfb1.x - 3;
        pfb2.x = pfb2.x - 3;
        pfb3.y = pfb3.y + paD;
        pfb3.x = pfb3.x + 3;
        pfb4.x = pfb4.x + 3;
      }
    }

    if(this.horz1 && this.horz2)
    {

      Pa.assign(this.p2);
      Pb.assign(this.p2);
      if(this.p2.x > this.p1.x)
        Pa.x = this.p2.x - 3
      else
        Pa.x = this.p2.x + 3;
      if(this.p3.y > this.p2.y)
        Pb.y = this.p2.y + 3
      else
        Pb.y = this.p2.y - 3;

      Pc.assign(this.p3);
      Pd.assign(this.p3);
      if(this.p4.x > this.p3.x)
        Pd.x = this.p3.x + 3
      else
        Pd.x = this.p3.x - 3;
      if(this.p3.y > this.p2.y)
        Pc.y = this.p3.y - 3
      else
        Pc.y = this.p3.y + 3;

      if(Math.abs(Pc.y - Pb.y) <= 6)
      {
        Pc.y = (this.p2.y + this.p3.y) / 2;
        Pb.y = (this.p2.y + this.p3.y) / 2;

      }
    }
    else if(! this.horz1 && ! this.horz2)
    {

      Pa.assign(this.p2);
      Pb.assign(this.p2);
      if(this.p2.y > this.p1.y)
        Pa.y = this.p2.y - 3
      else
        Pa.y = this.p2.y + 3;
      if(this.p3.x > this.p2.x)
        Pb.x = this.p2.x + 3
      else
        Pb.x = this.p2.x - 3;

      Pc.assign(this.p3);
      Pd.assign(this.p3);
      if(this.p4.y > this.p3.y)
        Pd.y = this.p3.y + 3
      else
        Pd.y = this.p3.y - 3;
      if(this.p3.x > this.p2.x)
        Pc.x = this.p3.x - 3
      else
        Pc.x = this.p3.x + 3;

      if(Math.abs(Pc.x - Pb.x) <= 6)
      {
        Pc.x = (this.p2.x + this.p3.x) / 2;
        Pb.x = (this.p2.x + this.p3.x) / 2;
      }
    }
    else
    {
      if(this.horz1 && ! this.horz2)
      {

        Pa.assign(this.p2);
        if(this.p2.x > this.p1.x)
          Pa.x = this.p2.x - 3
        else
          Pa.x = this.p2.x + 3;
        Pb = Pa;

        Pd.assign(this.p3);
        if(this.p4.y > this.p3.y)
          Pd.y = this.p3.y + 3
        else
          Pd.y = this.p3.y - 3;
        Pc.assign(Pd);
      }
      else if(! this.horz1 && this.horz2)
      {

        Pa.assign(this.p2);
        if(this.p2.y > this.p1.y)
          Pa.y = this.p2.y - 3
        else
          Pa.y = this.p2.y + 3;
        Pb = Pa;

        Pd.assign(this.p3);
        if(this.p4.x > this.p3.x)
          Pd.x = this.p3.x + 3
        else
          Pd.x = this.p3.x - 3;
        Pc.assign(Pd);
      }
      else
      {

        Pa.assign(this.p2);
        Pb.assign(this.p2);

        Pc.assign(this.p3);
        Pd.assign(this.p3);
      }
    }


    ctx.beginPath();

    ctx.moveTo(drawer.getX(this.p1.x), drawer.getY(this.p1.y));
    ctx.lineTo(drawer.getX(Pa.x), drawer.getY(Pa.y));
    ctx.lineTo(drawer.getX(Pb.x), drawer.getY(Pb.y));
    ctx.lineTo(drawer.getX(Pc.x), drawer.getY(Pc.y));
    ctx.lineTo(drawer.getX(Pd.x), drawer.getY(Pd.y));
    ctx.lineTo(drawer.getX(this.p4.x), drawer.getY(this.p4.y));

    ctx.stroke();

    let psd=[new DmlPoint(),new DmlPoint(),new DmlPoint(),new DmlPoint()];
    if((this.linkType==DmlLinkType.dmllDirect))
      this.calculateArr(this.horz2, this.p3, this.p4, psd)
    else if((this.linkType==DmlLinkType.dmllOppDirect))
      this.calculateArr(this.horz2, this.p2, this.p1, psd);


    if((this.linkType==DmlLinkType.dmllFKNormal))
    {

      ctx.beginPath();
      ctx.moveTo(drawer.getX(PaH1.x), drawer.getY(PaH1.y));
      ctx.lineTo(drawer.getX(PaH2.x), drawer.getY(PaH2.y));
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(drawer.getX(pfa0.x), drawer.getY(pfa0.y),drawer.contentToCanvasD(pfaR),0,2*Math.PI);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(drawer.getX(pfa1.x), drawer.getY(pfa1.y));
      ctx.lineTo(drawer.getX(pfa2.x), drawer.getY(pfa2.y));
      ctx.lineTo(drawer.getX(pfa3.x), drawer.getY(pfa3.y));
      ctx.lineTo(drawer.getX(pfa1.x), drawer.getY(pfa1.y));
      ctx.fill();
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(drawer.getX(pfb1.x), drawer.getY(pfb1.y));
      ctx.lineTo(drawer.getX(pfb2.x), drawer.getY(pfb2.y));
      ctx.moveTo(drawer.getX(pfb3.x), drawer.getY(pfb3.y));
      ctx.lineTo(drawer.getX(pfb4.x), drawer.getY(pfb4.y));
      ctx.stroke();
      ctx.fill();

    }

    if((this.linkType==DmlLinkType.dmllFKUnique))
    {

      ctx.beginPath();
      ctx.moveTo(drawer.getX(PaH1.x), drawer.getY(PaH1.y));
      ctx.lineTo(drawer.getX(PaH2.x), drawer.getY(PaH2.y));
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(drawer.getX(PbH1.x), drawer.getY(PbH1.y));
      ctx.lineTo(drawer.getX(PbH2.x), drawer.getY(PbH2.y));
      ctx.stroke();

    }

    if((this.linkType==DmlLinkType.dmllDirect))
    {

      ctx.beginPath();
      ctx.moveTo(drawer.getX(psd[0].x), drawer.getY(psd[0].y));
      ctx.lineTo(drawer.getX(psd[1].x), drawer.getY(psd[1].y));
      ctx.lineTo(drawer.getX(psd[2].x), drawer.getY(psd[2].y));
      ctx.lineTo(drawer.getX(psd[0].x), drawer.getY(psd[0].y));
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(drawer.getX(cp1.x)+ dcp1.x, drawer.getY(cp1.y)+ dcp1.y,drawer.contentToCanvasD(pfaR),0,2*Math.PI);
      ctx.fill();
      ctx.stroke();

    }

    if((this.linkType==DmlLinkType.dmllOppDirect))
    {

      ctx.beginPath();
      ctx.moveTo(drawer.getX(psd[0].x), drawer.getY(psd[0].y));
      ctx.lineTo(drawer.getX(psd[1].x), drawer.getY(psd[1].y));
      ctx.lineTo(drawer.getX(psd[2].x), drawer.getY(psd[2].y));
      ctx.lineTo(drawer.getX(psd[0].x), drawer.getY(psd[0].y));
      ctx.fill();
      ctx.stroke();


      ctx.beginPath();
      ctx.arc(drawer.getX(cp2.x)+ dcp2.x, drawer.getY(cp2.y)+ dcp2.y,drawer.contentToCanvasD(pfaR),0,2*Math.PI);
      ctx.fill();
      ctx.stroke();

    }

    if((this.linkType==DmlLinkType.dmllLine))
    {

      ctx.beginPath();
      ctx.arc(drawer.getX(cp1.x)+ dcp1.x, drawer.getY(cp1.y)+ dcp1.y,drawer.contentToCanvasD(pfaR),0,2*Math.PI);
      ctx.fill();
      ctx.stroke();


      ctx.beginPath();
      ctx.arc(drawer.getX(cp2.x)+ dcp2.x, drawer.getY(cp2.y)+ dcp2.y,drawer.contentToCanvasD(pfaR),0,2*Math.PI);
      ctx.fill();
      ctx.stroke();


    }

  }

  private calculateArr(bHorz: boolean, Fo1: DmlPoint, Fo2: DmlPoint, points:DmlPoint[]){
      
    if(bHorz)
    {
      if (Fo1.x < Fo2.x)
      {
        points[0].assign(Fo2);
        points[1].x = Fo2.x - 8;
        points[1].y = Fo2.y - 5;
        points[2].x = Fo2.x - 8;
        points[2].y = Fo2.y + 5;
        points[3].assign(points[0]);
      }
      else
      {
        points[0].assign(Fo2);
        points[1].x = Fo2.x + 8;
        points[1].y = Fo2.y - 5;
        points[2].x = Fo2.x + 8;
        points[2].y = Fo2.y + 5;
        points[3].assign(points[0]);
      }
    }
    else
    {
      if (Fo1.y < Fo2.y)
      {
        points[0].assign(Fo2);
        points[1].x = Fo2.x + 5;
        points[1].y = Fo2.y - 8;
        points[2].x = Fo2.x - 5;
        points[2].y = Fo2.y - 8;
        points[3].assign(points[0]);
      }
      else
      {
        points[0].assign(Fo2);
        points[1].x = Fo2.x + 5;
        points[1].y = Fo2.y + 8;
        points[2].x = Fo2.x - 5;
        points[2].y = Fo2.y + 8;
        points[3].assign(points[0]);
      }
    }  
  }
}

export class DmlTextObj extends DmlEntityObj{

  public drawComment: string[]=[];
  public scaleFontSize: boolean=true;

  public checkResize(){
    super.checkResize();

    let i, l, mx, my;
    let ws, wt;
    let s, t;
  
    mx = FieldNameMaxDrawSize;
    if (mx < FieldTypeMaxDrawSize) {
      mx = FieldTypeMaxDrawSize;
    }
    if (mx < 50) {
      mx = 50;
    }
  
    my = TableFieldMaxDrawCount;
    if (my < mx) {
      my = mx;
    }
  
    mx = (mx * 3) / 2;
  
    let fComment=this.comment;
    if(fComment.indexOf('\r')>0){
      fComment=fComment.replace(/\r\n/g,'\n');
      fComment=fComment.replace(/\r/g,'\n');
    }
    let ss = fComment.split('\n');
  
    i = 0;
    while (i < ss.length) {
      s = ss[i];
      if (dmLength(s) > mx) {
        l = mx;
        ws = s;
        while (true) {
          wt = ws.substring(0, l);
          t = wt;
          if (dmLength(t) > mx) {
            l--;
          } else {
            break;
          }
        }
        s = ws.substring(l + 1, ws.length);
        ss[i] = s;
        ss.splice(i, 0, t);
      }
      i++;
    }
  
    while (ss.length >= my) {
      ss.pop();
    }
    this.drawComment = ss;
  
    if (this.autoSize) {
      this.width = 120;
      this.height = 80;
  
      if (this.height < ss.length * 18 + 15) {
        this.height = Math.round(ss.length * 18 + 15);
      }
      for (i = 0; i < ss.length; i++) {
        l = dmLength(ss[i]);
        if (this.width < l * DML_FONTSC + 4) {
          this.width = Math.round(l * DML_FONTSC + 4);
        }
      }
  
      if (this.briefMode && this.scaleFontSize) {
        this.width = (this.width * 3) / 5;
        this.height = (this.height * 3) / 5;
        if (this.height > 80) {
          this.height = 80;
        }
        return;
      }
    }    

  }

  public paintTo(drawer: DmlDrawer) {

    if(!drawer)
      return;
    if(!drawer.objInVision(this))
      return;

    let rx1=drawer.getX(this.left);
    let ry1=drawer.getY(this.top);
    let rx2=drawer.getX(this.left+this.width);
    let ry2=drawer.getY(this.top+this.height);
    let rw=rx2-rx1;
    let rh=ry2-ry1;
    
    var rowh=this.rowHeight*drawer.viewScale;

    let ctx=drawer.cvsContext;
    ctx.beginPath();
    if(this.fillColor){
      ctx.fillStyle=this.fillColor;
    } else {
      ctx.fillStyle=drawer.defaultObjectColor;
    }
    ctx.lineWidth=1;
    ctx.strokeStyle=drawer.defaultBorderColor;
    ctx.rect(rx1, ry1, rw, rh);
    ctx.fill();
    ctx.stroke();

    if(!drawer.textVisible)
      return;
    ctx.textAlign = "start";
    ctx.fillStyle=drawer.defTextColor;
    ctx.font=drawer.textFontSize+"px monospace"; 
    
    let tx=drawer.getX(this.left+4);
    let ty=ry1+rowh;
    this.drawComment.forEach(txt=>{
      ctx.fillText(txt, tx, drawVal(ty));
      ty+=rowh;
    });

  }

}

export class DmlGroupBox extends DmlEntityObj{

  public constructor(){
    super();
    this.drawOnBackground=2;
  }

  public pointInObj(x:number, y:number){
    let dd=DEF_DMLLINK_PICK_DIST;
    if(this.owner){
      dd=(this.owner as DmlDrawer).canvasToContentD(dd);
    }
    if(rectCrossOrTouchRect2(this.left,this.top,this.right,this.top, x-dd, y-dd, dd+dd, dd+dd))
      return true;
    if(rectCrossOrTouchRect2(this.right,this.top,this.right,this.bottom, x-dd, y-dd, dd+dd, dd+dd))
      return true;
    if(rectCrossOrTouchRect2(this.right,this.bottom,this.left,this.bottom, x-dd, y-dd, dd+dd, dd+dd))
      return true;
    if(rectCrossOrTouchRect2(this.left,this.top,this.left,this.bottom, x-dd, y-dd, dd+dd, dd+dd))
      return true;
    return false;
  }

  public paintTo(drawer: DmlDrawer) {
    if(!drawer)
      return;
    if(!drawer.objInVision(this))
      return;

    let rx1=drawer.getX(this.left);
    let rxT=drawer.getX(this.left+5);
    let ry1=drawer.getY(this.top);
    let rx2=drawer.getX(this.left+this.width);
    let ry2=drawer.getY(this.top+this.height);
    let rw=rx2-rx1;
    let rh=ry2-ry1;

    let ctx=drawer.cvsContext;
    ctx.beginPath();
    if(this.fillColor){
      ctx.fillStyle=this.fillColor;
    } else {
      ctx.fillStyle='white';
    }
    ctx.setLineDash([3]);
    ctx.lineWidth=1;
    ctx.strokeStyle=drawer.defaultGroupEdgeColor;
    ctx.rect(rx1, ry1, rw, rh);
    if(ctx.fillStyle)
      ctx.fill();
    ctx.stroke();
    ctx.setLineDash([]);

    if(!drawer.textVisible)
      return;
    ctx.textAlign = "start";
    ctx.fillStyle=drawer.defaultTitleColor;
    ctx.font=drawer.textFontSize+"px Verdana"; 
    
    var rowh=this.rowHeight*drawer.viewScale;
    ctx.fillText(this.comment, rxT, drawVal(ry1+rowh));
  }
}

export class DmlField{
  public metaData: any;
  public id: string='';
  public name: string=''; //显示名
  public caption: string=''; //字段名
  public fieldType: DMLFieldType=DMLFieldType.cfdtUnknow; //字符串，整数，浮点数，二进制数据，计算字段……
  public fieldTypeName: string='';
  public fieldLen: number=0; //字符串长度
  public fieldScal: number=0; //字符串精度
  public relateTable: string=''; //外键关联的表名、对象字段类型、特殊字段类型
  public relateField: string='';
  public comment: string=''; //备注
  public notNullable: boolean=false; //可为空
  public extraKeyType: DmlKeyType=DmlKeyType.cfktNormal; //1主键 2外键 
  public indexType: DmlIndexType=DmlIndexType.cfitNone;
  public linkSelectType: number=0; //连线是否被选中（字段高亮显示），0未选中 1选中外键主表字段 2选中外键副表字段
  public exOptions: string='';
  public fieldWeight: number=0;

  public graphDesc: string ='';

  private fieldDesc_logic: string='';
  private fieldDesc_phy: string='';
  
  public fieldFocusMode:number=0;//0无 1关联主键 2关联外键 3选字段
  
  public get hasCaption(){
    return (this.caption && this.caption!=this.name);
  }

  public get nameCaption(){
    let res=this.name;
    if(this.hasCaption)
      res=res+'('+this.caption+')';
    return res;
  }

  public isFK(){
    if(this.extraKeyType==DmlKeyType.cfktRid)
      return true;
    if(this.relateTable && this.relateField){
      if(this.extraKeyType==DmlKeyType.cfktId)
        return true;
    }
    return false;
  }

  public isLink(){
    if(this.relateTable && this.relateField){
      if(this.isFK())
        return false;
      if(this.relateField=='{Link:Line}' 
        ||this.relateField=='{Link:Direct}'
        ||this.relateField=='{Link:OppDirect}')
        return true;
    }
    return false;
  }

  public isPK(){
    return (this.extraKeyType==DmlKeyType.cfktId);
  }

  public isUnique(){
    return this.isPK() || (this.indexType==DmlIndexType.cfitUnique);
  }

  public getIconIndex(){
    let st=0;
    if(this.fieldWeight<0)
      st+=20;
    if(this.isPK())
      return st+1;
    switch(this.fieldType){
      case DMLFieldType.cfdtUnknow: return st+0;
      case DMLFieldType.cfdtString: return st+3;
      case DMLFieldType.cfdtInteger: return st+2;
      case DMLFieldType.cfdtFloat: return st+6;
      case DMLFieldType.cfdtDate: return st+7;
      case DMLFieldType.cfdtBool: return st+8;
      case DMLFieldType.cfdtEnum: return st+5;
      case DMLFieldType.cfdtBlob: return st+9;
      case DMLFieldType.cfdtObject: return st+10;
      case DMLFieldType.cfdtCalculate: return st+11;
      case DMLFieldType.cfdtList: return st+12;
      case DMLFieldType.cfdtFunction: return st+13;
      case DMLFieldType.cfdtEvent: return st+14;
    default: return st+15;
    }
  }
  
  public loadFromMeta(meta: any){
    this.metaData=meta;
    this.id=meta.ID;
    this.name=meta.Name;
    this.caption=meta.DisplayName;
    this.fieldType=meta.DataType;
    this.fieldTypeName=meta.FieldTypeName;
    this.fieldLen=meta.DataLength;
    this.fieldScal=meta.DataScale;
    this.relateTable=meta.RelateTable;
    this.relateField=meta.RelateField;
    this.comment=meta.Memo;
    this.notNullable=meta.Not_Nullable;
    this.extraKeyType=meta.KeyFieldType;
    this.indexType=meta.IndexType;
    this.fieldWeight=meta.FieldWeight;
    this.graphDesc=meta.GraphDesc;
  }

  public getFieldTypeStr(bPhy:boolean){
    if(bPhy){
      if(!this.fieldDesc_phy)
        this.fieldDesc_phy=this.getFieldTypeStrEx(bPhy);
      return this.fieldDesc_phy;
    }
    else {
      if(!this.fieldDesc_logic)
        this.fieldDesc_logic=this.getFieldTypeStrEx(bPhy);
      return this.fieldDesc_logic;
    }
  }

  private getFieldTypeStrEx(bPhy:boolean){
    let Result;
    switch (this.fieldType) {
      case DMLFieldType.cfdtObject:
      case DMLFieldType.cfdtList:
      case DMLFieldType.cfdtOther:
        if (this.fieldTypeName) {
          Result = this.fieldTypeName;
        } else {
          if (bPhy) {
            Result = GetDMLFieldPhyTypeName(CurrentDmlDbEngine, this.fieldType, this.fieldLen);
          } else {
            Result = DML_LogicTypeNames[this.fieldType];
          }
        }
        if (bPhy) {
          Result = Proc_CheckCustDataTypeReplaces(Result);
        }
        return Result;
    }


    if (bPhy) {
      if (this.fieldTypeName) {
        Result = this.fieldTypeName;
      } else {
        Result = GetDMLFieldPhyTypeName(CurrentDmlDbEngine, this.fieldType, this.fieldLen);
      }
      // return DML_PhyFieldTypeNames_Ora[FieldType];
      switch (this.fieldType) {
        case DMLFieldType.cfdtString:
          let nres=Proc_CheckStringMaxLen(CurrentDmlDbEngine, this.fieldTypeName, Result, this.fieldLen);
          if(nres)
            Result=nres;
          else {
            if (this.fieldLen > 0) {
              Result = Result + '(' + this.fieldLen + ')';
            } else if (Result.indexOf('(') === -1) {
              Result = Result + '(4000)';
            }
          }
          break;
        case DMLFieldType.cfdtInteger:
          if ((this.fieldLen > 0) && (this.fieldLen !== 10)) {
            Result = Result + '(' + this.fieldLen + ')';
          } else if (CurrentDmlDbEngine === 'ORACLE') {
            if (Result === 'NUMBER') {
              Result = Result + '(10)';
            }
          }
          break;
        case DMLFieldType.cfdtFloat:
          if (this.fieldLen > 0) {
            if (this.fieldScal > 0) {
              Result = Result + '(' + this.fieldLen + ',' + this.fieldScal + ')';
            } else {
              Result = Result + '(' + this.fieldLen + ')';
            }
          }
          break;
        // case DMLFieldType.cfdtUnknow:
        // case DMLFieldType.cfdtOther:
        default:
          if (this.fieldLen > 0) {
            if (this.fieldScal > 0) {
              Result = Result + '(' + this.fieldLen + ',' + this.fieldScal + ')';
            } else {
              Result = Result + '(' + this.fieldLen + ')';
            }
          }
          break;
      }
      Result = Proc_CheckCustDataTypeReplaces(Result);
      if (this.extraKeyType === DmlKeyType.cfktId) {
        Result = Result + ' PK';
      } else if (this.extraKeyType === DmlKeyType.cfktRid) {
        Result = Result + ' FK';
      }
    } else {
      Result = DML_LogicTypeNames[this.fieldType];
      if (this.extraKeyType === DmlKeyType.cfktId) {
        if ((this.fieldType === DMLFieldType.cfdtInteger) && (this.fieldLen === 0)) {
          Result = 'PK';
          return Result;
        } else {
          Result = 'PK' + Result;
        }
      } else if (this.extraKeyType === DmlKeyType.cfktRid) {
        if ((this.fieldType === DMLFieldType.cfdtInteger) && (this.fieldLen === 0)) {
          Result = 'FK';
          return Result;
        } else {
          Result = 'FK' + Result;
        }
      }

      switch (this.fieldType) {
        case DMLFieldType.cfdtString:
          if (this.fieldLen >= DEF_TEXT_CLOB_LEN) {
            Result = `${Result}(${this.fieldLen})`;
          } else if (this.fieldLen > 0) {
            if (this.fieldLen !== 4000) {
              Result = `${Result}(${this.fieldLen})`;
            }
          }
          break;
        case DMLFieldType.cfdtInteger:
          if (this.fieldLen > 0) {
            Result = `${Result}(${this.fieldLen})`;
          }
          break;
        case DMLFieldType.cfdtFloat:
          if (this.fieldLen > 0) {
            if (this.fieldScal > 0) {
              Result = `${Result}(${this.fieldLen},${this.fieldScal})`;
            } else {
              Result = `${Result}(${this.fieldLen})`;
            }
          }
          break;
        // case DMLFieldType.cfdtUnknow:
        // case DMLFieldType.cfdtOther:
        default:
          if (this.fieldLen > 0) {
            if (this.fieldScal > 0) {
              Result = `${Result}(${this.fieldLen},${this.fieldScal})`;
            } else {
              Result = `${Result}(${this.fieldLen})`;
            }
          }
          break;
      }

    }
    return Result;
  }

}

export class DmlTableObj extends DmlEntityObj{
  public fields:DmlField[]=[];

  private maxFieldNameLen:number=5;
  private maxLogicTpLen = 0;
  private origDefWidth = 60;
  private fieldFocused:boolean=false;
  
  public get selected()
  {
    return super.selected;
  }
  public set selected(value: boolean)
  {
    super.selected=value;

    if(!value){
      this.clearFocusField();
    }
  }

  public clearFocusField(){
    if(this.fieldFocused){
      this.fields.forEach(fd=>fd.fieldFocusMode=0);
      this.fieldFocused=false;
    }
  }

  public setFieldFocused(fieldName: string, mode: number){
    this.fields.forEach(fd=>{
      if(fd.name==fieldName){
        fd.fieldFocusMode=mode;
        this.fieldFocused=true;
      }
    });
  }

  public loadFromMeta(meta: any){
    super.loadFromMeta(meta);
    this.fields.length=0;
    if(meta.MetaFields && meta.MetaFields.items){
      var fds=meta.MetaFields.items as any[];
      fds.forEach(fd=>{
        if(!fd.FieldWeight || fd.FieldWeight> -9){
          let field=new DmlField();
          field.loadFromMeta(fd);
          this.fields.push(field);
        }
      })
    }
  }

  public fieldByName(fieldName:string){
    let res=null;
    this.fields.some(field=>{
      if(field.name==fieldName){
        res=field;
        return true;
      }
    });
    return res;
  }
  
  public resetShape(){
    super.resetShape();
    this.links.forEach(lnk=>lnk.resetShape());
  }

  public checkResize(){
    // inherited;
    if (this.briefMode) {
      let s = this.name;
      if (this.hasCaption) {
        if (dmLength(this.name) < dmLength(this.caption)) {
          s = this.caption;
        }
      }
      this.checkSizeForName('((' + s + '))');
      this.checkLinkPositions();
      return;
    }
  
    this.maxFieldNameLen = 0;
    this.fields.forEach(f=>{
      let s = f.name;
      if (f.hasCaption && dmLength(f.name) < dmLength(f.caption)) {
        s = f.caption;
      }
      let l = dmLength(s);
      if (f.fieldType==DMLFieldType.cfdtFunction || f.fieldType==DMLFieldType.cfdtEvent) {
        l = Math.floor(l / 2);
      }
      if (l > FieldNameMaxDrawSize) {
        l = FieldNameMaxDrawSize;
      }
      if (this.maxFieldNameLen < l) {
        this.maxFieldNameLen = l;
      }
    });
    this.maxFieldNameLen = this.maxFieldNameLen + 1;
  
    let lgPhMaxLen = 0;
    this.maxLogicTpLen = 0;
    this.origDefWidth = 60;
    this.fields.forEach(f=>{
      let s = '';
      if (f.hasCaption) {
        s = f.caption;
      }
      let l = dmLength(s);
      if (f.fieldType==DMLFieldType.cfdtFunction || f.fieldType==DMLFieldType.cfdtEvent) {
        l = Math.floor(l / 2);
      }
      if (lgPhMaxLen < l) {
        lgPhMaxLen = l;
      }
  
      if (this.maxLogicTpLen < l) {
        this.maxLogicTpLen = l;
      }
  
      let ftl = dmLength(f.getFieldTypeStr(true));
      let k = dmLength(f.getFieldTypeStr(false));
      if (ftl < lgPhMaxLen) {
        ftl = lgPhMaxLen;
      }
      if (ftl < 8) {
        ftl = 8;
      }
      if (ftl < k) {
        ftl = k;
      }
      if (ftl > FieldTypeMaxDrawSize) {
        ftl = FieldTypeMaxDrawSize;
      }
  
      if (this.maxLogicTpLen < ftl) {
        this.maxLogicTpLen = ftl;
      }
  
      l = this.maxFieldNameLen;
      if (this.origDefWidth < Math.round((l + ftl) * DML_FONTSC_FD) + 16 + 6) {
        this.origDefWidth = Math.round((l + ftl) * DML_FONTSC_FD) + 16 + 6;
      }
    });
    if (this.maxLogicTpLen > FieldTypeMaxDrawSize) {
      this.maxLogicTpLen = FieldTypeMaxDrawSize;
    }
  
    if (this.autoSize) {
      let fc = this.fields.length;
      if (TableFieldMaxDrawCount >= 10) {
        if (fc > TableFieldMaxDrawCount) {
          fc = TableFieldMaxDrawCount;
        }
      }
      this.height = (fc + 1) * this.rowHeight + 6;
      this.width = 60;
      let s = this.nameCaption;
      let l = dmLength(s);
      if (this.width < l * DML_FONTSC_FD) {
        this.width = Math.round(l * DML_FONTSC_FD);
      }
      this.fields.forEach(f=>{
        let ftl = dmLength(f.getFieldTypeStr(true));
        let k = dmLength(f.getFieldTypeStr(false));
        if (ftl < lgPhMaxLen) {
          ftl = lgPhMaxLen;
        }
        if (ftl < 8) {
          ftl = 8;
        }
        if (ftl < k) {
          ftl = k;
        }
        if (ftl > FieldTypeMaxDrawSize) {
          ftl = FieldTypeMaxDrawSize;
        }
        l = this.maxFieldNameLen;
        if (this.width < Math.round((l + ftl) * DML_FONTSC_FD) + 16 + 6) {
          this.width = Math.round((l + ftl) * DML_FONTSC_FD) + 16 + 6;
        }
      });
    }
    if (this.width < 120) {
      this.width = 120;
    }
    if (this.height < 40) {
      this.height = 40;
    }
  
    for (let i = 1; i < this.fields.length; i++) {
      if (this.fields[i].extraKeyType === DmlKeyType.cfktId) {
        for (let j = i; j > 0; j--) {
          if (this.fields[j - 1].extraKeyType === DmlKeyType.cfktId) {
            break;
          } else {
            let tmp=this.fields[j];
            this.fields[j]=this.fields[j-1];
            this.fields[j-1]=tmp;
          }
        }
      }
    }
    
    this.checkLinkPositions();
  }
  
  public setClickPoint(x:number, y:number, drawer:DmlDrawer){
    this.clearFocusField();

    if(this.briefMode){
      return;
    }
    if(!this.pointInObj(x,y))
      return;

    if(drawer.selectionList.length>2)
      return;
    
    var rowh=this.rowHeight;
    let yy=this.top+rowh;
    let idx=Math.floor((y-yy)/rowh);
    if(idx>=0 && idx<this.fields.length){
      let field=this.fields[idx];
      
      let s=field.name;
      if(field.hasCaption){
        if(drawer._showPhyFieldName==1)
          s=field.caption;
      }
      let len = dmLength(s);
      let wd=5+16+2+len * DML_FONTSC_FD+5;
      let fnW=this.maxFieldNameLen * DML_FONTSC + DML_FONT_EXWIDTH+3+16+2;
      if(wd>fnW-4)
        wd=fnW-4;
      if(x<=this.left+wd){
        field.fieldFocusMode=3;
        this.fieldFocused=true;
      }
    }
  }

  public paintTo(drawer:DmlDrawer){
    if(!drawer)
      return;
    if(!drawer.objInVision(this))
      return;

    let rx1=drawer.getX(this.left);
    let rxIco=drawer.getX(this.left+3);
    let rxT=drawer.getX(this.left+3+16+2);
    let ry1=drawer.getY(this.top);
    let rx2=drawer.getX(this.left+this.width);
    let ry2=drawer.getY(this.top+this.height);
    let rw=rx2-rx1;
    let rh=ry2-ry1;


    let ctx=drawer.cvsContext;
    ctx.beginPath();
    if(this.fillColor){
      ctx.fillStyle=this.fillColor;
    } else {
      ctx.fillStyle=drawer.defaultObjectColor;
    }
    ctx.lineWidth=1;
    ctx.strokeStyle=drawer.defaultBorderColor;
    ctx.rect(rx1, ry1, rw, rh);
    ctx.fill();
    ctx.stroke();

    
    ctx.fillStyle=drawer.defaultTitleColor;
    if(this.briefMode){
      ctx.textAlign = "center";
      let s=this.name;
      if(this.hasCaption){
        if(drawer._showPhyFieldName==1)
          s=this.caption;
        else if(drawer._showPhyFieldName==2)
          s=this.nameCaption;
      }
      ctx.fillText(s, (rx1+rx2)/2, (ry1+ry2)/2);
      return;
    }

    let yy=this.top;
    var ty=ry1;
    var rowh=this.rowHeight*drawer.viewScale;
    
    ty+=rowh;
    yy+=this.rowHeight;
    ctx.beginPath();
    ctx.moveTo(rx1, drawer.getY(yy+2));
    ctx.lineTo(rx2, drawer.getY(yy+2));
    ctx.stroke();

    if(!drawer.textVisible)
      return;

    ctx.textAlign = "center";
    let s=this.name;
    if(this.hasCaption){
      if(drawer._showPhyFieldName==1)
        s=this.caption;
      else if(drawer._showPhyFieldName==2)
        s=this.nameCaption;
    }
    ctx.fillText(s, (rx1+rx2)/2, drawer.getY(yy-2));

    ctx.textAlign = "start";
    let fnW=this.maxFieldNameLen * DML_FONTSC + DML_FONT_EXWIDTH+3+16+2;
    let rxT2=drawer.getX(this.left+fnW);
    let tx2MaxLen=this.width-fnW;
    let totalC=this.metaData.MetaFields.items.length;
    let maxC=Math.floor(this.height/this.rowHeight)-1;
    if(maxC>TableFieldMaxDrawCount)
      maxC=TableFieldMaxDrawCount;
    let fc=1;
    this.fields.forEach((field,index)=>{
      if(index>=maxC)
        return;
      if(index>=TableFieldMaxDrawCount)
        return;
      if(!drawer.rectInVision(this.left,yy,this.width,this.rowHeight)){
        ty+=rowh;
        yy+=this.rowHeight;
        return;
      }

      let s=field.name;
      if(field.hasCaption){
        if(drawer._showPhyFieldName==1)
          s=field.caption;
      }

      let txtColor;
      if(field.fieldWeight<0) {
        txtColor=drawer.grayTextColor;
      } else if(field.isPK()){
        txtColor=drawer.defaultPKColor;
      } else if(field.isFK()){
        txtColor=drawer.defaultFKColor;
      } else 
        txtColor=drawer.defTextColor;
        
        
      if(field.fieldFocusMode>0){
        let dd=drawer.contentToCanvasD(3);
        let len = dmLength(s);
        let wd;
        if(field.fieldFocusMode==3){
          wd=1+16+2+len * DML_FONTSC_FD+5;
          if(wd>fnW-4)
            wd=fnW-4;
          ctx.fillStyle=drawer.selectedColor;
        } else {
          wd=this.width-2-3;
          if(field.fieldFocusMode==1){
            ctx.fillStyle=drawer.defaultPKColor;
          } else{
            ctx.fillStyle=drawer.selectedColor;
          }
        }
        wd=drawer.contentToCanvasD(wd);
        ctx.fillRect(drawVal(rxIco-dd/2), drawVal(ty+dd), Math.round(wd),  Math.round(rowh));
        ctx.fillStyle=drawer.selectedForeColor;
      } else
        ctx.fillStyle=txtColor;

      let icoIdx=field.getIconIndex();
      drawer.drawIcon(icoIdx, rxIco, drawer.getY(yy+2));
    
      if(field.fieldWeight>0){
        ctx.font='bold '+drawer.textFontSize+"px Verdana"; 
      } else {
        ctx.font=drawer.textFontSize+"px Verdana"; 
      }

      ctx.fillText(s, rxT, drawVal(ty+rowh), fnW*drawer.viewScale);
      
      ctx.fillStyle=txtColor;
      s='';
      if(drawer._showPhyFieldName==0)
        s=field.getFieldTypeStr(true);
      else if(drawer._showPhyFieldName==1)
        s=field.getFieldTypeStr(false);
      else if(field.hasCaption)
        s=field.caption;
      if(totalC>maxC && index==maxC-1)
        s="...";
      ctx.fillText(s, rxT2, drawVal(ty+rowh), tx2MaxLen*drawer.viewScale);

      if(field.fieldWeight>0){
        ctx.font=drawer.textFontSize+"px Verdana"; 
      }
      ty+=rowh;
      yy+=this.rowHeight;
      fc++;
    });
  }
  
}