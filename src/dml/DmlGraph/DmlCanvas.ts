
import { valEqs, DmlObj, DmlDrawer, DmlEntityObj, DmlLinkObj } from './DmlObjs'
import { getDmlIconList } from '../DmlData/DmlIcons'

enum DmlMouseDragAction{
  maAuto,
  maPan,
  maMoveObj,
  maRectSel
};
var DEF_SCALE_FACTS=[10, 25, 50, 70, 80, 90, 100, 125, 150, 175, 200, 250, 300, 400]; 

export class DmlCanvas extends DmlDrawer {
  public lastMouseDownX: number=0;
  public lastMouseDownY: number=0;
  public lastMouseX: number=0;
  public lastMouseY: number=0;
  public _lastCursor: string='default';

  protected mouseDowned: boolean = false;
  protected mouseDragAction: DmlMouseDragAction = DmlMouseDragAction.maAuto;
  protected mouseWheelCounterX: number = 0;
  protected mouseWheelCounterY: number = 0;
  protected mouseWheelCounterZ: number = 0;
  
  constructor(elem: HTMLCanvasElement) {
      super(elem);

      this.createUserEvents();
      this.refresh();
  }

  public set lastCursor(value:string){
    if(!value)
      value='default';
    if(value==this._lastCursor){
      return;
    }
    this._lastCursor=value;
    if(value)
      this.canvas.style.cursor=value;
  }

  protected resetView(){
    this._viewScale=1;
    this._viewLeftX=-4;
    this._viewTopY=-4;
  }

  public setViewXYC(x: number,y: number,c: number){
    this._viewScale=c;
    this._viewLeftX=x;
    this._viewTopY=y;
    this.refresh();
  }

  public reset(bToogleMode:boolean=false){
    if(this.viewScale==1 && this.viewLeftX==-4 && this.viewTopY==-4)
      if(bToogleMode && this.selectionList.length>0){
        var r=this.getSelectionRect();
        this.viewCenterX=(r[0]+r[2])/2;
        this.viewCenterY=(r[1]+r[3])/2;
        this.refresh();
        return;
      }
    this.resetView();
    this.refresh();
  }

  public zoomToScale(aScale:number){
    let cx=this.viewCenterX;
    let cy=this.viewCenterY;
    this.viewScale=aScale;
    this.viewCenterX=cx;
    this.viewCenterY=cy;
    this.refresh();
  }

  public zoomIn(){
    this.zoomToScale(this.viewScale*1.5);
  }

  public zoomOut(){
    this.zoomToScale(this.viewScale/1.5);
  }

  public bestFit(bToogleMode:boolean=false){
    var r=this.getAllObjRect();
    let v=this.getBestFitView(r[0],r[1],r[2],r[3]);
    if(!bToogleMode || !valEqs(v[2],this._viewScale)){
      this.fitRect(r[0],r[1],r[2],r[3]);
      return;
    }

    if(this.selectionList.length==0){
      this.reset();
    } else {
      var r=this.getSelectionRect();
      let v=this.getBestFitView(r[0],r[1],r[2],r[3],false);
      this.setViewXYC(v[0],v[1],v[2]);
    }
  }

  public bestFitOrReset(mx:number, my:number){
    var r=this.getAllObjRect();
    let v=this.getBestFitView(r[0],r[1],r[2],r[3]);
    if(valEqs(v[2],this._viewScale) || v[2]>this._viewScale){
        this.setViewXYC(mx-this.canvasWidth/2,my-this.canvasHeight/2,1);
    } else {
        this.fitRect(r[0],r[1],r[2],r[3]);
    }
  }

  public fitRect(x1:number,y1:number,x2:number,y2:number){
    let v=this.getBestFitView(x1,y1,x2,y2);
    this.setViewXYC(v[0],v[1],v[2]);
  }

