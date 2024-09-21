export const newFieldTmpl={
  "Name": "NewField",
  "DisplayName": "新字段",
  "DataType": 1
};

export const newTextTmpl={
    "Name": "Text",
    "Caption": "文字说明",
    "TypeName": "TEXT",
    "Memo": "文字说明",
    "MetaFields": {
      "items": []
    }
  };
export const newGroupBoxTmpl={
    "Name": "Group",
    "Caption": "分组",
    "TypeName": "GROUP",
    "Memo": "分组",
    "MetaFields": {
      "items": []
    }
  };
export const newTableTmpl={
    "Name": "Table",
    "Caption": "数据表",
    "MetaFields": {
      "Count": 11,
      "items": [
        {
          "ID": 1,
          "Name": "Id",
          "OrderNo": 1,
          "DisplayName": "编号",
          "DataType": 2,
          "KeyFieldType": 1
        },
        {
          "ID": 2,
          "Name": "Pid",
          "OrderNo": 2,
          "DisplayName": "父编号",
          "DataType": 2
        },
        {
          "ID": 3,
          "Name": "Rid",
          "OrderNo": 3,
          "DisplayName": "关联编号",
          "DataType": 2,
          "KeyFieldType": 3
        },
        {
          "ID": 4,
          "Name": "Name",
          "OrderNo": 4,
          "DisplayName": "名称",
          "DataType": 1,
          "DataLength": 255
        },
        {
          "ID": 5,
          "Name": "Memo",
          "OrderNo": 5,
          "DisplayName": "注释",
          "DataType": 1
        },
        {
          "ID": 6,
          "Name": "TypeName",
          "OrderNo": 6,
          "DisplayName": "类名",
          "DataType": 1
        },
        {
          "ID": 7,
          "Name": "CreatorId",
          "Memo": "当前用户ID",
          "OrderNo": 7,
          "DisplayName": "创建人编号",
          "DataType": 2,
          "IndexType": 2,
          "Not_Nullable": true
        },
        {
          "ID": 8,
          "Name": "CreatorName",
          "OrderNo": 8,
          "DisplayName": "创建人姓名",
          "DataType": 1
        },
        {
          "ID": 9,
          "Name": "CreateDate",
          "Memo": "默认为当前时间",
          "OrderNo": 9,
          "DisplayName": "创建日期",
          "DataType": 4,
          "DefaultValue": "sysdate"
        },
        {
          "ID": 10,
          "Name": "DataLevel",
          "Memo": "选项：0=正常 1=审核中 2=被否决 -1=已删除 -2=草稿",
          "OrderNo": 10,
          "DisplayName": "数据级别",
          "DataType": 6
        },
        {
          "ID": 11,
          "Name": "OrderNo",
          "OrderNo": 11,
          "DisplayName": "排序号",
          "DataType": 3
        }
      ]
    }
  };