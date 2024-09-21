
import ctrequest from '../Utils/ctrequest';
import {TestDmj703} from './test_dmj.js'

function checkListIds(items){
  if(!items)
    return;

  var idMap={};
  items.forEach(item=>{
    let k='item_'+item.ID;
    if(idMap[k])
      delete item.ID;
    else
      idMap[k]=1;
  });
  
  var maxId=0;
  items.forEach(item=>{
    if(item.ID && item.ID>maxId)
      maxId=item.ID;
  });
  
  items.forEach(item=>{
    if(!item.ID)
      item.ID=++maxId;
  });
}

export function checkDmlDataIds(dmlData){
  if(dmlData.items){
    checkListIds(dmlData.items);
    dmlData.items.forEach(model=>{
      if(model.Tables){
        checkListIds(model.Tables.items);
        model.Tables.items.forEach(table=>{
          if(table.MetaFields){
            checkListIds(table.MetaFields.items);
          }
        })
      }
    })
  }
  return dmlData;
}

export function getDmlTableCount(dmlData){
  let tbC=0;
  if(dmlData.items){
    dmlData.items.forEach(model=>{
      if(model.Tables && model.Tables.items){
        tbC=tbC+model.Tables.items.length;
      }
    })
  }
  return tbC;
}

function sortByOrderNo(items){
  items.sort(function(a,b){
    let od1=a.OrderNo || a.ID;
    let od2=b.OrderNo || b.ID;
    return od1 - od2;
  });
}

function checkSaveList(mList){
  if(mList.items){
    mList.Count=mList.items.length;
    mList.items.forEach((item,index)=>item.OrderNo=index+1);
  }
}
export function checkSaveDmlData(dmlData){
  checkDmlDataIds(dmlData);
  if(dmlData.items){
    checkSaveList(dmlData);
    dmlData.items.forEach(model=>{
      if(model.Tables){
        checkSaveList(model.Tables);
        model.Tables.items.forEach(table=>{
          if(table.MetaFields){
            checkSaveList(table.MetaFields);
          }
        })
      }
    })
  }
}

export const emptyDmlData=()=>{
  return cloneMap({
    "RootName": "DataModels",
    "CTVER": "43543338",
    "Count": 1,
    "items": [{
      "ID": 1,
      "Name": "模型1",
      "OrderNo": 1,
      "Tables": {"items": []}
    }]
  });
}

export const loadDmlData=(url, opt)=>{
  if(url=='demo')
    return Promise.resolve(JSON.stringify(TestDmj703));
  if(url.startsWith('cache://')){
    let fid=opt;
    let data=localStorage.getItem("DmlCacheFile_"+fid);
    return Promise.resolve(data);
  }
  if(url.startsWith('file://')){
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        let s=event.target.result;
        resolve(s);
      }
      reader.readAsText(opt);
    });
  }
  if(url.startsWith("/") || url.startsWith('http://') || url.startsWith('https://')){
    if(!opt)
      opt={};
    if(!opt.url)
      opt.url=url;
    if(!opt.ctname)
      opt.ctname='加载模型文件';
    if(opt.url.indexOf('?')>=0)
      opt.url=opt.url+'&uid='+getDmlUid();
    else
      opt.url=opt.url+'?uid='+getDmlUid();
    return new Promise((resolve, reject) => {
      ctrequest(opt).then(res=>{
        if(typeof res=='object')
          resolve(JSON.stringify(res));
        else
          resolve(res);
      });
    });
  }
  return Promise.reject('url not supported: '+url);
};

export const getDmlItemByName=(items, name)=>{
  var res=null;
  items.some(item=>{
    if(item.Name==name){
      res=item;
      return true;
    }
  })
  return res;
};

export const getDmlItemById=(items, id)=>{
  var res=null;
  items.some(item=>{
    if(item.ID==id){
      res=item;
      return true;
    }
  })
  return res;
};

const checkNewTableName=(dmlData, tbNew)=>{
  tbNew._EZRESERVED_ISNEW=true;
  
  let mds=dmlData.content.items;
  
  var maxId=0;
  dmlData.curModel.Tables.items.forEach(item=>{
    if(item.ID && item.ID>maxId)
      maxId=item.ID;
  });
  tbNew.ID=maxId+1;
  
  let tbName=tbNew.Name;
  let tbNo=0;
  while(tbNo<10000){
    tbNo++;
    let bFound=mds.some(md=>{
      if(md.Tables.items.some(tb=>tb.Name==tbName+'_'+tbNo))
        return true;
    });
    if(!bFound){
      tbNew.Name=tbName+'_'+tbNo;
      if(tbNew.Caption)
        tbNew.Caption=tbNew.Caption+'_'+tbNo;
      return true;
    }
  }
  return false;
}

export const processDmlDataEvent=(dmlData, evt, par1, par2)=>{
  if(evt=='tableChanged'){
    syncOnTableChanged(dmlData, par1, par2);
  }
  if(evt=='tableColorChanged'){
    syncOnTableColorChanged(dmlData, par1, par2);
  }
  if(evt=='checkNewTableName'){
    checkNewTableName(dmlData, par1);
  }
}


const syncOnTableColorChanged=(dmlData, tbNew, color)=>{
  let oName=tbNew.Name;
  let mds=dmlData.content.items;
  mds.forEach(md=>{
    md.Tables.items.forEach(tb=>{
      if(tb.Name==oName){
        if(tb!=tbNew)
          tb.BgColor=color;
        return true;
      }
    })
  });
};