  public getBestFitView(x1:number,y1:number,x2:number,y2:number,noZoomOut:boolean=true):number[]{
    let w=Math.abs(x2-x1);
    let h=Math.abs(y2-y1);
    let dw=w*0.05;
    let dh=h*0.05;
    w+=dw*2;
    h+=dh*2;
    let cx=(x1+x2)/2.0;
    let cy=(y1+y2)/2.0;
    let bviewLeftX=x1-dw;
    let bviewTopY=y1-dh;
    let bviewScale=1;
    if(this._canvasWidth> 10 && this._canvasHeight>10 && h>1 && w>1){
        if(this._canvasWidth/this._canvasHeight < w/h){
            bviewScale=this._canvasWidth / w;
            let nh=w*this._canvasHeight/this._canvasWidth;
            bviewTopY=cy-nh/2-dh;
        }
        else{
            bviewScale=this._canvasHeight / h;
            let nw=h*this._canvasWidth/this._canvasHeight;
            bviewLeftX=cx-nw/2-dw;
        }
    }
    if(bviewScale>1 && noZoomOut){
        bviewScale=1;
        bviewLeftX=cx-this.canvasWidth/2;
        bviewTopY=cy-this.canvasHeight/2;
    }
    return [bviewLeftX,bviewTopY,bviewScale];
  }

  public focusToObj(name: string, bSel:boolean=true){
    let o=this.getObjByName(name);
    if(!o) return;
    let obj=o as DmlObj;
    if(!this.objInVision(obj,true) || this.viewScale<0.5){
      this.viewScale=1;
      this.viewCenterX=obj.left+obj.width/2;
      this.viewCenterY=obj.top+obj.height/2;
    }
    if(bSel){
      this.clearSelection();
      this.addToSelection(obj);
      this.doSelectObj();
    }
    this.refresh();
  }

  public toogleShowPhyField(){
    if(this.showPhyFieldName==2)
      this.showPhyFieldName=0;
    else
      this.showPhyFieldName++;
    this.refresh();
  }

  public execCmd(cmd:string,par1:any,par2:any){
    if(cmd=='toogleShowPhyField'){
      this.toogleShowPhyField();
      return true;
    }
    if(cmd=='focusToObj'){
      this.focusToObj(par1);
      return true;
    }
    if(cmd=='bestFit'){
      this.bestFit();
      return true;
    }
    if(cmd=='zoomIn'){
      this.zoomIn();
      return true;
    }
    if(cmd=='zoomOut'){
      this.zoomOut();
      return true;
    }
    if(cmd=='bestFitOrReset'){
      this.bestFitOrReset(-8+this.canvasWidth/2, -8+this.canvasHeight/2);
      return true;
    }
    if(cmd=='getDmlSelection'){
      return this.selectionList;
    }
    if(cmd=='getDmlSelectedCount'){
      return this.selectionCount();
    }
    if(cmd=='getDmlSelectedTableCount'){
      return this.selectedTableCount();
    }
    if(cmd=='getDmlSelectedTableMetaList'){
      return this.selectedTableMetaList();
    }
    if(cmd=='getDmlSelectedTableColor'){
      return this.selectedTableColor();
    }
    if(cmd=='setDmlSelectedTableColor'){
      if(this.setSelectedTableColor(par1))
        this.redraw();
    }
    if(cmd=='getDmlSelectedTable'){
      let obj=this.selectedTable();
      if(obj){
        return obj.metaData;
      }
    }
    if(cmd=='getDmlSelectedLink'){
      let obj=this.selectedLink();
      if(obj){
        return obj.getMetaLinkInfo();
      }
    }
    if(cmd=='getDmlNewMetaLinkInfo'){
      return this.getNewMetaLinkInfo();
    }
    if(cmd=='getDmlCanvasSize'){
      return [this.canvasWidth, this.canvasHeight];
    }
    if(cmd=='dmlReloadTable'){
      let oName=par2.Name;
      let obj=this.getObjByName(oName);
      if(obj){
        let dobj=(obj as DmlObj);
        dobj.loadFromMeta(par1);
        dobj.checkResize();
        this.redraw();
      }
      return true;
    }
    if(cmd=='dmlDeleteSelected'){
      if(this.deleteSelectedObjs())
        this.redraw();
      return true;
    }
    if(cmd=='dmlSelectAll'){
      this.selectAll();
      this.redraw();
      return true;
    }
    if(cmd=='dmlResetShapes'){
      this.resetShapes();
      return true;
    }
    if(cmd=='addDmlTable'){
      let o=this.addMetaTable(par1);
      if(o){
        let obj=o as DmlEntityObj;
        obj.left=this.canvasToContentX(this.lastMouseDownX);
        obj.top=this.canvasToContentY(this.lastMouseDownY);
        this.findSpaceForObj(obj);
        this.checkContentSize();
        this.focusToObj(par1.Name,true);
        this.emitEvent('newDmlTable', par1, null);
      }
    }
    if(cmd=='pasteDmlTables'){
      let md=par1;
      let pCopies=par2;
      this.pasteTables(md,pCopies);
    }
    if(cmd=='addDmlLink'){
      let o=this.addMetaLink(par1);
      if(o){
        this.clearSelection();
        this.redraw();
        this.emitEvent('dmlLinkCreated', par1, null);
      }
    }
    if(cmd=='modifyDmlLink'){
      let o=this.modifyMetaLink(par1);
      if(o){
        this.redraw();
        this.emitEvent('dmlLinkChanged', par1, null);
      }
    }
    if(cmd=='getDmlCanvas'){
      return this.canvas;
    }
  }

  public checkPasteTbName(aName: string, bCopies: boolean){
    let res=aName;
    let tbs=this.modelData.Tables.items;
    let cpNo=0;
    if(bCopies){
      res=aName+'_副本';
    }
    tbs.forEach((item:any)=>{
      if(item.Name==res){
        cpNo++;
        if(cpNo>1)
          res=aName+'_副本'+cpNo;
        else
          res=aName+'_副本';
      }
    });
    return res;
  }

  public pasteTables(md:any,pCopies:boolean){
    
    let tbs=this.modelData.Tables.items;
    var maxId=0;
    tbs.forEach((item:any)=>{
      if(item.ID && item.ID>maxId)
        maxId=item.ID;
    });
  
    let reNames={} as any;
    md.items.forEach((tb: any)=>{
      maxId++;
      tb.ID=maxId;
      let nName=this.checkPasteTbName(tb.Name,pCopies);
      if(nName!=tb.Name){
        reNames[tb.Name]=nName;
        tb.Name=nName;
      }
    });
    md.items.forEach((tb: any)=>{
      tb.MetaFields.items.forEach((fd:any)=>{
        if(fd.RelateTable){
          let nName=reNames[fd.RelateTable];
          if(nName){
            fd.RelateTable=nName;
          }
        }
      });
    });
    
    let nTbs=[] as DmlEntityObj[];
    var x1=0,y1=0,x2=0,y2=0;
    let tbNames={} as any;
    md.items.forEach((tb: any,index:number)=>{
      let obj=this.addMetaTable(tb);
      if(obj){
        tbNames[tb.Name]=tb;
        nTbs.push(obj);
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
      }
    });
    
    let dx=this.canvasToContentX(this.lastMouseDownX)-x1;
    let dy=this.canvasToContentY(this.lastMouseDownY)-y1;
    this.clearSelection();
    nTbs.forEach(obj=>{        
      obj.left=obj.left+dx;
      obj.top=obj.top+dy;
      obj.regenGraphicDesc();
      this.addToSelection(obj);
    });

    this.findAllFKLinks(tbNames);
    nTbs.forEach(tb=>{
      tb.resetShape();
    });

    this.checkContentSize();

    this.doSelectObj();
    this.redraw();

    let nTbsE=[] as any;
    nTbs.forEach(obj=>{
      nTbsE.push(obj.metaData);
    });
    this.emitEvent('newDmlTables', nTbsE, null);
  }

  public refresh() {
    this.canvasWidth=this.canvas.width/*nofuse*/;
    this.canvasHeight=this.canvas.height/*nofuse*/;
    this.redraw();
  }

  public resetShapes(){
    this.dmlObjList.forEach(obj=>{
        if(obj.selected){
          obj.resetShape();
        }
      }
    )
    this.refresh();
  }

  public loadDmlModel(modelData: any){
    super.loadDmlModel(modelData);
    if(!this.iconImage)
      this.iconImage=getDmlIconList();
    this.reset();
    if(!this.dmlObjList.some(obj=>{
      if(this.rectInVision(obj.left+obj.width/2-5,obj.top+obj.height/2-5,10,10))
        return true;
    })){
      this.bestFit();
    }
  }