const syncOnTableChanged=(dmlData, tbNew, tbOld)=>{
  let oName=tbOld.Name;
  let fNames={};
  let fNameChgd=false;
  tbOld.MetaFields.items.forEach(fd=>{
    let nfd=getDmlItemById(tbNew.MetaFields.items, fd.ID);
    if(nfd && nfd.Name!=fd.Name){
      fNames[fd.Name]=nfd.Name;
      fNameChgd=true;
    }
  });
  let mds=dmlData.content.items;
  mds.forEach(md=>{
    md.Tables.items.forEach(tb=>{
      if(tb.Name==oName){
        if(tb!=tbNew)
          syncTbInfo(tbNew, tb);
        return true;
      } else if(fNameChgd){
        //改了表名，需要更新关联外键
        tb.MetaFields.items.forEach(fd=>{
          if(fd.RelateTable==oName){
            fd.RelateTable=tbNew.Name;
            if(fd.RelateField && fNames[fd.RelateField]){
              fd.RelateField = fNames[fd.RelateField];
            }
          }
        });
      }
    })
  });
};

export const syncTbInfo=(tbSrc, tbDst)=>{
  syncMapInfo(tbSrc, tbDst);
  var dfs=tbDst.MetaFields.items;
  checkSaveList(tbSrc.MetaFields);
  tbSrc.MetaFields.items.forEach(fdSrc=>{
    let fdDst=getDmlItemByName(dfs,fdSrc._EZRESERVED_ORD_NAME||fdSrc.Name);
    if(!fdDst){
      fdDst={};
      dfs.push(fdDst);
    }
    syncMapInfo(fdSrc,fdDst);
  });
  
  //删除不存在的字段
  for(var idx = dfs.length-1; idx>=0; idx--){
    let fdDst=dfs[idx];
    let fdSrc=getDmlItemByName(tbSrc.MetaFields.items,fdDst.Name);
    if(!fdSrc){
      dfs.splice(idx,1);
    }
  }

  sortByOrderNo(tbDst.MetaFields.items);

  tbDst.MetaFields.Count=tbDst.MetaFields.items.length;
}

export const syncMapInfo=(mSrc, mDst)=>{
  let id=mDst.ID;
  let graphDsc=mDst.GraphDesc;
  for(var p in mSrc){
    if(p.startsWith('_EZRESERVED_'))
      continue;
    if(typeof mSrc[p] != 'object')
      mDst[p]=mSrc[p];
  }
  let toDels=[];
  for(var p in mDst){
    if(p.startsWith('_EZRESERVED_'))
      continue;
    if(! mSrc[p])
      toDels.push(p);
  }
  toDels.forEach(p=>{
    delete mDst[p];
  });
  mDst.ID=id;
  mDst.GraphDesc=graphDsc;
}

export const cloneMap=(jmap)=>{
  let js=JSON.stringify(jmap);
  let res=JSON.parse(js);
  return res;
}

export function genCtGuid() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
}

var gDmlUid='';
export function getDmlUid(){
  if(!gDmlUid){
    gDmlUid=localStorage.getItem("DmlUid");
    if(!gDmlUid){
      gDmlUid=genCtGuid();
      localStorage.setItem("DmlUid", gDmlUid);
    }
  }
  return gDmlUid;
}


var gDmlFileHistory=null;
export function getDmlFileHistory(){
  if(!gDmlFileHistory){
    let s=localStorage.getItem("DmlFileHistory");
    gDmlFileHistory=JSON.parse(s);
    if(!gDmlFileHistory){
      gDmlFileHistory=[];
    }
  }
  return gDmlFileHistory;
}

export function setDmlFileHistory(fid, name, size, url, lastDate,memo){
  let fi={FILE_GUID:fid,NAME:name,FILE_SIZE:size,SHARE_URL:url,LASTDATE:lastDate,VISIT_COUNTER:1,MEMO:memo};
  let idx=-1;
  let vCount=0;
  let oMemo='';
  getDmlFileHistory();
  gDmlFileHistory.some((fh,index)=>{
    if(fh.FILE_GUID==fid){
      idx=index;
      vCount=fh.VISIT_COUNTER;
      oMemo=fh.MEMO;
      return true;
    }
  });
  if(idx>=0){
    gDmlFileHistory.splice(idx,1);
    fi.VISIT_COUNTER=vCount+1;
    if(!memo)
      fi.MEMO=oMemo;
  }
  gDmlFileHistory.splice(0,0,fi);
  localStorage.setItem("DmlFileHistory", JSON.stringify(gDmlFileHistory));
}

var gDmlCacheFiles=null;
export function getDmlCacheFiles(){
  if(!gDmlCacheFiles){
    let s=localStorage.getItem("DmlCacheFiles");
    gDmlCacheFiles=JSON.parse(s);
    if(!gDmlCacheFiles){
      gDmlCacheFiles=[];
      for(var i=1;i<=5;i++){
        saveDmlCacheFile('No'+i, '', '', '');
      }
    }
  }
  return gDmlCacheFiles;
}

export function saveDmlCacheFile(fid, name, size, url, createDate, data){
  let fi={FILE_GUID:fid,NAME:name,FILE_SIZE:size,SHARE_URL:url,CREATEDATE:createDate,VISIT_COUNTER:null,MEMO:fid};
  let idx=-1;
  getDmlCacheFiles();
  gDmlCacheFiles.some((fh,index)=>{
    if(fh.FILE_GUID==fid){
      idx=index;
      return true;
    }
  });
  if(idx>=0){
    gDmlCacheFiles.splice(idx,1, fi);
  } else
    gDmlCacheFiles.push(fi);
  localStorage.setItem("DmlCacheFiles", JSON.stringify(gDmlCacheFiles));
  if(data)
    localStorage.setItem("DmlCacheFile_"+fid, data);
}