  private createUserEvents() {
      let canvas = this.canvas;

      canvas.addEventListener("mousedown", this.pressEventHandler);
      canvas.addEventListener("mousemove", this.moveOrDragEventHandler);
      canvas.addEventListener("mouseup", this.releaseEventHandler);
      canvas.addEventListener("mouseenter", this.checkEventHandler);
      //canvas.addEventListener("mouseout", this.cancelEventHandler);
      canvas.addEventListener("dblclick", this.dblclickEventHandler);

      canvas.addEventListener("touchstart", this.pressEventHandler);
      canvas.addEventListener("touchmove", this.moveOrDragEventHandler);
      canvas.addEventListener("touchend", this.releaseEventHandler);
      canvas.addEventListener("touchcancel", this.cancelEventHandler);

      canvas.addEventListener("pointerdown", this.pointerDownEventHandler);
      canvas.addEventListener("pointermove", this.pointerMoveEventHandler);
      canvas.addEventListener("pointerup", this.pointerUpEventHandler);

      canvas.addEventListener("wheel", this.mousewheelEventHandler);

      canvas.addEventListener("keydown", this.keydownEventHandler);
      canvas.addEventListener("contextmenu", this.contextMenuEventHandler);
  }

  public redraw() {
    let context = this.cvsContext;
    if(!context)
    {
        setTimeout(this.redraw, 200);
        return;
    }

    context.clearRect(0,0, this.canvasWidth, this.canvasHeight);

    super.redraw();
    
    // context.fillText("d: "+this.lastMouseX+", "+this.lastMouseY
    //     +" contXY: "+this.canvasToContentX(this.lastMouseX)+", " +this.canvasToContentY(this.lastMouseY)
    //     +" canvas: "+this.canvasWidth+", "+this.canvasHeight
    //     +" content: "+this.contentWidth+", "+this.contentHeight,10,30);
    // context.fillText("b: "+this.boundsLeft+", "+this.boundsTop+", "+this.boundsRight+", "+this.boundsBottom,10,50);
    // context.fillText("v: "+this.viewLeftX+", "+this.viewTopY+": "+this.viewScale,10,70);

  }

  public drawSelectRect(){
    let ctx=this.cvsContext;
    ctx.strokeStyle='fuchsia';
    ctx.setLineDash([3]);
    let x1=this.lastMouseDownX, y1=this.lastMouseDownY,x2=this.lastMouseX,y2=this.lastMouseY;
    this.drawVHLine(x1,y1,x2,y1);
    this.drawVHLine(x1,y1,x1,y2);
    this.drawVHLine(x2,y1,x2,y2);
    this.drawVHLine(x1,y2,x2,y2);
    ctx.setLineDash([]);
  }

  protected keydownEventHandler = (e:KeyboardEvent) =>{
    let k=e.key;
    let res=false;
    //console.log('keydown:',k);
    if(!e.shiftKey && !e.ctrlKey && !e.altKey){
      res=true;
      if(k=='r' || k=='R'){
        this.reset(true);
      } else if(k=='f' || k=='F'){
        this.bestFit(true);
      } else if(k=='=' || k=='+'){
        this.zoomIn();
      } else if(k=='-' || k=='_'){
        this.zoomOut();
      } else if(k=='F6'){
        this.resetShapes();
      } else if(k=='ArrowLeft'){
        this.viewLeftX=this.viewLeftX-this.canvasToContentD(this.canvasWidth/5);
        this.refresh();
      } else if(k=='ArrowRight'){
        this.viewLeftX=this.viewLeftX+this.canvasToContentD(this.canvasWidth/5);
        this.refresh();
      } else if(k=='ArrowUp'){
        this.viewTopY=this.viewTopY-this.canvasToContentD(this.canvasHeight/5);
        this.refresh();
      } else if(k=='ArrowDown'){
        this.viewTopY=this.viewTopY+this.canvasToContentD(this.canvasHeight/5);
        this.refresh();
      } else if(k=='PageUp'){
        this.viewTopY=this.viewTopY-this.canvasToContentD(this.canvasHeight*4/5);
        this.refresh();
      } else if(k=='PageDown'){
        this.viewTopY=this.viewTopY+this.canvasToContentD(this.canvasHeight*4/5);
        this.refresh();
      } else if(k=='Delete'){
        this.emitEvent('dmlKeyDown_Delete', this.selectionCount, null);
      } else {
        res=false;
      }
    }
    
    if(!e.shiftKey && e.ctrlKey && !e.altKey){
      if(k=='a' || k=='A'){
        this.selectAll();
        this.refresh();
        res=true;
      }
    }

    if(res)
      e.preventDefault();
  }

  protected contextMenuEventHandler = (e:MouseEvent) =>{
    this.emitEvent('dml_contextmenu', e, null);
    e.preventDefault();
  }

  protected mousewheelEventHandler = (e:WheelEvent) =>{

    if(e.ctrlKey){
      this.mouseWheelCounterZ = this.mouseWheelCounterZ + e.deltaY;
    } else if(e.shiftKey) {
      if(e.deltaY>0 && this.mouseWheelCounterX <0)
        this.mouseWheelCounterX=0;
      else if(e.deltaY<0 && this.mouseWheelCounterX > 0)
        this.mouseWheelCounterX=0;
      this.mouseWheelCounterX = this.mouseWheelCounterX + e.deltaY;
    }
    else {
      if(e.deltaY>0 && this.mouseWheelCounterY <0)
        this.mouseWheelCounterY=0;
      else if(e.deltaY<0 && this.mouseWheelCounterY > 0)
        this.mouseWheelCounterY=0;
      this.mouseWheelCounterY = this.mouseWheelCounterY + e.deltaY;
    }
    this.checkMouseWheelY();
    e.preventDefault();
  }

  public checkMouseWheelY(){
    var res=false;
    
    if(this.mouseWheelCounterZ>=80){
      this.mouseWheelCounterZ-=80;
      this.zoomOut();
      res=true;
    }
    
    if(this.mouseWheelCounterZ<=-80){
      this.mouseWheelCounterZ+=80;
      this.zoomIn();
      res=true;
    }
    
    if(this.mouseWheelCounterY>=80){
      this.mouseWheelCounterY-=80;
      this.viewTopY=this.viewTopY+this.canvasToContentD(80);
      this.refresh();
      res=true;
    }
    
    if(this.mouseWheelCounterY<=-80){
      this.mouseWheelCounterY+=80;
      this.viewTopY=this.viewTopY-this.canvasToContentD(80);
      this.refresh();
      res=true;
    }
    
    if(this.mouseWheelCounterX>=80){
      this.mouseWheelCounterX-=80;
      this.viewLeftX=this.viewLeftX+this.canvasToContentD(80);
      this.refresh();
      res=true;
    }
    
    if(this.mouseWheelCounterX<=-80){
      this.mouseWheelCounterX+=80;
      this.viewLeftX=this.viewLeftX-this.canvasToContentD(80);
      this.refresh();
      res=true;
    }

    if(res){
      setTimeout(this.checkMouseWheelY, 200);
    }
  }

  protected dblclickEventHandler = (e: MouseEvent)=>{
    let mx=this.canvasToContentX(this.lastMouseX);
    let my=this.canvasToContentY(this.lastMouseY);
    let vobj=this.findItemAt(mx,my);
    if(vobj && (vobj as DmlObj).selected){
      //
    } else
      this.bestFitOrReset(mx,my);
    this.emitEvent('dml_dblclick', {mouseX:this.lastMouseX, mouseY:this.lastMouseY}, e);
    e.preventDefault();
  }

  private endMoveDrag(){
    if(this.mouseDowned){
      this.mouseDowned = false;
      this.dmlObjList.forEach(obj=>{
        if(obj instanceof DmlLinkObj){
          (obj as DmlLinkObj).clickPos=0;
        }
      })
      this.redraw();
    }
    this.lastCursor='';
  }

  private releaseEventHandler = (e: MouseEvent | TouchEvent) => {
    if(this.mouseDragAction==DmlMouseDragAction.maRectSel){
      let x1=this.lastMouseDownX
      let y1=this.lastMouseDownY;
      let x2=this.lastMouseX;
      let y2=this.lastMouseY;
      x1=this.canvasToContentX(x1);
      y1=this.canvasToContentY(y1);
      x2=this.canvasToContentX(x2);
      y2=this.canvasToContentY(y2);
      this.selectByRect(x1,y1,x2,y2);
      this.redraw();
    }
    this.endMoveDrag();
    //e.preventDefault();
  }

  private checkEventHandler = (e: MouseEvent) => {
    if(e.buttons != 1 && this.mouseDowned){
      this.endMoveDrag();
    }
  }

  private cancelEventHandler = (e: MouseEvent | TouchEvent) => {
    this.endMoveDrag();
    e.preventDefault();
  }

  private pressEventHandler = (e: MouseEvent | TouchEvent) => {
    this.canvas.focus();
    let mouseX = (e as TouchEvent).changedTouches ?
        (e as TouchEvent).changedTouches[0].pageX :
        (e as MouseEvent).pageX;
    let mouseY = (e as TouchEvent).changedTouches ?
        (e as TouchEvent).changedTouches[0].pageY :
        (e as MouseEvent).pageY;
    mouseX -= this.canvas.offsetLeft;
    mouseY -= this.canvas.offsetTop;

    this.lastMouseX=mouseX;
    this.lastMouseY=mouseY;
    this.lastMouseDownX=mouseX;
    this.lastMouseDownY=mouseY;

    this.mouseDowned = true;
    this.mouseDragAction=DmlMouseDragAction.maAuto;
    let x=this.canvasToContentX(mouseX);
    let y=this.canvasToContentY(mouseY);
    let vobj=this.findItemAt(x,y);
    if((e as MouseEvent).altKey){
      this.mouseDragAction=DmlMouseDragAction.maPan;
    } else if((e as MouseEvent).ctrlKey){
      this.mouseDragAction=DmlMouseDragAction.maRectSel;
    } else if(vobj){
      let obj=vobj as DmlObj;
      if(obj.selected){
        if(!((e as MouseEvent).shiftKey)){
          this.mouseDragAction=DmlMouseDragAction.maMoveObj;
          obj.setClickPoint(x,y,this);
        } else {
          obj.selected=false;
          this.removeFromSelection(obj);
          this.doSelectObj();
          this.refresh();
        }
      } else {
        if(!((e as MouseEvent).shiftKey))
          this.clearSelection();
        this.mouseDragAction=DmlMouseDragAction.maMoveObj;
        this.addToSelection(obj);
        obj.setClickPoint(x,y,this);
        this.doSelectObj();
        this.refresh();
      }
    } else if(!((e as MouseEvent).shiftKey)){
      if(this.clearSelection()){
        this.doSelectObj();
        this.refresh();
      }
    }

    this.emitEvent('dml_click', {mouseX, mouseY, button:(e as MouseEvent).button}, e);
    if(!e.cancelable)
      e.preventDefault();
  }

  private moveOrDragEventHandler = (e: MouseEvent | TouchEvent) => {
    let mouseX = (e as TouchEvent).changedTouches ?
        (e as TouchEvent).changedTouches[0].pageX :
        (e as MouseEvent).pageX;
    let mouseY = (e as TouchEvent).changedTouches ?
        (e as TouchEvent).changedTouches[0].pageY :
        (e as MouseEvent).pageY;
    mouseX -= this.canvas.offsetLeft;
    mouseY -= this.canvas.offsetTop;

    this.doMouseMove(mouseX, mouseY);

    e.preventDefault();
  }

  protected doMouseMove(mouseX:number, mouseY: number){

    let dx=mouseX-this.lastMouseX;
    let dy=mouseY-this.lastMouseY;
    if(Math.abs(dx)<3 && Math.abs(dy)<3)
        return;
    this.lastMouseX=mouseX;
    this.lastMouseY=mouseY;

    if (this.mouseDowned) {
      if(this.mouseDragAction==DmlMouseDragAction.maRectSel){
        this.redraw();
        this.drawSelectRect();
      } else if(this.mouseDragAction==DmlMouseDragAction.maMoveObj){
        this.moveSelection(dx/this._viewScale, dy/this._viewScale);
        this.redraw();
      } else if(this.mouseDragAction==DmlMouseDragAction.maAuto 
        || this.mouseDragAction==DmlMouseDragAction.maPan){
        this._viewLeftX=this._viewLeftX-dx/this._viewScale;
        this._viewTopY=this._viewTopY-dy/this._viewScale;
        this.lastCursor='move';
        this.redraw();
      }
    }
  }

  public pointerDownEventHandler(e:PointerEvent){
    let canvas = this as any;
    canvas.setPointerCapture(e.pointerId);
  }

  public pointerMoveEventHandler(e:PointerEvent){
    //console.log('pointerMoveEventHandler:'+e.clientX+','+e.clientY)
  }

  public pointerUpEventHandler(e:PointerEvent){
    let canvas = this as any;
    canvas.releasePointerCapture(e.pointerId);
  }

}

