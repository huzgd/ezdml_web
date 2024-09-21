export const TestDmj703=
{
  "RootName": "DataModels",
  "CTVER": "43543338",
  "TableCount": 43,
  "Count": 3,
  "items": [
    {
      "ID": 13,
      "Name": "Welcome",
      "Caption": "欢迎",
      "CreateDate": "2020-03-14 23:46:50",
      "OrderNo": 1,
      "CustomAttr1": "DVS:-57.00,-920.00,1.00,0,",
      "Tables": {
        "Count": 6,
        "items": [
          {
            "ID": 27,
            "Name": "欢迎文本",
            "TypeName": "TEXT",
            "Memo": " _    _      _                                     \r\n| |  | |    | |                           _        \r\n| |  | | ___| | ___ ___  _ __ ___   ___  | |_ ___  \r\n| |/\\| |/ _ \\ |/ __/ _ \\| '_ ` _ \\ / _ \\ | __/ _ \\ \r\n\\  /\\  /  __/ | (_| (_) | | | | | |  __/ | || (_) |\r\n \\/  \\/ \\___|_|\\___\\___/|_| |_| |_|\\___|  \\__\\___/ \r\n  _____ ______________  ___ _                      \r\n |  ___|___  /  _  \\  \\/  || |                     \r\n | |__    / /| | | | .  . || |                     \r\n |  __|  / / | | | | |\\/| || |                     \r\n | |___./ /__| |/ /| |  | || |____                 \r\n \\____/\\_____/___/ \\_|  |_/\\_____/                 \r\n                                                   \r\n                                                   \r\n欢迎使用EZDML Web版！\r\n\r\n.支持在线查看模型并进行简单的设计\r\n.在线分享模型设计，可将模型数据加密后分享\r\n.支持手机、平板、电脑等主流浏览器\r\n.与EZDML桌面版格式兼容，可互相复制粘贴数据\r\n\r\n这是一个DEMO演示文件！更多高级功能，请下载EZDML桌面版体验",
            "CreateDate": "2024-08-08 16:20:49",
            "OrderNo": 1,
            "GraphDesc": "Left=28.00\r\nTop=22.00\r\nWidth=528.00\r\nHeight=370.00\r\nAutoSize=0",
            "BgColor": 16777215,
            "MetaFields": {"items": []}
          },
          {
            "ID": 1,
            "Name": "TCtDataModelGraphList",
            "Caption": "模型图列表",
            "CreateDate": "2019-10-31 23:29:36",
            "OrderNo": 2,
            "GraphDesc": "Left=30.00\r\nTop=425.00",
            "BgColor": 16764108,
            "MetaFields": {
              "Count": 7,
              "items": [
                {
                  "ID": 56,
                  "Name": "Id",
                  "OrderNo": 1,
                  "DisplayName": "编号",
                  "DataType": 1,
                  "KeyFieldType": 1
                },
                {
                  "ID": 23,
                  "Name": "LoadFromFile",
                  "OrderNo": 2,
                  "DisplayName": "加载文件",
                  "DataType": 11
                },
                {
                  "ID": 24,
                  "Name": "SaveToFile",
                  "OrderNo": 3,
                  "DisplayName": "保存到文件",
                  "DataType": 11
                },
                {
                  "ID": 27,
                  "Name": "CurDataModel",
                  "OrderNo": 4,
                  "DisplayName": "当前模型",
                  "DataType": 8
                },
                {
                  "ID": 26,
                  "Name": "NewModelItem",
                  "OrderNo": 5,
                  "DisplayName": "创建新的模型",
                  "DataType": 11
                },
                {
                  "ID": 7,
                  "Name": "Count",
                  "OrderNo": 6,
                  "DisplayName": "数量",
                  "DataType": 2
                },
                {
                  "ID": 6,
                  "Name": "Items",
                  "OrderNo": 7,
                  "DisplayName": "模型项",
                  "DataType": 1,
                  "DataTypeName": "LI"
                }
              ]
            }
          },
          {
            "ID": 2,
            "Name": "TCtDataModelGraph",
            "Caption": "模型图",
            "CreateDate": "2019-10-31 23:37:15",
            "OrderNo": 3,
            "GraphDesc": "Left=44.00\r\nTop=610.00",
            "BgColor": 16772863,
            "MetaFields": {
              "Count": 10,
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
                  "ID": 49,
                  "Name": "Rid",
                  "OrderNo": 2,
                  "DisplayName": "所属模型列表",
                  "DataType": 1
                },
                {
                  "ID": 4,
                  "Name": "Name",
                  "OrderNo": 3,
                  "DisplayName": "名称",
                  "DataType": 1
                },
                {
                  "ID": 33,
                  "Name": "DisplayName",
                  "OrderNo": 4,
                  "DisplayName": "显示名称",
                  "DataType": 1
                },
                {
                  "ID": 34,
                  "Name": "GraphWidth",
                  "OrderNo": 5,
                  "DisplayName": "图形区宽度",
                  "DataType": 2
                },
                {
                  "ID": 35,
                  "Name": "GraphHeight",
                  "OrderNo": 6,
                  "DisplayName": "图形区高度",
                  "DataType": 2
                },
                {
                  "ID": 36,
                  "Name": "DefDbEngine",
                  "OrderNo": 7,
                  "DisplayName": "缺省数据连接",
                  "DataType": 1
                },
                {
                  "ID": 37,
                  "Name": "DbConnectStr",
                  "OrderNo": 8,
                  "DisplayName": "数据连接名",
                  "DataType": 1
                },
                {
                  "ID": 38,
                  "Name": "ConfigStr",
                  "OrderNo": 9,
                  "DisplayName": "选项设置串",
                  "DataType": 1,
                  "RelateTable": "TCtDataModelGraphList",
                  "RelateField": "{Link:Direct}",
                  "GraphDesc": "P1=151.00,559.00\r\nP2=151.00,584.00\r\nP3=151.00,584.00\r\nP4=151.00,610.00\r\nHookP1=121.00,114.00\r\nHookP2=107.00,20.00\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=0\r\nHorz2=0"
                },
                {
                  "ID": 39,
                  "Name": "Tables",
                  "OrderNo": 10,
                  "DisplayName": "数据表",
                  "DataType": 10
                }
              ]
            }
          },
          {
            "ID": 3,
            "Name": "TCtMetaTable",
            "Caption": "数据表",
            "CreateDate": "2019-10-31 23:42:15",
            "OrderNo": 4,
            "GraphDesc": "Left=350.00\r\nTop=445.00",
            "BgColor": 15663086,
            "MetaFields": {
              "Count": 19,
              "items": [
                {
                  "ID": 96,
                  "Name": "Id",
                  "OrderNo": 1,
                  "DisplayName": "编号",
                  "DataType": 1,
                  "KeyFieldType": 1
                },
                {
                  "ID": 132,
                  "Name": "Rid",
                  "OrderNo": 2,
                  "DisplayName": "所属模型",
                  "DataType": 1,
                  "KeyFieldType": 3,
                  "RelateTable": "TCtDataModelGraph",
                  "RelateField": "Id",
                  "GraphDesc": "P1=258.00,690.00\r\nP2=304.00,690.00\r\nP3=304.00,690.00\r\nP4=350.00,690.00\r\nHookP1=186.00,80.00\r\nHookP2=28.00,245.00\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1"
                },
                {
                  "ID": 98,
                  "Name": "Name",
                  "OrderNo": 3,
                  "DisplayName": "名称",
                  "DataType": 1
                },
                {
                  "ID": 12,
                  "Name": "UIDisplayText",
                  "OrderNo": 4,
                  "DisplayName": "界面显示名",
                  "DataType": 1
                },
                {
                  "ID": 116,
                  "Name": "TypeName",
                  "OrderNo": 5,
                  "DisplayName": "类型",
                  "DataType": 1
                },
                {
                  "ID": 13,
                  "Name": "GenDatabase",
                  "OrderNo": 6,
                  "DisplayName": "是否生成数据库",
                  "DataType": 5
                },
                {
                  "ID": 14,
                  "Name": "GenCode",
                  "OrderNo": 7,
                  "DisplayName": "是否生成代码",
                  "DataType": 5
                },
                {
                  "ID": 117,
                  "Name": "Describe",
                  "OrderNo": 8,
                  "DisplayName": "描述字",
                  "DataType": 1
                },
                {
                  "ID": 15,
                  "Name": "ExtraSQL",
                  "OrderNo": 9,
                  "DisplayName": "额外的数据库SQL",
                  "DataType": 1
                },
                {
                  "ID": 16,
                  "Name": "UILogic",
                  "OrderNo": 10,
                  "DisplayName": "前端界面逻辑",
                  "DataType": 1
                },
                {
                  "ID": 17,
                  "Name": "BusinessLogic",
                  "OrderNo": 11,
                  "DisplayName": "后端业务逻辑",
                  "DataType": 1
                },
                {
                  "ID": 18,
                  "Name": "ExtraProps",
                  "OrderNo": 12,
                  "DisplayName": "扩展属性",
                  "DataType": 1
                },
                {
                  "ID": 120,
                  "Name": "GraphDesc",
                  "OrderNo": 13,
                  "DisplayName": "图形描述",
                  "DataType": 1
                },
                {
                  "ID": 121,
                  "Name": "ScriptRules",
                  "OrderNo": 14,
                  "DisplayName": "脚本配置",
                  "DataType": 1
                },
                {
                  "ID": 122,
                  "Name": "CustomConfigs",
                  "OrderNo": 15,
                  "DisplayName": "自定义配置",
                  "DataType": 1
                },
                {
                  "ID": 118,
                  "Name": "MetaFields",
                  "OrderNo": 16,
                  "DisplayName": "字段列表",
                  "DataType": 10
                },
                {
                  "ID": 119,
                  "Name": "Memo",
                  "OrderNo": 17,
                  "DisplayName": "备注",
                  "DataType": 1
                },
                {
                  "ID": 143,
                  "Name": "GenSql",
                  "OrderNo": 18,
                  "DisplayName": "生成SQL",
                  "DataType": 11
                },
                {
                  "ID": 19,
                  "Name": "JsonStr",
                  "OrderNo": 19,
                  "DisplayName": "表JSON字符串",
                  "DataType": 11
                }
              ]
            }
          },
          {
            "ID": 4,
            "Name": "TCtMetaField",
            "Caption": "数据字段",
            "CreateDate": "2019-10-31 23:48:04",
            "OrderNo": 5,
            "GraphDesc": "Left=697.00\r\nTop=367.00",
            "BgColor": 15663103,
            "MetaFields": {
              "Count": 69,
              "items": [
                {
                  "ID": 260,
                  "Name": "Id",
                  "OrderNo": 1,
                  "DisplayName": "编号",
                  "DataType": 1,
                  "KeyFieldType": 1
                },
                {
                  "ID": 261,
                  "Name": "Rid",
                  "OrderNo": 2,
                  "DisplayName": "所属表",
                  "DataType": 1,
                  "KeyFieldType": 3,
                  "RelateTable": "TCtMetaTable",
                  "RelateField": "Id",
                  "GraphDesc": "P1=609.00,608.00\r\nP2=653.00,608.00\r\nP3=653.00,608.00\r\nP4=697.00,608.00\r\nHookP1=239.00,163.00\r\nHookP2=20.00,241.00\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1"
                },
                {
                  "ID": 262,
                  "Name": "Name",
                  "OrderNo": 3,
                  "DisplayName": "名称",
                  "DataType": 1
                },
                {
                  "ID": 263,
                  "Name": "DisplayName",
                  "OrderNo": 4,
                  "DisplayName": "显示名称",
                  "DataType": 1
                },
                {
                  "ID": 264,
                  "Name": "DataType",
                  "OrderNo": 5,
                  "DisplayName": "数据类型",
                  "DataType": 6
                },
                {
                  "ID": 265,
                  "Name": "DataTypeName",
                  "OrderNo": 6,
                  "DisplayName": "数据类型",
                  "DataType": 1
                },
                {
                  "ID": 266,
                  "Name": "KeyFieldType",
                  "OrderNo": 7,
                  "DisplayName": "关键字段类型",
                  "DataType": 6
                },
                {
                  "ID": 267,
                  "Name": "RelateTable",
                  "OrderNo": 8,
                  "DisplayName": "关联表",
                  "DataType": 1
                },
                {
                  "ID": 268,
                  "Name": "RelateField",
                  "OrderNo": 9,
                  "DisplayName": "关联字段",
                  "DataType": 1
                },
                {
                  "ID": 269,
                  "Name": "IndexType",
                  "OrderNo": 10,
                  "DisplayName": "索引类型",
                  "DataType": 6
                },
                {
                  "ID": 48,
                  "Name": "IndexFields",
                  "OrderNo": 11,
                  "DisplayName": "索引字段",
                  "DataType": 1
                },
                {
                  "ID": 49,
                  "Name": "DBCheck",
                  "OrderNo": 12,
                  "DisplayName": "数据库检查",
                  "DataType": 1
                },
                {
                  "ID": 270,
                  "Name": "Hint",
                  "OrderNo": 13,
                  "DisplayName": "提示",
                  "DataType": 1
                },
                {
                  "ID": 50,
                  "Name": "ExplainText",
                  "OrderNo": 14,
                  "DisplayName": "说明文字",
                  "DataType": 1
                },
                {
                  "ID": 271,
                  "Name": "Memo",
                  "OrderNo": 15,
                  "DisplayName": "备注",
                  "DataType": 1
                },
                {
                  "ID": 272,
                  "Name": "DefaultValue",
                  "OrderNo": 16,
                  "DisplayName": "缺省值",
                  "DataType": 1
                },
                {
                  "ID": 273,
                  "Name": "Nullable",
                  "OrderNo": 17,
                  "DisplayName": "是否可为空",
                  "DataType": 5
                },
                {
                  "ID": 274,
                  "Name": "DataLength",
                  "OrderNo": 18,
                  "DisplayName": "最大长度",
                  "DataType": 2
                },
                {
                  "ID": 275,
                  "Name": "Url",
                  "OrderNo": 19,
                  "DisplayName": "链接",
                  "DataType": 1
                },
                {
                  "ID": 276,
                  "Name": "ResType",
                  "OrderNo": 20,
                  "DisplayName": "资源类型",
                  "DataType": 1
                },
                {
                  "ID": 277,
                  "Name": "Formula",
                  "OrderNo": 21,
                  "DisplayName": "公式",
                  "DataType": 1
                },
                {
                  "ID": 278,
                  "Name": "FormulaCondition",
                  "OrderNo": 22,
                  "DisplayName": "公式条件",
                  "DataType": 1
                },
                {
                  "ID": 279,
                  "Name": "AggregateFun",
                  "OrderNo": 23,
                  "DisplayName": "汇总函数",
                  "DataType": 1
                },
                {
                  "ID": 280,
                  "Name": "MeasureUnit",
                  "OrderNo": 24,
                  "DisplayName": "计量单位",
                  "DataType": 1
                },
                {
                  "ID": 281,
                  "Name": "ValidateRule",
                  "OrderNo": 25,
                  "DisplayName": "字段值检查规则",
                  "DataType": 1
                },
                {
                  "ID": 282,
                  "Name": "EditorType",
                  "OrderNo": 26,
                  "DisplayName": "编辑器类型",
                  "DataType": 1
                },
                {
                  "ID": 283,
                  "Name": "LabelText",
                  "OrderNo": 27,
                  "DisplayName": "标签文字",
                  "DataType": 1
                },
                {
                  "ID": 284,
                  "Name": "EditorReadOnly",
                  "OrderNo": 28,
                  "DisplayName": "编辑器是否只读",
                  "DataType": 5
                },
                {
                  "ID": 285,
                  "Name": "EditorEnabled",
                  "OrderNo": 29,
                  "DisplayName": "编辑器是否激活",
                  "DataType": 5
                },
                {
                  "ID": 286,
                  "Name": "DisplayFormat",
                  "OrderNo": 30,
                  "DisplayName": "显示格式",
                  "DataType": 1
                },
                {
                  "ID": 287,
                  "Name": "EditFormat",
                  "OrderNo": 31,
                  "DisplayName": "输入格式",
                  "DataType": 1
                },
                {
                  "ID": 288,
                  "Name": "FontName",
                  "OrderNo": 32,
                  "DisplayName": "字体名称",
                  "DataType": 1
                },
                {
                  "ID": 289,
                  "Name": "FontSize",
                  "OrderNo": 33,
                  "DisplayName": "字体大小",
                  "DataType": 3
                },
                {
                  "ID": 290,
                  "Name": "FontStyle",
                  "OrderNo": 34,
                  "DisplayName": "字体样式",
                  "DataType": 2
                },
                {
                  "ID": 291,
                  "Name": "ForeColor",
                  "OrderNo": 35,
                  "DisplayName": "前景颜色",
                  "DataType": 2
                },
                {
                  "ID": 292,
                  "Name": "BackColor",
                  "OrderNo": 36,
                  "DisplayName": "背景颜色",
                  "DataType": 2
                },
                {
                  "ID": 293,
                  "Name": "DropDownItems",
                  "OrderNo": 37,
                  "DisplayName": "下拉列表",
                  "DataType": 1
                },
                {
                  "ID": 294,
                  "Name": "DropDownMode",
                  "OrderNo": 38,
                  "DisplayName": "下拉模式",
                  "DataType": 6
                },
                {
                  "ID": 190,
                  "Name": "Visibility",
                  "OrderNo": 39,
                  "DisplayName": "显示级别",
                  "DataType": 2
                },
                {
                  "ID": 191,
                  "Name": "TextAlign",
                  "OrderNo": 40,
                  "DisplayName": "文字对齐",
                  "DataType": 6
                },
                {
                  "ID": 192,
                  "Name": "ColWidth",
                  "OrderNo": 41,
                  "DisplayName": "列宽",
                  "DataType": 2
                },
                {
                  "ID": 193,
                  "Name": "MaxLength",
                  "OrderNo": 42,
                  "DisplayName": "最大长度",
                  "DataType": 2
                },
                {
                  "ID": 194,
                  "Name": "Searchable",
                  "OrderNo": 43,
                  "DisplayName": "是否可搜索",
                  "DataType": 5
                },
                {
                  "ID": 195,
                  "Name": "Queryable",
                  "OrderNo": 44,
                  "DisplayName": "是否可查询",
                  "DataType": 5
                },
                {
                  "ID": 196,
                  "Name": "InitValue",
                  "OrderNo": 45,
                  "DisplayName": "初始值",
                  "DataType": 1
                },
                {
                  "ID": 199,
                  "Name": "ValueFormat",
                  "OrderNo": 46,
                  "DisplayName": "值格式类型",
                  "DataType": 1
                },
                {
                  "ID": 197,
                  "Name": "ValueMin",
                  "OrderNo": 47,
                  "DisplayName": "最小值",
                  "DataType": 1
                },
                {
                  "ID": 198,
                  "Name": "ValueMax",
                  "OrderNo": 48,
                  "DisplayName": "最大值",
                  "DataType": 1
                },
                {
                  "ID": 51,
                  "Name": "IsHidden",
                  "OrderNo": 49,
                  "DisplayName": "是否隐藏",
                  "DataType": 5
                },
                {
                  "ID": 52,
                  "Name": "HideOnList",
                  "Memo": "是否在列表中默认隐藏（可手工选择显示）",
                  "OrderNo": 50,
                  "DisplayName": "列表中隐藏",
                  "DataType": 1
                },
                {
                  "ID": 53,
                  "Name": "HideOnEdit",
                  "OrderNo": 51,
                  "DisplayName": "编辑时隐藏",
                  "DataType": 5
                },
                {
                  "ID": 54,
                  "Name": "HideOnView",
                  "OrderNo": 52,
                  "DisplayName": "查看时隐藏",
                  "DataType": 5
                },
                {
                  "ID": 55,
                  "Name": "EditorProps",
                  "OrderNo": 53,
                  "DisplayName": "其它编辑器属性",
                  "DataType": 1
                },
                {
                  "ID": 56,
                  "Name": "SheetGroup",
                  "OrderNo": 54,
                  "DisplayName": "表单分组",
                  "DataType": 1
                },
                {
                  "ID": 57,
                  "Name": "ColGroup",
                  "OrderNo": 55,
                  "DisplayName": "列表头分组",
                  "DataType": 1
                },
                {
                  "ID": 58,
                  "Name": "FixColType",
                  "OrderNo": 56,
                  "DisplayName": "冻结列类型",
                  "DataType": 6
                },
                {
                  "ID": 59,
                  "Name": "AutoMerge",
                  "OrderNo": 57,
                  "DisplayName": "自动合并列",
                  "DataType": 5
                },
                {
                  "ID": 60,
                  "Name": "ShowFilterBox",
                  "OrderNo": 58,
                  "DisplayName": "显示列过滤钮",
                  "DataType": 5
                },
                {
                  "ID": 61,
                  "Name": "ColSortable",
                  "OrderNo": 59,
                  "DisplayName": "显示列排序钮",
                  "DataType": 5
                },
                {
                  "ID": 62,
                  "Name": "DropDownSQL",
                  "OrderNo": 60,
                  "DisplayName": "下拉SQL",
                  "DataType": 1
                },
                {
                  "ID": 63,
                  "Name": "ItemColCount",
                  "Memo": "对复选列表、单选列表、按钮列表等有效",
                  "OrderNo": 61,
                  "DisplayName": "每行分几列",
                  "DataType": 2
                },
                {
                  "ID": 64,
                  "Name": "TextClipSize",
                  "Memo": "多行文本，显示“更多”按钮",
                  "OrderNo": 62,
                  "DisplayName": "裁剪内容长度",
                  "DataType": 2
                },
                {
                  "ID": 65,
                  "Name": "Required",
                  "OrderNo": 63,
                  "DisplayName": "必填",
                  "DataType": 5
                },
                {
                  "ID": 66,
                  "Name": "AutoTrim",
                  "OrderNo": 64,
                  "DisplayName": "自动去除空格",
                  "DataType": 5
                },
                {
                  "ID": 67,
                  "Name": "TestDataRules",
                  "OrderNo": 65,
                  "DisplayName": "生成测试数据规则",
                  "DataType": 1
                },
                {
                  "ID": 68,
                  "Name": "UILogic",
                  "OrderNo": 66,
                  "DisplayName": "前端界面逻辑",
                  "DataType": 1
                },
                {
                  "ID": 69,
                  "Name": "BusinessLogic",
                  "OrderNo": 67,
                  "DisplayName": "后端业务逻辑",
                  "DataType": 1
                },
                {
                  "ID": 200,
                  "Name": "ExtraProps",
                  "OrderNo": 68,
                  "DisplayName": "扩展属性",
                  "DataType": 1
                },
                {
                  "ID": 201,
                  "Name": "CustomConfigs",
                  "OrderNo": 69,
                  "DisplayName": "自定义配置",
                  "DataType": 1
                }
              ]
            }
          },
          {
            "ID": 5,
            "Name": "说明2",
            "TypeName": "TEXT",
            "Memo": "说明：\r\n●模型图、表、字段是EZDML的核心对象\r\n●一个DML文件就对应了一个模型图列表 （AllModels），\r\n包含多个模型图\r\n●通过模型图列表对象的getItem(i)（PAS里是Items[i]），\r\n可以遍历获取模型图对象\r\n●模型图对象的tables属性是一个列表对象，可通过它的\r\ngetItem(i)（PAS里是Items[i]）遍历获取数据表对象\r\n●表对象的metaFields属性是一个列表对象，可通过它的\r\ngetItem(i)（PAS里是Items[i]）遍历获取数据字段对象",
            "CreateDate": "2020-03-15 00:11:13",
            "OrderNo": 6,
            "GraphDesc": "Left=983.00\r\nTop=396.00",
            "BgColor": 16185078,
            "MetaFields": {"items": []}
          }
        ]
      }
    },
    {
      "ID": 3,
      "Name": "user",
      "Caption": "用户",
      "CreateDate": "2017-08-02 11:28:26",
      "OrderNo": 2,
      "Tables": {
        "Count": 14,
        "items": [
          {
            "ID": 15,
            "Name": "member",
            "Caption": "会员",
            "OrderNo": 1,
            "GraphDesc": "Left=33.00\r\nTop=61.00",
            "BgColor": 15724510,
            "MetaFields": {
              "Count": 32,
              "items": [
                {
                  "ID": 26,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "RelateTable": "users",
                  "RelateField": "id",
                  "Not_Nullable": true,
                  "GraphDesc": "P1=379.00,444.00\r\nP2=328.00,444.00\r\nP3=328.00,444.00\r\nP4=277.00,444.00\r\nHookP1=36.00,24.00\r\nHookP2=224.00,383.00\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1"
                },
                {
                  "ID": 19,
                  "Name": "name",
                  "OrderNo": 2,
                  "DisplayName": "姓名",
                  "DataType": 1,
                  "DataLength": 255,
                  "AggregateFun": "Text:合计",
                  "ColWidth": 79,
                  "FixColType": 1,
                  "ColSortable": true,
                  "Required": true,
                  "TestDataType": "person_fullname_cn"
                },
                {
                  "ID": 24,
                  "Name": "username",
                  "OrderNo": 3,
                  "DisplayName": "用户名",
                  "DataType": 1,
                  "IndexType": 1,
                  "Hint": "请输入用户名",
                  "Not_Nullable": true,
                  "DataLength": 255,
                  "AggregateFun": "Text:记录数: %Count%",
                  "ExplainText": "由字母、数字或下划线组成，必须以字母开头",
                  "FixColType": 1,
                  "ColSortable": true,
                  "TestDataType": "login_name",
                  "TestDataRules": "\r\n",
                  "FieldWeight": 1
                },
                {
                  "ID": 17,
                  "Name": "gender",
                  "OrderNo": 4,
                  "DisplayName": "性别",
                  "DataType": 2,
                  "EditorType": "RadioBox",
                  "DropDownItems": "男\r\n女\r\n",
                  "ColWidth": 82,
                  "ShowFilterBox": true,
                  "TestDataType": "gendor"
                },
                {
                  "ID": 18,
                  "Name": "mobile",
                  "OrderNo": 5,
                  "DisplayName": "手机",
                  "DataType": 1,
                  "IndexType": 1,
                  "DataLength": 255,
                  "ColWidth": 117,
                  "FixColType": 1,
                  "Required": true,
                  "TestDataType": "cell_phone",
                  "FieldWeight": 1
                },
                {
                  "ID": 28,
                  "Name": "memberRank_id",
                  "OrderNo": 6,
                  "DisplayName": "会员等级",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "memberrank",
                  "RelateField": "id",
                  "IndexType": 2,
                  "Not_Nullable": true,
                  "EditorType": "ButtonGroup",
                  "LabelText": "会员VIP等级",
                  "GraphDesc": "P1=368.00,141.00\r\nP2=322.00,141.00\r\nP3=322.00,141.00\r\nP4=277.00,141.00\r\nHookP1=20.00,75.00\r\nHookP2=216.00,80.00\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1",
                  "ColWidth": 129,
                  "ShowFilterBox": true
                },
                {
                  "ID": 29,
                  "Name": "isEnabled",
                  "OrderNo": 7,
                  "DisplayName": "是否启用",
                  "DataType": 9,
                  "RelateTable": "users",
                  "RelateField": "isEnabled",
                  "GraphDesc": "P1=356.00,468.00\r\nP2=305.00,468.00\r\nP3=305.00,468.00\r\nP4=254.00,468.00\r\nHookP1=36.00,99.00\r\nHookP2=224.00,458.00\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1",
                  "ColWidth": 111,
                  "ShowFilterBox": true,
                  "FieldWeight": -1
                },
                {
                  "ID": 30,
                  "Name": "isLocked",
                  "OrderNo": 8,
                  "DisplayName": "锁定",
                  "DataType": 9,
                  "RelateTable": "users",
                  "RelateField": "isLocked",
                  "EditorType": "Switch",
                  "ColWidth": 79,
                  "ColSortable": true,
                  "ShowFilterBox": true,
                  "FieldWeight": -1
                },
                {
                  "ID": 27,
                  "Name": "area_id",
                  "OrderNo": 9,
                  "DisplayName": "地区",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "area",
                  "RelateField": "id",
                  "IndexType": 2,
                  "EditorType": "ComboBox",
                  "LabelText": "地区",
                  "GraphDesc": "P1=371.00,322.00\r\nP2=324.00,322.00\r\nP3=324.00,322.00\r\nP4=277.00,322.00\r\nHookP1=112.00,91.00\r\nHookP2=208.00,261.00\r\nMod_OP1=1\r\nMod_OP2=1\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1",
                  "Visibility": 3,
                  "ColWidth": 74
                },
                {
                  "ID": 20,
                  "Name": "phone",
                  "OrderNo": 10,
                  "DisplayName": "电话",
                  "DataType": 1,
                  "DataLength": 255,
                  "EditorType": "Button",
                  "DropDownItems": "aa\r\nbb\r\ncc\r\n",
                  "Visibility": 3
                },
                {
                  "ID": 1,
                  "Name": "address",
                  "OrderNo": 11,
                  "DisplayName": "地址",
                  "DataType": 1,
                  "DataLength": 255,
                  "EditorType": "Memo",
                  "ColWidth": 293,
                  "TestDataType": "address_cn"
                },
                {
                  "ID": 15,
                  "Name": "email",
                  "OrderNo": 12,
                  "DisplayName": "E-mail",
                  "DataType": 1,
                  "IndexType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255,
                  "AggregateFun": "Text:金额合计：",
                  "ColWidth": 208,
                  "ColSortable": true,
                  "FieldWeight": 1
                },
                {
                  "ID": 2,
                  "Name": "amount",
                  "OrderNo": 13,
                  "DisplayName": "消费金额",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 29,
                  "DataScale": 12,
                  "AggregateFun": "Sum",
                  "ColWidth": 88,
                  "ColSortable": true
                },
                {
                  "ID": 13,
                  "Name": "balance",
                  "OrderNo": 14,
                  "DisplayName": "余额",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 29,
                  "DataScale": 12,
                  "AggregateFun": "Sum",
                  "ColWidth": 91,
                  "ColSortable": true
                },
                {
                  "ID": 21,
                  "Name": "point",
                  "OrderNo": 15,
                  "DisplayName": "积分",
                  "DataType": 2,
                  "Not_Nullable": true,
                  "AggregateFun": "Sum",
                  "EditorType": "CalcEdit",
                  "GraphDesc": "P1=345.00,90.00\r\nP2=300.00,90.00\r\nP3=300.00,90.00\r\nP4=254.00,90.00\r\nHookP1=20.00,75.00\r\nHookP2=216.00,80.00\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1",
                  "TextAlign": 2,
                  "ColWidth": 77,
                  "ColSortable": true,
                  "TestDataType": "int",
                  "TestDataRules": "%INT(Min:1,Max:9999,Format:0)%\r\n//Min: 最小值, Max: 最大值\r\n//Format: 格式，如 #,###,##0 0000 HHHH hh (HH或hh表示HEX格式)\r\n\r\n"
                },
                {
                  "ID": 14,
                  "Name": "birth",
                  "OrderNo": 16,
                  "DisplayName": "出生日期",
                  "DataType": 4,
                  "TextAlign": 3,
                  "ColWidth": 116,
                  "ColSortable": true,
                  "TestDataType": "datetime",
                  "TestDataRules": "%DATE(Min:Now-10000,Max:Now-5000,Format:yyyy-mm-dd)%\r\n//Min: 最小值, Max: 最大值, Format: 格式（参考Delphi FormateDateTime函数）\r\n\r\n",
                  "FieldWeight": -1
                },
                {
                  "ID": 25,
                  "Name": "zipCode",
                  "OrderNo": 17,
                  "DisplayName": "邮编",
                  "DataType": 1,
                  "DataLength": 255,
                  "TextAlign": 2,
                  "ColWidth": 89,
                  "TestDataType": "zipcode_cn",
                  "FieldWeight": -1
                },
                {
                  "ID": 32,
                  "Name": "user",
                  "OrderNo": 18,
                  "DisplayName": "用户信息",
                  "DataType": 8,
                  "RelateTable": "users",
                  "Visibility": 2,
                  "ColWidth": 127,
                  "FieldWeight": -1
                },
                {
                  "ID": 31,
                  "Name": "roles",
                  "OrderNo": 19,
                  "DisplayName": "拥有角色",
                  "DataType": 10,
                  "RelateTable": "role",
                  "RelateField": "name,description,permissions",
                  "EditorType": "DataGrid",
                  "Visibility": 2,
                  "ColWidth": 214,
                  "FieldWeight": -1
                },
                {
                  "ID": 16,
                  "Name": "encodedPassword",
                  "OrderNo": 20,
                  "DisplayName": "加密密码",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255,
                  "EditorType": "Password",
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 23,
                  "Name": "safeKeyValue",
                  "OrderNo": 21,
                  "DisplayName": "安全密匙",
                  "DataType": 1,
                  "DataLength": 255,
                  "IsHidden": true,
                  "FieldWeight": -1
                },
                {
                  "ID": 22,
                  "Name": "safeKeyExpire",
                  "OrderNo": 22,
                  "DisplayName": "安全密匙",
                  "DataType": 4,
                  "IsHidden": true,
                  "FieldWeight": -1
                },
                {
                  "ID": 3,
                  "Name": "attributeValue0",
                  "OrderNo": 23,
                  "DisplayName": "会员注册项值0",
                  "DataType": 1,
                  "DataLength": 255,
                  "EditorType": "CheckBox",
                  "LabelText": "关注类型",
                  "TestDataType": "product_category_cn",
                  "FieldWeight": -1
                },
                {
                  "ID": 4,
                  "Name": "attributeValue1",
                  "OrderNo": 24,
                  "DisplayName": "会员注册项值1",
                  "DataType": 1,
                  "DataLength": 255,
                  "EditorType": "TrackBar",
                  "LabelText": "关注进度",
                  "TestDataType": "int",
                  "TestDataRules": "%INT(Min:1,Max:99,Format:#00)%\r\n//Min: 最小值, Max: 最大值\r\n//Format: 格式，如 #,###,##0 0000 HHHH hh (HH或hh表示HEX格式)\r\n\r\n",
                  "FieldWeight": -1
                },
                {
                  "ID": 5,
                  "Name": "attributeValue2",
                  "OrderNo": 25,
                  "DisplayName": "会员注册项值2",
                  "DataType": 1,
                  "DataLength": 255,
                  "EditorType": "ScoreRate",
                  "LabelText": "关注评分",
                  "ColWidth": 153,
                  "FieldWeight": -9
                },
                {
                  "ID": 6,
                  "Name": "attributeValue3",
                  "OrderNo": 26,
                  "DisplayName": "会员注册项值3",
                  "DataType": 1,
                  "DataLength": 255,
                  "EditorType": "ColorSelect",
                  "LabelText": "喜欢颜色",
                  "TestDataType": "color",
                  "FieldWeight": -9
                },
                {
                  "ID": 7,
                  "Name": "attributeValue4",
                  "OrderNo": 27,
                  "DisplayName": "会员注册项值4",
                  "DataType": 1,
                  "DataLength": 255,
                  "EditorType": "ImageFile",
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 8,
                  "Name": "attributeValue5",
                  "OrderNo": 28,
                  "DisplayName": "会员注册项值5",
                  "DataType": 1,
                  "DataLength": 255,
                  "EditorType": "UploadFile",
                  "LabelText": "附件",
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 9,
                  "Name": "attributeValue6",
                  "OrderNo": 29,
                  "DisplayName": "会员注册项值6",
                  "DataType": 1,
                  "DataLength": 255,
                  "EditorType": "LocationMap",
                  "LabelText": "所在位置",
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 10,
                  "Name": "attributeValue7",
                  "OrderNo": 30,
                  "DisplayName": "会员注册项值7",
                  "DataType": 1,
                  "DataLength": 255,
                  "EditorType": "Picture",
                  "LabelText": "照片",
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 11,
                  "Name": "attributeValue8",
                  "OrderNo": 31,
                  "DisplayName": "会员注册项值8",
                  "DataType": 1,
                  "DataLength": 255,
                  "EditorType": "QRCode",
                  "LabelText": "二维码",
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 12,
                  "Name": "attributeValue9",
                  "OrderNo": 32,
                  "DisplayName": "会员注册项值9",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FixColType": 2,
                  "FieldWeight": -9
                }
              ]
            }
          },
          {
            "ID": 16,
            "Name": "users",
            "Caption": "用户",
            "OrderNo": 2,
            "GraphDesc": "Left=379.00\r\nTop=420.00",
            "BgColor": 16777160,
            "MetaFields": {
              "Count": 9,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1
                },
                {
                  "ID": 9,
                  "Name": "userIdstr",
                  "OrderNo": 2,
                  "DisplayName": "用户ID",
                  "DataType": 9,
                  "KeyFieldType": 4,
                  "ColWidth": 91,
                  "TestDataRules": "用户_id%FIELD(ID)%",
                  "FieldWeight": 1
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 3,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 4,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 5,
                  "Name": "isEnabled",
                  "OrderNo": 5,
                  "DisplayName": "是否启用",
                  "DataType": 5,
                  "Not_Nullable": true
                },
                {
                  "ID": 6,
                  "Name": "isLocked",
                  "OrderNo": 6,
                  "DisplayName": "是否锁定",
                  "DataType": 5,
                  "Not_Nullable": true
                },
                {
                  "ID": 7,
                  "Name": "lastLoginDate",
                  "OrderNo": 7,
                  "DisplayName": "最后登录日期",
                  "DataType": 4
                },
                {
                  "ID": 8,
                  "Name": "lastLoginIp",
                  "OrderNo": 8,
                  "DisplayName": "最后登录IP",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 10,
                  "Name": "lockDate",
                  "OrderNo": 9,
                  "DisplayName": "锁定日期",
                  "DataType": 4
                }
              ]
            }
          },
          {
            "ID": 17,
            "Name": "socialuser",
            "Caption": "社会化用户",
            "OrderNo": 3,
            "GraphDesc": "Left=630.00\r\nTop=841.00",
            "BgColor": 14085099,
            "MetaFields": {
              "Count": 6,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "Not_Nullable": true
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 2,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 3,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 5,
                  "Name": "loginPluginId",
                  "OrderNo": 4,
                  "DisplayName": "登录插件ID",
                  "DataType": 1,
                  "IndexType": 2,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 6,
                  "Name": "uniqueId",
                  "OrderNo": 5,
                  "DisplayName": "唯一ID",
                  "DataType": 1,
                  "RelateTable": "说明1",
                  "RelateField": "{Link:Direct}",
                  "Not_Nullable": true,
                  "DataLength": 255,
                  "GraphDesc": "P1=895.00,884.00\r\nP2=870.00,884.00\r\nP3=870.00,897.00\r\nP4=844.00,897.00\r\nHookP1=20.00,40.00\r\nHookP2=176.00,56.00\r\nMod_OP1=0\r\nMod_OP2=1\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1"
                },
                {
                  "ID": 7,
                  "Name": "user_id",
                  "OrderNo": 6,
                  "DisplayName": "用户",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "users",
                  "RelateField": "id",
                  "IndexType": 2,
                  "GraphDesc": "P1=549.00,586.00\r\nP2=549.00,651.00\r\nP3=650.00,651.00\r\nP4=650.00,841.00\r\nHookP1=170.00,122.00\r\nHookP2=20.00,20.00\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=1\r\nHorz1=0\r\nHorz2=0"
                }
              ]
            }
          },
          {
            "ID": 18,
            "Name": "role",
            "Caption": "角色",
            "OrderNo": 4,
            "GraphDesc": "Left=376.00\r\nTop=893.00",
            "MetaFields": {
              "Count": 7,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "Not_Nullable": true
                },
                {
                  "ID": 7,
                  "Name": "name",
                  "OrderNo": 2,
                  "DisplayName": "名称",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255,
                  "TestDataType": "job_title_cn"
                },
                {
                  "ID": 8,
                  "Name": "permissions",
                  "OrderNo": 3,
                  "DisplayName": "权限",
                  "DataType": 7,
                  "Not_Nullable": true,
                  "DataLength": -1,
                  "TestDataType": "access_right_type"
                },
                {
                  "ID": 5,
                  "Name": "description",
                  "OrderNo": 4,
                  "DisplayName": "描述",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 6,
                  "Name": "isSystem",
                  "OrderNo": 5,
                  "DisplayName": "是否内置",
                  "DataType": 5,
                  "Not_Nullable": true,
                  "DataLength": 1
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 6,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 7,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                }
              ]
            }
          },
          {
            "ID": 19,
            "Name": "memberrank",
            "Caption": "会员等级",
            "OrderNo": 5,
            "GraphDesc": "Left=368.00\r\nTop=66.00",
            "MetaFields": {
              "Count": 8,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "Not_Nullable": true
                },
                {
                  "ID": 8,
                  "Name": "name",
                  "OrderNo": 2,
                  "DisplayName": "名称",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255,
                  "TestDataRules": "普通会员\r\n铜牌会员\r\n银牌会员\r\n黄金会员\r\n白金会员\r\n钻石会员"
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 3,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 4,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 5,
                  "Name": "amount",
                  "OrderNo": 5,
                  "DisplayName": "消费金额",
                  "DataType": 3,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 6,
                  "Name": "isDefault",
                  "OrderNo": 6,
                  "DisplayName": "是否默认",
                  "DataType": 5,
                  "Not_Nullable": true,
                  "DataLength": 1
                },
                {
                  "ID": 7,
                  "Name": "isSpecial",
                  "OrderNo": 7,
                  "DisplayName": "是否特殊",
                  "DataType": 5,
                  "Not_Nullable": true,
                  "DataLength": 1
                },
                {
                  "ID": 9,
                  "Name": "scale",
                  "OrderNo": 8,
                  "DisplayName": "优惠比例",
                  "DataType": 3,
                  "Not_Nullable": true
                }
              ]
            }
          },
          {
            "ID": 20,
            "Name": "memberattribute",
            "Caption": "会员注册项",
            "OrderNo": 6,
            "GraphDesc": "Left=42.50\r\nTop=618.00",
            "MetaFields": {
              "Count": 11,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "Not_Nullable": true
                },
                {
                  "ID": 8,
                  "Name": "name",
                  "OrderNo": 2,
                  "DisplayName": "名称",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 12,
                  "Name": "type",
                  "OrderNo": 3,
                  "DisplayName": "类型",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 9,
                  "Name": "options",
                  "OrderNo": 4,
                  "DisplayName": "可选项",
                  "DataType": 7
                },
                {
                  "ID": 10,
                  "Name": "pattern",
                  "OrderNo": 5,
                  "DisplayName": "配比",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 11,
                  "Name": "propertyIndex",
                  "OrderNo": 6,
                  "DisplayName": "属性序号",
                  "DataType": 2
                },
                {
                  "ID": 6,
                  "Name": "isEnabled",
                  "OrderNo": 7,
                  "DisplayName": "是否启用",
                  "DataType": 5,
                  "Not_Nullable": true
                },
                {
                  "ID": 7,
                  "Name": "isRequired",
                  "OrderNo": 8,
                  "DisplayName": "是否必填",
                  "DataType": 5,
                  "Not_Nullable": true
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 9,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 10,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 5,
                  "Name": "orders",
                  "OrderNo": 11,
                  "DisplayName": "排序",
                  "DataType": 2
                }
              ]
            }
          },
          {
            "ID": 21,
            "Name": "businessattribute",
            "Caption": "商家注册项",
            "OrderNo": 7,
            "GraphDesc": "Left=1053.50\r\nTop=69.00",
            "MetaFields": {
              "Count": 11,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "Not_Nullable": true
                },
                {
                  "ID": 8,
                  "Name": "name",
                  "OrderNo": 2,
                  "DisplayName": "名称",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 12,
                  "Name": "type",
                  "OrderNo": 3,
                  "DisplayName": "类型",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 9,
                  "Name": "options",
                  "OrderNo": 4,
                  "DisplayName": "可选项",
                  "DataType": 7
                },
                {
                  "ID": 10,
                  "Name": "pattern",
                  "OrderNo": 5,
                  "DisplayName": "配比",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 11,
                  "Name": "propertyIndex",
                  "OrderNo": 6,
                  "DisplayName": "属性序号",
                  "DataType": 2
                },
                {
                  "ID": 6,
                  "Name": "isEnabled",
                  "OrderNo": 7,
                  "DisplayName": "是否启用",
                  "DataType": 5,
                  "Not_Nullable": true
                },
                {
                  "ID": 7,
                  "Name": "isRequired",
                  "OrderNo": 8,
                  "DisplayName": "是否必填",
                  "DataType": 5,
                  "Not_Nullable": true
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 9,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 10,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 5,
                  "Name": "orders",
                  "OrderNo": 11,
                  "DisplayName": "排序",
                  "DataType": 2
                }
              ]
            }
          },
          {
            "ID": 22,
            "Name": "business",
            "Caption": "商家",
            "OrderNo": 8,
            "GraphDesc": "Left=672.00\r\nTop=83.00",
            "BgColor": 13828095,
            "MetaFields": {
              "Count": 42,
              "items": [
                {
                  "ID": 42,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "RelateTable": "users",
                  "RelateField": "id",
                  "Not_Nullable": true,
                  "GraphDesc": "P1=593.00,511.00\r\nP2=632.00,511.00\r\nP3=632.00,511.00\r\nP4=672.00,511.00\r\nHookP1=186.00,91.00\r\nHookP2=20.00,428.00\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1"
                },
                {
                  "ID": 41,
                  "Name": "username",
                  "OrderNo": 2,
                  "DisplayName": "用户名",
                  "DataType": 1,
                  "IndexType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255,
                  "TestDataType": "login_name",
                  "TestDataRules": "\r\n\r\n",
                  "FieldWeight": 1
                },
                {
                  "ID": 34,
                  "Name": "name",
                  "OrderNo": 3,
                  "DisplayName": "名称",
                  "DataType": 1,
                  "DataLength": 255,
                  "TestDataType": "company_cn"
                },
                {
                  "ID": 33,
                  "Name": "mobile",
                  "OrderNo": 4,
                  "DisplayName": "手机",
                  "DataType": 1,
                  "IndexType": 1,
                  "DataLength": 255,
                  "TestDataType": "cell_phone",
                  "FieldWeight": 1
                },
                {
                  "ID": 21,
                  "Name": "balance",
                  "OrderNo": 5,
                  "DisplayName": "余额",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 29,
                  "DataScale": 12
                },
                {
                  "ID": 22,
                  "Name": "bankAccount",
                  "OrderNo": 6,
                  "DisplayName": "银行账号",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3
                },
                {
                  "ID": 23,
                  "Name": "bankName",
                  "OrderNo": 7,
                  "DisplayName": "银行开户名",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3
                },
                {
                  "ID": 24,
                  "Name": "email",
                  "OrderNo": 8,
                  "DisplayName": "E-mail",
                  "DataType": 1,
                  "IndexType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255,
                  "FieldWeight": 1
                },
                {
                  "ID": 25,
                  "Name": "encodedPassword",
                  "OrderNo": 9,
                  "DisplayName": "加密密码",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 26,
                  "Name": "frozenFund",
                  "OrderNo": 10,
                  "DisplayName": "冻结金额",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 29,
                  "DataScale": 12
                },
                {
                  "ID": 27,
                  "Name": "idCard",
                  "OrderNo": 11,
                  "DisplayName": "法人代表身份证",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 28,
                  "Name": "idCardImage",
                  "OrderNo": 12,
                  "DisplayName": "法人代表身份证图片",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 29,
                  "Name": "identificationNumber",
                  "OrderNo": 13,
                  "DisplayName": "纳税人识别号",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 30,
                  "Name": "legalPerson",
                  "OrderNo": 14,
                  "DisplayName": "法人代表姓名",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 31,
                  "Name": "licenseImage",
                  "OrderNo": 15,
                  "DisplayName": "营业执照号图片",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 32,
                  "Name": "licenseNumber",
                  "OrderNo": 16,
                  "DisplayName": "营业执照号",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 35,
                  "Name": "organizationCode",
                  "OrderNo": 17,
                  "DisplayName": "组织机构代码",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 36,
                  "Name": "organizationImage",
                  "OrderNo": 18,
                  "DisplayName": "组织机构代码证图片",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 37,
                  "Name": "phone",
                  "OrderNo": 19,
                  "DisplayName": "电话",
                  "DataType": 1,
                  "DataLength": 255,
                  "TestDataType": "phone"
                },
                {
                  "ID": 38,
                  "Name": "safeKeyExpire",
                  "OrderNo": 20,
                  "DisplayName": "安全密匙",
                  "DataType": 4,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 39,
                  "Name": "safeKeyValue",
                  "OrderNo": 21,
                  "DisplayName": "安全密匙",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 40,
                  "Name": "taxImage",
                  "OrderNo": 22,
                  "DisplayName": "税务登记证图片",
                  "DataType": 1,
                  "DataLength": 255,
                  "GraphDesc": "P1=570.00,460.00\r\nP2=616.00,460.00\r\nP3=616.00,460.00\r\nP4=663.00,460.00\r\nHookP1=186.00,91.00\r\nHookP2=20.00,451.00\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1",
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 1,
                  "Name": "attributeValue0",
                  "OrderNo": 23,
                  "DisplayName": "商家注册项值0",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 2,
                  "Name": "attributeValue1",
                  "OrderNo": 24,
                  "DisplayName": "商家注册项值1",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 13,
                  "Name": "attributeValue2",
                  "OrderNo": 25,
                  "DisplayName": "商家注册项值2",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 14,
                  "Name": "attributeValue3",
                  "OrderNo": 26,
                  "DisplayName": "商家注册项值3",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 15,
                  "Name": "attributeValue4",
                  "OrderNo": 27,
                  "DisplayName": "商家注册项值4",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 16,
                  "Name": "attributeValue5",
                  "OrderNo": 28,
                  "DisplayName": "商家注册项值5",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 17,
                  "Name": "attributeValue6",
                  "OrderNo": 29,
                  "DisplayName": "商家注册项值6",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 18,
                  "Name": "attributeValue7",
                  "OrderNo": 30,
                  "DisplayName": "商家注册项值7",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 19,
                  "Name": "attributeValue8",
                  "OrderNo": 31,
                  "DisplayName": "商家注册项值8",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 20,
                  "Name": "attributeValue9",
                  "OrderNo": 32,
                  "DisplayName": "商家注册项值9",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 3,
                  "Name": "attributeValue10",
                  "OrderNo": 33,
                  "DisplayName": "商家注册项值10",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 4,
                  "Name": "attributeValue11",
                  "OrderNo": 34,
                  "DisplayName": "商家注册项值11",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 5,
                  "Name": "attributeValue12",
                  "OrderNo": 35,
                  "DisplayName": "商家注册项值12",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 6,
                  "Name": "attributeValue13",
                  "OrderNo": 36,
                  "DisplayName": "商家注册项值13",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 7,
                  "Name": "attributeValue14",
                  "OrderNo": 37,
                  "DisplayName": "商家注册项值14",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 8,
                  "Name": "attributeValue15",
                  "OrderNo": 38,
                  "DisplayName": "商家注册项值15",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 9,
                  "Name": "attributeValue16",
                  "OrderNo": 39,
                  "DisplayName": "商家注册项值16",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 10,
                  "Name": "attributeValue17",
                  "OrderNo": 40,
                  "DisplayName": "商家注册项值17",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 11,
                  "Name": "attributeValue18",
                  "OrderNo": 41,
                  "DisplayName": "商家注册项值18",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 12,
                  "Name": "attributeValue19",
                  "OrderNo": 42,
                  "DisplayName": "商家注册项值19",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -9
                }
              ]
            }
          },
          {
            "ID": 23,
            "Name": "admin_role",
            "Caption": "管理员角色中间表",
            "OrderNo": 9,
            "GraphDesc": "Left=169.00\r\nTop=837.00",
            "MetaFields": {
              "Count": 2,
              "items": [
                {
                  "ID": 1,
                  "Name": "admins_id",
                  "OrderNo": 1,
                  "DisplayName": "管理员",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "admin",
                  "RelateField": "id",
                  "Not_Nullable": true,
                  "GraphDesc": "P1=371.00,766.00\r\nP2=300.00,766.00\r\nP3=300.00,766.00\r\nP4=300.00,837.00\r\nHookP1=144.00,96.00\r\nHookP2=131.00,1.00\r\nMod_OP1=1\r\nMod_OP2=1\r\nMod_CP=1\r\nHorz1=1\r\nHorz2=0"
                },
                {
                  "ID": 2,
                  "Name": "roles_id",
                  "OrderNo": 2,
                  "DisplayName": "角色",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "role",
                  "RelateField": "id",
                  "Not_Nullable": true,
                  "GraphDesc": "P1=376.00,948.00\r\nP2=302.00,948.00\r\nP3=302.00,948.00\r\nP4=302.00,891.00\r\nHookP1=113.00,55.00\r\nHookP2=133.00,1.00\r\nMod_OP1=1\r\nMod_OP2=1\r\nMod_CP=1\r\nHorz1=1\r\nHorz2=0"
                }
              ]
            }
          },
          {
            "ID": 24,
            "Name": "admin",
            "Caption": "管理员",
            "OrderNo": 10,
            "GraphDesc": "Left=371.00\r\nTop=670.00",
            "BgColor": 16769535,
            "MetaFields": {
              "Count": 6,
              "items": [
                {
                  "ID": 6,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "RelateTable": "users",
                  "RelateField": "id",
                  "Not_Nullable": true,
                  "GraphDesc": "P1=486.00,586.00\r\nP2=486.00,628.00\r\nP3=486.00,628.00\r\nP4=486.00,670.00\r\nHookP1=107.00,146.00\r\nHookP2=115.00,20.00\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=0\r\nHorz2=0"
                },
                {
                  "ID": 5,
                  "Name": "username",
                  "OrderNo": 2,
                  "DisplayName": "用户名",
                  "DataType": 1,
                  "IndexType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255,
                  "TestDataType": "login_name",
                  "TestDataRules": "%CALL(#person_name_male:50,#person_name_female:50)%_%RAND_STR(Min:2,Max:6,Chars:azAZ09{_})%\r\n\r\n",
                  "FieldWeight": 1
                },
                {
                  "ID": 4,
                  "Name": "name",
                  "OrderNo": 3,
                  "DisplayName": "姓名",
                  "DataType": 1,
                  "DataLength": 255,
                  "TestDataType": "person_fullname_cn"
                },
                {
                  "ID": 1,
                  "Name": "department",
                  "OrderNo": 4,
                  "DisplayName": "部门",
                  "DataType": 1,
                  "DataLength": 255,
                  "GraphDesc": "P1=463.00,535.00\r\nP2=463.00,577.00\r\nP3=463.00,577.00\r\nP4=463.00,619.00\r\nHookP1=107.00,146.00\r\nHookP2=115.00,20.00\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=0\r\nHorz2=0",
                  "TestDataType": "department_cn"
                },
                {
                  "ID": 2,
                  "Name": "email",
                  "OrderNo": 5,
                  "DisplayName": "E-mail",
                  "DataType": 1,
                  "IndexType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255,
                  "FieldWeight": 1
                },
                {
                  "ID": 3,
                  "Name": "encodedPassword",
                  "OrderNo": 6,
                  "DisplayName": "加密密码",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255,
                  "EditorType": "Password",
                  "TestDataType": "rand_string"
                }
              ]
            }
          },
          {
            "ID": 11,
            "Name": "说明1",
            "TypeName": "TEXT",
            "Memo": "说明：社会化用户指微信、微博等外部登录的用户",
            "CreateDate": "2020-03-15 00:06:27",
            "OrderNo": 11,
            "GraphDesc": "Left=895.00\r\nTop=844.00",
            "BgColor": 16763594,
            "MetaFields": {"items": []}
          },
          {
            "ID": 25,
            "Name": "area",
            "Caption": "地区",
            "OrderNo": 12,
            "GraphDesc": "Left=371.00\r\nTop=231.00",
            "MetaFields": {
              "Count": 9,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "Not_Nullable": true
                },
                {
                  "ID": 8,
                  "Name": "name",
                  "OrderNo": 2,
                  "DisplayName": "名称",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255,
                  "TestDataType": "city_cn"
                },
                {
                  "ID": 6,
                  "Name": "fullName",
                  "OrderNo": 3,
                  "DisplayName": "全称",
                  "DataType": 7,
                  "Not_Nullable": true,
                  "DataLength": -1,
                  "TestDataRules": "中国%FIELD(name)%市"
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 4,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 5,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 5,
                  "Name": "orders",
                  "OrderNo": 6,
                  "DisplayName": "排序",
                  "DataType": 2
                },
                {
                  "ID": 7,
                  "Name": "grade",
                  "OrderNo": 7,
                  "DisplayName": "层级",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 9,
                  "Name": "treePath",
                  "OrderNo": 8,
                  "DisplayName": "树路径",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 10,
                  "Name": "parent_id",
                  "OrderNo": 9,
                  "DisplayName": "上级地区",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "area",
                  "RelateField": "id",
                  "IndexType": 2,
                  "GraphDesc": "P1=578.00,257.00\r\nP2=602.00,257.00\r\nP3=602.00,293.00\r\nP4=578.00,293.00\r\nHookP1=103.00,26.00\r\nHookP2=103.00,62.00\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1"
                }
              ]
            }
          },
          {
            "ID": 26,
            "Name": "business_man",
            "Caption": "商家管理",
            "OrderNo": 13,
            "GraphDesc": "Left=1069.00\r\nTop=337.00",
            "Not_GenDatabase": true,
            "BgColor": 14680063,
            "MetaFields": {
              "Count": 12,
              "items": [
                {
                  "ID": 42,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "RelateTable": "business",
                  "RelateField": "id",
                  "Not_Nullable": true,
                  "GraphDesc": "P1=983.00,444.00\r\nP2=1026.00,444.00\r\nP3=1026.00,444.00\r\nP4=1069.00,444.00\r\nHookP1=283.00,361.00\r\nHookP2=20.00,107.00\r\nMod_OP1=0\r\nMod_OP2=1\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1"
                },
                {
                  "ID": 41,
                  "Name": "username",
                  "OrderNo": 2,
                  "DisplayName": "用户名",
                  "DataType": 1,
                  "IndexType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255,
                  "TestDataType": "login_name"
                },
                {
                  "ID": 34,
                  "Name": "name",
                  "OrderNo": 3,
                  "DisplayName": "名称",
                  "DataType": 1,
                  "DataLength": 255,
                  "TestDataType": "company_cn"
                },
                {
                  "ID": 33,
                  "Name": "mobile",
                  "OrderNo": 4,
                  "DisplayName": "手机",
                  "DataType": 1,
                  "IndexType": 1,
                  "DataLength": 255,
                  "TestDataType": "cell_phone"
                },
                {
                  "ID": 21,
                  "Name": "balance",
                  "OrderNo": 5,
                  "DisplayName": "余额",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 29,
                  "DataScale": 12
                },
                {
                  "ID": 24,
                  "Name": "email",
                  "OrderNo": 6,
                  "DisplayName": "E-mail",
                  "DataType": 1,
                  "IndexType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 26,
                  "Name": "frozenFund",
                  "OrderNo": 7,
                  "DisplayName": "冻结金额",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 29,
                  "DataScale": 12
                },
                {
                  "ID": 29,
                  "Name": "identificationNumber",
                  "OrderNo": 8,
                  "DisplayName": "纳税人识别号",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3
                },
                {
                  "ID": 30,
                  "Name": "legalPerson",
                  "OrderNo": 9,
                  "DisplayName": "法人代表姓名",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3
                },
                {
                  "ID": 37,
                  "Name": "phone",
                  "OrderNo": 10,
                  "DisplayName": "电话",
                  "DataType": 1,
                  "DataLength": 255,
                  "TestDataType": "phone"
                },
                {
                  "ID": 1,
                  "Name": "attributeValue0",
                  "OrderNo": 11,
                  "DisplayName": "商家注册项值0",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3
                },
                {
                  "ID": 2,
                  "Name": "attributeValue1",
                  "OrderNo": 12,
                  "DisplayName": "商家注册项值1",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3
                }
              ]
            }
          },
          {
            "ID": 14,
            "Name": "MemberGroup",
            "TypeName": "GROUP",
            "Memo": "会员",
            "CreateDate": "2024-02-15 21:17:50",
            "OrderNo": 14,
            "GraphDesc": "Left=13.00\r\nTop=13.00\r\nWidth=624.00\r\nHeight=588.00\r\nAutoSize=0\r\nBWidth=312.00\r\nBHeight=294.00",
            "BgColor": 16777215,
            "MetaFields": {"items": []}
          }
        ]
      }
    },
    {
      "ID": 6,
      "Name": "order",
      "Caption": "订单",
      "CreateDate": "2017-08-02 15:08:52",
      "OrderNo": 3,
      "Tables": {
        "Count": 23,
        "items": [
          {
            "ID": 1,
            "Name": "member",
            "Caption": "会员",
            "OrderNo": 1,
            "GraphDesc": "Left=356.92\r\nTop=767.60",
            "BgColor": 15724510,
            "MetaFields": {
              "Count": 32,
              "items": [
                {
                  "ID": 26,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "RelateTable": "users",
                  "RelateField": "id",
                  "Not_Nullable": true,
                  "GraphDesc": "P1=502.00,615.29\r\nP2=502.00,691.00\r\nP3=502.00,691.00\r\nP4=502.00,767.60\r\nHookP1=99.68,137.71\r\nHookP2=145.08,36.40\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=0\r\nHorz2=0"
                },
                {
                  "ID": 19,
                  "Name": "name",
                  "OrderNo": 2,
                  "DisplayName": "姓名",
                  "DataType": 1,
                  "DataLength": 255,
                  "AggregateFun": "Text:合计",
                  "ColWidth": 79,
                  "FixColType": 1,
                  "ColSortable": true,
                  "Required": true,
                  "TestDataType": "person_fullname_cn"
                },
                {
                  "ID": 24,
                  "Name": "username",
                  "OrderNo": 3,
                  "DisplayName": "用户名",
                  "DataType": 1,
                  "IndexType": 1,
                  "Hint": "请输入用户名",
                  "Not_Nullable": true,
                  "DataLength": 255,
                  "AggregateFun": "Text:记录数: %Count%",
                  "ExplainText": "由字母、数字或下划线组成，必须以字母开头",
                  "FixColType": 1,
                  "ColSortable": true,
                  "TestDataType": "login_name",
                  "TestDataRules": "\r\n",
                  "FieldWeight": 1
                },
                {
                  "ID": 17,
                  "Name": "gender",
                  "OrderNo": 4,
                  "DisplayName": "性别",
                  "DataType": 2,
                  "EditorType": "RadioBox",
                  "DropDownItems": "男\r\n女\r\n",
                  "ColWidth": 82,
                  "ShowFilterBox": true,
                  "TestDataType": "gendor"
                },
                {
                  "ID": 18,
                  "Name": "mobile",
                  "OrderNo": 5,
                  "DisplayName": "手机",
                  "DataType": 1,
                  "IndexType": 1,
                  "DataLength": 255,
                  "ColWidth": 117,
                  "FixColType": 1,
                  "Required": true,
                  "TestDataType": "cell_phone",
                  "FieldWeight": 1
                },
                {
                  "ID": 28,
                  "Name": "memberRank_id",
                  "OrderNo": 6,
                  "DisplayName": "会员等级",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "memberrank",
                  "RelateField": "id",
                  "IndexType": 2,
                  "Not_Nullable": true,
                  "EditorType": "ButtonGroup",
                  "LabelText": "会员VIP等级",
                  "ColWidth": 129,
                  "ShowFilterBox": true
                },
                {
                  "ID": 29,
                  "Name": "isEnabled",
                  "OrderNo": 7,
                  "DisplayName": "是否启用",
                  "DataType": 9,
                  "RelateTable": "users",
                  "RelateField": "isEnabled",
                  "ColWidth": 111,
                  "ShowFilterBox": true,
                  "FieldWeight": -1
                },
                {
                  "ID": 30,
                  "Name": "isLocked",
                  "OrderNo": 8,
                  "DisplayName": "锁定",
                  "DataType": 9,
                  "RelateTable": "users",
                  "RelateField": "isLocked",
                  "EditorType": "Switch",
                  "ColWidth": 79,
                  "ColSortable": true,
                  "ShowFilterBox": true,
                  "FieldWeight": -1
                },
                {
                  "ID": 27,
                  "Name": "area_id",
                  "OrderNo": 9,
                  "DisplayName": "地区",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "area",
                  "RelateField": "id",
                  "IndexType": 2,
                  "EditorType": "ComboBox",
                  "LabelText": "地区",
                  "Visibility": 3,
                  "ColWidth": 74
                },
                {
                  "ID": 20,
                  "Name": "phone",
                  "OrderNo": 10,
                  "DisplayName": "电话",
                  "DataType": 1,
                  "DataLength": 255,
                  "EditorType": "Button",
                  "DropDownItems": "aa\r\nbb\r\ncc\r\n",
                  "Visibility": 3
                },
                {
                  "ID": 1,
                  "Name": "address",
                  "OrderNo": 11,
                  "DisplayName": "地址",
                  "DataType": 1,
                  "DataLength": 255,
                  "EditorType": "Memo",
                  "ColWidth": 293,
                  "TestDataType": "address_cn"
                },
                {
                  "ID": 15,
                  "Name": "email",
                  "OrderNo": 12,
                  "DisplayName": "E-mail",
                  "DataType": 1,
                  "IndexType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255,
                  "AggregateFun": "Text:金额合计：",
                  "ColWidth": 208,
                  "ColSortable": true,
                  "FieldWeight": 1
                },
                {
                  "ID": 2,
                  "Name": "amount",
                  "OrderNo": 13,
                  "DisplayName": "消费金额",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 29,
                  "DataScale": 12,
                  "AggregateFun": "Sum",
                  "ColWidth": 88,
                  "ColSortable": true
                },
                {
                  "ID": 13,
                  "Name": "balance",
                  "OrderNo": 14,
                  "DisplayName": "余额",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 29,
                  "DataScale": 12,
                  "AggregateFun": "Sum",
                  "ColWidth": 91,
                  "ColSortable": true
                },
                {
                  "ID": 21,
                  "Name": "point",
                  "OrderNo": 15,
                  "DisplayName": "积分",
                  "DataType": 2,
                  "Not_Nullable": true,
                  "AggregateFun": "Sum",
                  "EditorType": "CalcEdit",
                  "TextAlign": 2,
                  "ColWidth": 77,
                  "ColSortable": true,
                  "TestDataType": "int",
                  "TestDataRules": "%INT(Min:1,Max:9999,Format:0)%\r\n//Min: 最小值, Max: 最大值\r\n//Format: 格式，如 #,###,##0 0000 HHHH hh (HH或hh表示HEX格式)\r\n\r\n"
                },
                {
                  "ID": 14,
                  "Name": "birth",
                  "OrderNo": 16,
                  "DisplayName": "出生日期",
                  "DataType": 4,
                  "TextAlign": 3,
                  "ColWidth": 116,
                  "ColSortable": true,
                  "TestDataType": "datetime",
                  "TestDataRules": "%DATE(Min:Now-10000,Max:Now-5000,Format:yyyy-mm-dd)%\r\n//Min: 最小值, Max: 最大值, Format: 格式（参考Delphi FormateDateTime函数）\r\n\r\n",
                  "FieldWeight": -1
                },
                {
                  "ID": 25,
                  "Name": "zipCode",
                  "OrderNo": 17,
                  "DisplayName": "邮编",
                  "DataType": 1,
                  "DataLength": 255,
                  "TextAlign": 2,
                  "ColWidth": 89,
                  "TestDataType": "zipcode_cn",
                  "FieldWeight": -1
                },
                {
                  "ID": 32,
                  "Name": "user",
                  "OrderNo": 18,
                  "DisplayName": "用户信息",
                  "DataType": 8,
                  "RelateTable": "users",
                  "Visibility": 2,
                  "ColWidth": 127,
                  "FieldWeight": -1
                },
                {
                  "ID": 31,
                  "Name": "roles",
                  "OrderNo": 19,
                  "DisplayName": "拥有角色",
                  "DataType": 10,
                  "RelateTable": "role",
                  "RelateField": "name,description,permissions",
                  "EditorType": "DataGrid",
                  "Visibility": 2,
                  "ColWidth": 214,
                  "FieldWeight": -1
                },
                {
                  "ID": 16,
                  "Name": "encodedPassword",
                  "OrderNo": 20,
                  "DisplayName": "加密密码",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255,
                  "EditorType": "Password",
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 23,
                  "Name": "safeKeyValue",
                  "OrderNo": 21,
                  "DisplayName": "安全密匙",
                  "DataType": 1,
                  "DataLength": 255,
                  "IsHidden": true,
                  "FieldWeight": -1
                },
                {
                  "ID": 22,
                  "Name": "safeKeyExpire",
                  "OrderNo": 22,
                  "DisplayName": "安全密匙",
                  "DataType": 4,
                  "IsHidden": true,
                  "FieldWeight": -1
                },
                {
                  "ID": 3,
                  "Name": "attributeValue0",
                  "OrderNo": 23,
                  "DisplayName": "会员注册项值0",
                  "DataType": 1,
                  "DataLength": 255,
                  "EditorType": "CheckBox",
                  "LabelText": "关注类型",
                  "TestDataType": "product_category_cn",
                  "FieldWeight": -1
                },
                {
                  "ID": 4,
                  "Name": "attributeValue1",
                  "OrderNo": 24,
                  "DisplayName": "会员注册项值1",
                  "DataType": 1,
                  "DataLength": 255,
                  "EditorType": "TrackBar",
                  "LabelText": "关注进度",
                  "TestDataType": "int",
                  "TestDataRules": "%INT(Min:1,Max:99,Format:#00)%\r\n//Min: 最小值, Max: 最大值\r\n//Format: 格式，如 #,###,##0 0000 HHHH hh (HH或hh表示HEX格式)\r\n\r\n",
                  "FieldWeight": -1
                },
                {
                  "ID": 5,
                  "Name": "attributeValue2",
                  "OrderNo": 25,
                  "DisplayName": "会员注册项值2",
                  "DataType": 1,
                  "DataLength": 255,
                  "EditorType": "ScoreRate",
                  "LabelText": "关注评分",
                  "ColWidth": 153,
                  "FieldWeight": -9
                },
                {
                  "ID": 6,
                  "Name": "attributeValue3",
                  "OrderNo": 26,
                  "DisplayName": "会员注册项值3",
                  "DataType": 1,
                  "DataLength": 255,
                  "EditorType": "ColorSelect",
                  "LabelText": "喜欢颜色",
                  "TestDataType": "color",
                  "FieldWeight": -9
                },
                {
                  "ID": 7,
                  "Name": "attributeValue4",
                  "OrderNo": 27,
                  "DisplayName": "会员注册项值4",
                  "DataType": 1,
                  "DataLength": 255,
                  "EditorType": "ImageFile",
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 8,
                  "Name": "attributeValue5",
                  "OrderNo": 28,
                  "DisplayName": "会员注册项值5",
                  "DataType": 1,
                  "DataLength": 255,
                  "EditorType": "UploadFile",
                  "LabelText": "附件",
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 9,
                  "Name": "attributeValue6",
                  "OrderNo": 29,
                  "DisplayName": "会员注册项值6",
                  "DataType": 1,
                  "DataLength": 255,
                  "EditorType": "LocationMap",
                  "LabelText": "所在位置",
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 10,
                  "Name": "attributeValue7",
                  "OrderNo": 30,
                  "DisplayName": "会员注册项值7",
                  "DataType": 1,
                  "DataLength": 255,
                  "EditorType": "Picture",
                  "LabelText": "照片",
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 11,
                  "Name": "attributeValue8",
                  "OrderNo": 31,
                  "DisplayName": "会员注册项值8",
                  "DataType": 1,
                  "DataLength": 255,
                  "EditorType": "QRCode",
                  "LabelText": "二维码",
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 12,
                  "Name": "attributeValue9",
                  "OrderNo": 32,
                  "DisplayName": "会员注册项值9",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FixColType": 2,
                  "FieldWeight": -9
                }
              ]
            }
          },
          {
            "ID": 2,
            "Name": "users",
            "Caption": "用户",
            "OrderNo": 2,
            "GraphDesc": "Left=402.32\r\nTop=449.29",
            "BgColor": 16777160,
            "MetaFields": {
              "Count": 9,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1
                },
                {
                  "ID": 9,
                  "Name": "userIdstr",
                  "OrderNo": 2,
                  "DisplayName": "用户ID",
                  "DataType": 9,
                  "KeyFieldType": 4,
                  "ColWidth": 91,
                  "TestDataRules": "用户_id%FIELD(ID)%",
                  "FieldWeight": 1
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 3,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 4,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 5,
                  "Name": "isEnabled",
                  "OrderNo": 5,
                  "DisplayName": "是否启用",
                  "DataType": 5,
                  "Not_Nullable": true
                },
                {
                  "ID": 6,
                  "Name": "isLocked",
                  "OrderNo": 6,
                  "DisplayName": "是否锁定",
                  "DataType": 5,
                  "Not_Nullable": true
                },
                {
                  "ID": 7,
                  "Name": "lastLoginDate",
                  "OrderNo": 7,
                  "DisplayName": "最后登录日期",
                  "DataType": 4
                },
                {
                  "ID": 8,
                  "Name": "lastLoginIp",
                  "OrderNo": 8,
                  "DisplayName": "最后登录IP",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 10,
                  "Name": "lockDate",
                  "OrderNo": 9,
                  "DisplayName": "锁定日期",
                  "DataType": 4
                }
              ]
            }
          },
          {
            "ID": 3,
            "Name": "store",
            "Caption": "店铺",
            "OrderNo": 3,
            "GraphDesc": "Left=769.32\r\nTop=20.29",
            "BgColor": 14671871,
            "MetaFields": {
              "Count": 22,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "Not_Nullable": true
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 2,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 3,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 5,
                  "Name": "address",
                  "OrderNo": 4,
                  "DisplayName": "地址",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 6,
                  "Name": "bailPaid",
                  "OrderNo": 5,
                  "DisplayName": "已付保证金",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 29,
                  "DataScale": 12
                },
                {
                  "ID": 7,
                  "Name": "discountPromotionEndDate",
                  "OrderNo": 6,
                  "DisplayName": "折扣促销到期日期",
                  "DataType": 4
                },
                {
                  "ID": 8,
                  "Name": "email",
                  "OrderNo": 7,
                  "DisplayName": "E-mail",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 9,
                  "Name": "endDate",
                  "OrderNo": 8,
                  "DisplayName": "到期日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 10,
                  "Name": "fullReductionPromotionEndDate",
                  "OrderNo": 9,
                  "DisplayName": "满减促销到期日期",
                  "DataType": 4
                },
                {
                  "ID": 11,
                  "Name": "introduction",
                  "OrderNo": 10,
                  "DisplayName": "简介",
                  "DataType": 7,
                  "DataLength": -1
                },
                {
                  "ID": 12,
                  "Name": "isEnabled",
                  "OrderNo": 11,
                  "DisplayName": "是否启用",
                  "DataType": 5,
                  "Not_Nullable": true,
                  "DataLength": 1
                },
                {
                  "ID": 13,
                  "Name": "keyword",
                  "OrderNo": 12,
                  "DisplayName": "搜索关键词",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 14,
                  "Name": "logo",
                  "OrderNo": 13,
                  "DisplayName": "logo",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 15,
                  "Name": "mobile",
                  "OrderNo": 14,
                  "DisplayName": "手机",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 16,
                  "Name": "name",
                  "OrderNo": 15,
                  "DisplayName": "名称",
                  "DataType": 1,
                  "IndexType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 17,
                  "Name": "phone",
                  "OrderNo": 16,
                  "DisplayName": "电话",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 18,
                  "Name": "status",
                  "OrderNo": 17,
                  "DisplayName": "状态",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 19,
                  "Name": "type",
                  "OrderNo": 18,
                  "DisplayName": "类型",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 20,
                  "Name": "zipCode",
                  "OrderNo": 19,
                  "DisplayName": "邮编",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 21,
                  "Name": "business_id",
                  "OrderNo": 20,
                  "DisplayName": "商家",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "business",
                  "RelateField": "id",
                  "IndexType": 2,
                  "Not_Nullable": true,
                  "GraphDesc": "P1=321.00,247.00\r\nP2=545.00,247.00\r\nP3=545.00,247.00\r\nP4=769.32,247.00\r\nHookP1=283.00,237.00\r\nHookP2=65.68,226.71\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1"
                },
                {
                  "ID": 22,
                  "Name": "storeCategory_id",
                  "OrderNo": 21,
                  "DisplayName": "店铺分类",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "storecategory",
                  "RelateField": "id",
                  "IndexType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 23,
                  "Name": "storeRank_id",
                  "OrderNo": 22,
                  "DisplayName": "店铺等级",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "storerank",
                  "RelateField": "id",
                  "IndexType": 2,
                  "Not_Nullable": true
                }
              ]
            }
          },
          {
            "ID": 4,
            "Name": "product",
            "Caption": "商品",
            "OrderNo": 4,
            "GraphDesc": "Left=1360.25\r\nTop=39.50",
            "BgColor": 16765650,
            "MetaFields": {
              "Count": 61,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "Not_Nullable": true
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 2,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 3,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 25,
                  "Name": "caption",
                  "OrderNo": 4,
                  "DisplayName": "副标题",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 26,
                  "Name": "cost",
                  "OrderNo": 5,
                  "DisplayName": "成本价",
                  "DataType": 3,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 27,
                  "Name": "hits",
                  "OrderNo": 6,
                  "DisplayName": "点击数",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 28,
                  "Name": "image",
                  "OrderNo": 7,
                  "DisplayName": "展示图片",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 29,
                  "Name": "introduction",
                  "OrderNo": 8,
                  "DisplayName": "介绍",
                  "DataType": 7,
                  "DataLength": -1
                },
                {
                  "ID": 30,
                  "Name": "isActive",
                  "OrderNo": 9,
                  "DisplayName": "是否有效",
                  "DataType": 5,
                  "Not_Nullable": true,
                  "DataLength": 1
                },
                {
                  "ID": 31,
                  "Name": "isDelivery",
                  "OrderNo": 10,
                  "DisplayName": "是否需要物流",
                  "DataType": 5,
                  "Not_Nullable": true,
                  "DataLength": 1
                },
                {
                  "ID": 32,
                  "Name": "isList",
                  "OrderNo": 11,
                  "DisplayName": "是否列出",
                  "DataType": 5,
                  "Not_Nullable": true,
                  "DataLength": 1
                },
                {
                  "ID": 33,
                  "Name": "isMarketable",
                  "OrderNo": 12,
                  "DisplayName": "是否上架",
                  "DataType": 5,
                  "Not_Nullable": true,
                  "DataLength": 1
                },
                {
                  "ID": 34,
                  "Name": "isTop",
                  "OrderNo": 13,
                  "DisplayName": "是否置顶",
                  "DataType": 5,
                  "Not_Nullable": true,
                  "DataLength": 1
                },
                {
                  "ID": 35,
                  "Name": "keyword",
                  "OrderNo": 14,
                  "DisplayName": "搜索关键词",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 36,
                  "Name": "marketPrice",
                  "OrderNo": 15,
                  "DisplayName": "市场价",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 37,
                  "Name": "memo",
                  "OrderNo": 16,
                  "DisplayName": "备注",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 38,
                  "Name": "monthHits",
                  "OrderNo": 17,
                  "DisplayName": "月点击数",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 39,
                  "Name": "monthHitsDate",
                  "OrderNo": 18,
                  "DisplayName": "月点击数更新日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 40,
                  "Name": "monthSales",
                  "OrderNo": 19,
                  "DisplayName": "月销量",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 41,
                  "Name": "monthSalesDate",
                  "OrderNo": 20,
                  "DisplayName": "月销量更新日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 42,
                  "Name": "name",
                  "OrderNo": 21,
                  "DisplayName": "名称",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 43,
                  "Name": "parameterValues",
                  "OrderNo": 22,
                  "DisplayName": "参数值",
                  "DataType": 7,
                  "DataLength": -1
                },
                {
                  "ID": 44,
                  "Name": "price",
                  "OrderNo": 23,
                  "DisplayName": "销售价",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 45,
                  "Name": "productImages",
                  "OrderNo": 24,
                  "DisplayName": "商品图片",
                  "DataType": 7,
                  "DataLength": -1
                },
                {
                  "ID": 46,
                  "Name": "sales",
                  "OrderNo": 25,
                  "DisplayName": "销量",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 47,
                  "Name": "score",
                  "OrderNo": 26,
                  "DisplayName": "评分",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 12,
                  "DataScale": 31
                },
                {
                  "ID": 48,
                  "Name": "scoreCount",
                  "OrderNo": 27,
                  "DisplayName": "评分数",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 49,
                  "Name": "sn",
                  "OrderNo": 28,
                  "DisplayName": "编号",
                  "DataType": 1,
                  "IndexType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 50,
                  "Name": "specificationItems",
                  "OrderNo": 29,
                  "DisplayName": "规格项",
                  "DataType": 7,
                  "DataLength": -1
                },
                {
                  "ID": 51,
                  "Name": "totalScore",
                  "OrderNo": 30,
                  "DisplayName": "总评分",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 52,
                  "Name": "type",
                  "OrderNo": 31,
                  "DisplayName": "类型",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 53,
                  "Name": "unit",
                  "OrderNo": 32,
                  "DisplayName": "单位",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 54,
                  "Name": "weekHits",
                  "OrderNo": 33,
                  "DisplayName": "周点击数",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 55,
                  "Name": "weekHitsDate",
                  "OrderNo": 34,
                  "DisplayName": "周点击数更新日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 56,
                  "Name": "weekSales",
                  "OrderNo": 35,
                  "DisplayName": "周销量",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 57,
                  "Name": "weekSalesDate",
                  "OrderNo": 36,
                  "DisplayName": "周销量更新日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 58,
                  "Name": "weight",
                  "OrderNo": 37,
                  "DisplayName": "重量",
                  "DataType": 2
                },
                {
                  "ID": 59,
                  "Name": "brand_id",
                  "OrderNo": 38,
                  "DisplayName": "品牌",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "brand",
                  "RelateField": "id",
                  "IndexType": 2
                },
                {
                  "ID": 60,
                  "Name": "productCategory_id",
                  "OrderNo": 39,
                  "DisplayName": "商品分类",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "productcategory",
                  "RelateField": "id",
                  "IndexType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 61,
                  "Name": "store_id",
                  "OrderNo": 40,
                  "DisplayName": "店铺",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "store",
                  "RelateField": "id",
                  "IndexType": 2,
                  "Not_Nullable": true,
                  "GraphDesc": "P1=1131.32,217.00\r\nP2=1246.00,217.00\r\nP3=1246.00,217.00\r\nP4=1360.25,217.00\r\nHookP1=306.68,196.71\r\nHookP2=19.75,177.50\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1"
                },
                {
                  "ID": 62,
                  "Name": "storeProductCategory_id",
                  "OrderNo": 41,
                  "DisplayName": "店铺商品分类",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "storeproductcategory",
                  "RelateField": "id",
                  "IndexType": 2
                },
                {
                  "ID": 5,
                  "Name": "attributeValue0",
                  "OrderNo": 42,
                  "DisplayName": "属性值0",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 6,
                  "Name": "attributeValue1",
                  "OrderNo": 43,
                  "DisplayName": "属性值1",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 17,
                  "Name": "attributeValue2",
                  "OrderNo": 44,
                  "DisplayName": "属性值2",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 18,
                  "Name": "attributeValue3",
                  "OrderNo": 45,
                  "DisplayName": "属性值3",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 19,
                  "Name": "attributeValue4",
                  "OrderNo": 46,
                  "DisplayName": "属性值4",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 20,
                  "Name": "attributeValue5",
                  "OrderNo": 47,
                  "DisplayName": "属性值5",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 21,
                  "Name": "attributeValue6",
                  "OrderNo": 48,
                  "DisplayName": "属性值6",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 22,
                  "Name": "attributeValue7",
                  "OrderNo": 49,
                  "DisplayName": "属性值7",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 23,
                  "Name": "attributeValue8",
                  "OrderNo": 50,
                  "DisplayName": "属性值8",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 24,
                  "Name": "attributeValue9",
                  "OrderNo": 51,
                  "DisplayName": "属性值9",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 7,
                  "Name": "attributeValue10",
                  "OrderNo": 52,
                  "DisplayName": "属性值10",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 8,
                  "Name": "attributeValue11",
                  "OrderNo": 53,
                  "DisplayName": "属性值11",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 9,
                  "Name": "attributeValue12",
                  "OrderNo": 54,
                  "DisplayName": "属性值12",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 10,
                  "Name": "attributeValue13",
                  "OrderNo": 55,
                  "DisplayName": "属性值13",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 11,
                  "Name": "attributeValue14",
                  "OrderNo": 56,
                  "DisplayName": "属性值14",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 12,
                  "Name": "attributeValue15",
                  "OrderNo": 57,
                  "DisplayName": "属性值15",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 13,
                  "Name": "attributeValue16",
                  "OrderNo": 58,
                  "DisplayName": "属性值16",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 14,
                  "Name": "attributeValue17",
                  "OrderNo": 59,
                  "DisplayName": "属性值17",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 15,
                  "Name": "attributeValue18",
                  "OrderNo": 60,
                  "DisplayName": "属性值18",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 16,
                  "Name": "attributeValue19",
                  "OrderNo": 61,
                  "DisplayName": "属性值19",
                  "DataType": 1,
                  "DataLength": 255
                }
              ]
            }
          },
          {
            "ID": 5,
            "Name": "paymenttransaction",
            "Caption": "支付事务",
            "OrderNo": 5,
            "GraphDesc": "Left=740.69\r\nTop=493.60",
            "MetaFields": {
              "Count": 16,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "Not_Nullable": true
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 2,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 3,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 5,
                  "Name": "amount",
                  "OrderNo": 4,
                  "DisplayName": "金额",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 6,
                  "Name": "expire",
                  "OrderNo": 5,
                  "DisplayName": "过期时间",
                  "DataType": 4
                },
                {
                  "ID": 7,
                  "Name": "fee",
                  "OrderNo": 6,
                  "DisplayName": "支付手续费",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 8,
                  "Name": "isSuccess",
                  "OrderNo": 7,
                  "DisplayName": "是否成功",
                  "DataType": 5,
                  "DataLength": 1
                },
                {
                  "ID": 9,
                  "Name": "paymentPluginId",
                  "OrderNo": 8,
                  "DisplayName": "支付插件ID",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 10,
                  "Name": "paymentPluginName",
                  "OrderNo": 9,
                  "DisplayName": "支付插件名称",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 11,
                  "Name": "sn",
                  "OrderNo": 10,
                  "DisplayName": "编号",
                  "DataType": 1,
                  "IndexType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 12,
                  "Name": "type",
                  "OrderNo": 11,
                  "DisplayName": "类型",
                  "DataType": 2
                },
                {
                  "ID": 13,
                  "Name": "orders",
                  "OrderNo": 12,
                  "DisplayName": "订单",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "orders",
                  "RelateField": "id",
                  "IndexType": 2,
                  "GraphDesc": "P1=962.00,828.49\r\nP2=962.00,800.00\r\nP3=962.00,800.00\r\nP4=962.00,771.60\r\nHookP1=30.61,107.51\r\nHookP2=221.31,258.40\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=0\r\nHorz2=0"
                },
                {
                  "ID": 14,
                  "Name": "parent_id",
                  "OrderNo": 13,
                  "DisplayName": "父事务",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "paymenttransaction",
                  "RelateField": "id",
                  "IndexType": 2,
                  "GraphDesc": "P1=991.69,520.00\r\nP2=1016.00,520.00\r\nP3=1016.00,556.00\r\nP4=991.69,556.00\r\nHookP1=133.31,26.40\r\nHookP2=133.31,62.40\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1"
                },
                {
                  "ID": 15,
                  "Name": "store_id",
                  "OrderNo": 14,
                  "DisplayName": "店铺",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "store",
                  "RelateField": "id",
                  "IndexType": 2,
                  "GraphDesc": "P1=881.00,394.29\r\nP2=881.00,444.00\r\nP3=881.00,444.00\r\nP4=881.00,493.60\r\nHookP1=111.68,329.71\r\nHookP2=140.31,36.40\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=0\r\nHorz2=0"
                },
                {
                  "ID": 16,
                  "Name": "svc_id",
                  "OrderNo": 15,
                  "DisplayName": "服务",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "svc",
                  "RelateField": "id",
                  "IndexType": 2
                },
                {
                  "ID": 17,
                  "Name": "user_id",
                  "OrderNo": 16,
                  "DisplayName": "用户",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "users",
                  "RelateField": "id",
                  "IndexType": 2,
                  "GraphDesc": "P1=616.32,554.00\r\nP2=679.00,554.00\r\nP3=679.00,554.00\r\nP4=740.69,554.00\r\nHookP1=177.68,104.71\r\nHookP2=44.31,60.40\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1"
                }
              ]
            }
          },
          {
            "ID": 6,
            "Name": "paymentmethod",
            "Caption": "支付方式",
            "OrderNo": 6,
            "GraphDesc": "Left=968.24\r\nTop=1806.80",
            "MetaFields": {
              "Count": 11,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "Not_Nullable": true
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 2,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 3,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 5,
                  "Name": "orders",
                  "OrderNo": 4,
                  "DisplayName": "排序",
                  "DataType": 2
                },
                {
                  "ID": 6,
                  "Name": "content",
                  "OrderNo": 5,
                  "DisplayName": "内容",
                  "DataType": 7,
                  "DataLength": -1
                },
                {
                  "ID": 7,
                  "Name": "description",
                  "OrderNo": 6,
                  "DisplayName": "介绍",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 8,
                  "Name": "icon",
                  "OrderNo": 7,
                  "DisplayName": "图标",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 9,
                  "Name": "method",
                  "OrderNo": 8,
                  "DisplayName": "方式",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 10,
                  "Name": "name",
                  "OrderNo": 9,
                  "DisplayName": "名称",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 11,
                  "Name": "timeout",
                  "OrderNo": 10,
                  "DisplayName": "超时时间",
                  "DataType": 2
                },
                {
                  "ID": 12,
                  "Name": "type",
                  "OrderNo": 11,
                  "DisplayName": "类型",
                  "DataType": 2,
                  "Not_Nullable": true
                }
              ]
            }
          },
          {
            "ID": 7,
            "Name": "ordershippingitem",
            "Caption": "发货项",
            "OrderNo": 7,
            "GraphDesc": "Left=1897.22\r\nTop=1526.26",
            "MetaFields": {
              "Count": 10,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "Not_Nullable": true
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 2,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 3,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 5,
                  "Name": "isDelivery",
                  "OrderNo": 4,
                  "DisplayName": "是否需要物流",
                  "DataType": 5,
                  "Not_Nullable": true,
                  "DataLength": 1
                },
                {
                  "ID": 6,
                  "Name": "name",
                  "OrderNo": 5,
                  "DisplayName": "SKU名称",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 7,
                  "Name": "quantity",
                  "OrderNo": 6,
                  "DisplayName": "数量",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 8,
                  "Name": "sn",
                  "OrderNo": 7,
                  "DisplayName": "SKU编号",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 9,
                  "Name": "specifications",
                  "OrderNo": 8,
                  "DisplayName": "规格",
                  "DataType": 7,
                  "DataLength": -1
                },
                {
                  "ID": 10,
                  "Name": "orderShipping_id",
                  "OrderNo": 9,
                  "DisplayName": "订单发货",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "ordershipping",
                  "RelateField": "id",
                  "IndexType": 2,
                  "Not_Nullable": true,
                  "GraphDesc": "P1=1803.96,1617.00\r\nP2=1851.00,1617.00\r\nP3=1851.00,1617.00\r\nP4=1897.22,1617.00\r\nHookP1=216.04,117.47\r\nHookP2=19.78,90.74\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1"
                },
                {
                  "ID": 11,
                  "Name": "sku_id",
                  "OrderNo": 10,
                  "DisplayName": "SKU",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "sku",
                  "RelateField": "id",
                  "IndexType": 2
                }
              ]
            }
          },
          {
            "ID": 8,
            "Name": "business",
            "Caption": "商家",
            "OrderNo": 8,
            "GraphDesc": "Left=10.00\r\nTop=10.00",
            "BgColor": 13828095,
            "MetaFields": {
              "Count": 42,
              "items": [
                {
                  "ID": 42,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "RelateTable": "users",
                  "RelateField": "id",
                  "Not_Nullable": true,
                  "GraphDesc": "P1=402.32,497.00\r\nP2=362.00,497.00\r\nP3=362.00,497.00\r\nP4=321.00,497.00\r\nHookP1=19.68,47.71\r\nHookP2=291.00,487.00\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1"
                },
                {
                  "ID": 41,
                  "Name": "username",
                  "OrderNo": 2,
                  "DisplayName": "用户名",
                  "DataType": 1,
                  "IndexType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255,
                  "TestDataType": "login_name",
                  "TestDataRules": "\r\n\r\n",
                  "FieldWeight": 1
                },
                {
                  "ID": 34,
                  "Name": "name",
                  "OrderNo": 3,
                  "DisplayName": "名称",
                  "DataType": 1,
                  "DataLength": 255,
                  "TestDataType": "company_cn"
                },
                {
                  "ID": 33,
                  "Name": "mobile",
                  "OrderNo": 4,
                  "DisplayName": "手机",
                  "DataType": 1,
                  "IndexType": 1,
                  "DataLength": 255,
                  "TestDataType": "cell_phone",
                  "FieldWeight": 1
                },
                {
                  "ID": 21,
                  "Name": "balance",
                  "OrderNo": 5,
                  "DisplayName": "余额",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 29,
                  "DataScale": 12
                },
                {
                  "ID": 22,
                  "Name": "bankAccount",
                  "OrderNo": 6,
                  "DisplayName": "银行账号",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3
                },
                {
                  "ID": 23,
                  "Name": "bankName",
                  "OrderNo": 7,
                  "DisplayName": "银行开户名",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3
                },
                {
                  "ID": 24,
                  "Name": "email",
                  "OrderNo": 8,
                  "DisplayName": "E-mail",
                  "DataType": 1,
                  "IndexType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255,
                  "FieldWeight": 1
                },
                {
                  "ID": 25,
                  "Name": "encodedPassword",
                  "OrderNo": 9,
                  "DisplayName": "加密密码",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 26,
                  "Name": "frozenFund",
                  "OrderNo": 10,
                  "DisplayName": "冻结金额",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 29,
                  "DataScale": 12
                },
                {
                  "ID": 27,
                  "Name": "idCard",
                  "OrderNo": 11,
                  "DisplayName": "法人代表身份证",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 28,
                  "Name": "idCardImage",
                  "OrderNo": 12,
                  "DisplayName": "法人代表身份证图片",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 29,
                  "Name": "identificationNumber",
                  "OrderNo": 13,
                  "DisplayName": "纳税人识别号",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 30,
                  "Name": "legalPerson",
                  "OrderNo": 14,
                  "DisplayName": "法人代表姓名",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 31,
                  "Name": "licenseImage",
                  "OrderNo": 15,
                  "DisplayName": "营业执照号图片",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 32,
                  "Name": "licenseNumber",
                  "OrderNo": 16,
                  "DisplayName": "营业执照号",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 35,
                  "Name": "organizationCode",
                  "OrderNo": 17,
                  "DisplayName": "组织机构代码",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 36,
                  "Name": "organizationImage",
                  "OrderNo": 18,
                  "DisplayName": "组织机构代码证图片",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 37,
                  "Name": "phone",
                  "OrderNo": 19,
                  "DisplayName": "电话",
                  "DataType": 1,
                  "DataLength": 255,
                  "TestDataType": "phone"
                },
                {
                  "ID": 38,
                  "Name": "safeKeyExpire",
                  "OrderNo": 20,
                  "DisplayName": "安全密匙",
                  "DataType": 4,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 39,
                  "Name": "safeKeyValue",
                  "OrderNo": 21,
                  "DisplayName": "安全密匙",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 40,
                  "Name": "taxImage",
                  "OrderNo": 22,
                  "DisplayName": "税务登记证图片",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 1,
                  "Name": "attributeValue0",
                  "OrderNo": 23,
                  "DisplayName": "商家注册项值0",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 2,
                  "Name": "attributeValue1",
                  "OrderNo": 24,
                  "DisplayName": "商家注册项值1",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 13,
                  "Name": "attributeValue2",
                  "OrderNo": 25,
                  "DisplayName": "商家注册项值2",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 14,
                  "Name": "attributeValue3",
                  "OrderNo": 26,
                  "DisplayName": "商家注册项值3",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 15,
                  "Name": "attributeValue4",
                  "OrderNo": 27,
                  "DisplayName": "商家注册项值4",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 16,
                  "Name": "attributeValue5",
                  "OrderNo": 28,
                  "DisplayName": "商家注册项值5",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 17,
                  "Name": "attributeValue6",
                  "OrderNo": 29,
                  "DisplayName": "商家注册项值6",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 18,
                  "Name": "attributeValue7",
                  "OrderNo": 30,
                  "DisplayName": "商家注册项值7",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 19,
                  "Name": "attributeValue8",
                  "OrderNo": 31,
                  "DisplayName": "商家注册项值8",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 20,
                  "Name": "attributeValue9",
                  "OrderNo": 32,
                  "DisplayName": "商家注册项值9",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -1
                },
                {
                  "ID": 3,
                  "Name": "attributeValue10",
                  "OrderNo": 33,
                  "DisplayName": "商家注册项值10",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 4,
                  "Name": "attributeValue11",
                  "OrderNo": 34,
                  "DisplayName": "商家注册项值11",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 5,
                  "Name": "attributeValue12",
                  "OrderNo": 35,
                  "DisplayName": "商家注册项值12",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 6,
                  "Name": "attributeValue13",
                  "OrderNo": 36,
                  "DisplayName": "商家注册项值13",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 7,
                  "Name": "attributeValue14",
                  "OrderNo": 37,
                  "DisplayName": "商家注册项值14",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 8,
                  "Name": "attributeValue15",
                  "OrderNo": 38,
                  "DisplayName": "商家注册项值15",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 9,
                  "Name": "attributeValue16",
                  "OrderNo": 39,
                  "DisplayName": "商家注册项值16",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 10,
                  "Name": "attributeValue17",
                  "OrderNo": 40,
                  "DisplayName": "商家注册项值17",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 11,
                  "Name": "attributeValue18",
                  "OrderNo": 41,
                  "DisplayName": "商家注册项值18",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -9
                },
                {
                  "ID": 12,
                  "Name": "attributeValue19",
                  "OrderNo": 42,
                  "DisplayName": "商家注册项值19",
                  "DataType": 1,
                  "DataLength": 255,
                  "Visibility": 3,
                  "FieldWeight": -9
                }
              ]
            }
          },
          {
            "ID": 9,
            "Name": "ordershipping",
            "Caption": "订单发货",
            "OrderNo": 9,
            "GraphDesc": "Left=1559.96\r\nTop=1499.53",
            "MetaFields": {
              "Count": 17,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "Not_Nullable": true
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 2,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 3,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 5,
                  "Name": "address",
                  "OrderNo": 4,
                  "DisplayName": "地址",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 6,
                  "Name": "area",
                  "OrderNo": 5,
                  "DisplayName": "地区",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 7,
                  "Name": "consignee",
                  "OrderNo": 6,
                  "DisplayName": "收货人",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 8,
                  "Name": "deliveryCorp",
                  "OrderNo": 7,
                  "DisplayName": "物流公司",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 9,
                  "Name": "deliveryCorpCode",
                  "OrderNo": 8,
                  "DisplayName": "物流公司代码",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 10,
                  "Name": "deliveryCorpUrl",
                  "OrderNo": 9,
                  "DisplayName": "物流公司网址",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 11,
                  "Name": "freight",
                  "OrderNo": 10,
                  "DisplayName": "物流费用",
                  "DataType": 3,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 12,
                  "Name": "memo",
                  "OrderNo": 11,
                  "DisplayName": "备注",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 13,
                  "Name": "phone",
                  "OrderNo": 12,
                  "DisplayName": "电话",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 14,
                  "Name": "shippingMethod",
                  "OrderNo": 13,
                  "DisplayName": "配送方式",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 15,
                  "Name": "sn",
                  "OrderNo": 14,
                  "DisplayName": "编号",
                  "DataType": 1,
                  "IndexType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 16,
                  "Name": "trackingNo",
                  "OrderNo": 15,
                  "DisplayName": "运单号",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 17,
                  "Name": "zipCode",
                  "OrderNo": 16,
                  "DisplayName": "邮编",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 18,
                  "Name": "orders",
                  "OrderNo": 17,
                  "DisplayName": "订单",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "orders",
                  "RelateField": "id",
                  "IndexType": 2,
                  "Not_Nullable": true,
                  "GraphDesc": "P1=1212.39,1525.00\r\nP2=1386.00,1525.00\r\nP3=1386.00,1541.00\r\nP4=1559.96,1541.00\r\nHookP1=180.61,696.51\r\nHookP2=20.04,41.47\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1"
                }
              ]
            }
          },
          {
            "ID": 10,
            "Name": "orders_coupon",
            "Caption": "订单优惠券中间表",
            "OrderNo": 10,
            "GraphDesc": "Left=671.60\r\nTop=1440.51",
            "MetaFields": {
              "Count": 2,
              "items": [
                {
                  "ID": 1,
                  "Name": "orders_id",
                  "OrderNo": 1,
                  "DisplayName": "订单",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "orders",
                  "RelateField": "id",
                  "IndexType": 2,
                  "Not_Nullable": true,
                  "GraphDesc": "P1=931.39,1468.00\r\nP2=916.00,1468.00\r\nP3=916.00,1468.00\r\nP4=900.60,1468.00\r\nHookP1=91.61,639.51\r\nHookP2=209.40,27.49\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1"
                },
                {
                  "ID": 2,
                  "Name": "coupons_id",
                  "OrderNo": 2,
                  "DisplayName": "赠送优惠券",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "coupon",
                  "RelateField": "id",
                  "IndexType": 2,
                  "Not_Nullable": true,
                  "GraphDesc": "P1=779.00,1393.49\r\nP2=779.00,1417.00\r\nP3=779.00,1417.00\r\nP4=779.00,1440.51\r\nHookP1=158.77,257.51\r\nHookP2=107.40,19.49\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=0\r\nHorz2=0"
                }
              ]
            }
          },
          {
            "ID": 11,
            "Name": "orders",
            "Caption": "订单",
            "OrderNo": 11,
            "GraphDesc": "Left=931.39\r\nTop=828.49",
            "BgColor": 12910532,
            "MetaFields": {
              "Count": 45,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "Not_Nullable": true
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 2,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 3,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 5,
                  "Name": "address",
                  "OrderNo": 4,
                  "DisplayName": "地址",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 6,
                  "Name": "amount",
                  "OrderNo": 5,
                  "DisplayName": "订单金额",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 7,
                  "Name": "amountPaid",
                  "OrderNo": 6,
                  "DisplayName": "已付金额",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 8,
                  "Name": "areaName",
                  "OrderNo": 7,
                  "DisplayName": "地区名称",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 9,
                  "Name": "completeDate",
                  "OrderNo": 8,
                  "DisplayName": "完成日期",
                  "DataType": 4
                },
                {
                  "ID": 10,
                  "Name": "consignee",
                  "OrderNo": 9,
                  "DisplayName": "收货人",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 11,
                  "Name": "couponDiscount",
                  "OrderNo": 10,
                  "DisplayName": "优惠券折扣",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 12,
                  "Name": "exchangePoint",
                  "OrderNo": 11,
                  "DisplayName": "兑换积分",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 13,
                  "Name": "expire",
                  "OrderNo": 12,
                  "DisplayName": "过期时间",
                  "DataType": 4
                },
                {
                  "ID": 14,
                  "Name": "fee",
                  "OrderNo": 13,
                  "DisplayName": "支付手续费",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 15,
                  "Name": "freight",
                  "OrderNo": 14,
                  "DisplayName": "运费",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 16,
                  "Name": "invoiceContent",
                  "OrderNo": 15,
                  "DisplayName": "发票",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 17,
                  "Name": "invoiceTitle",
                  "OrderNo": 16,
                  "DisplayName": "发票",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 18,
                  "Name": "isAllocatedStock",
                  "OrderNo": 17,
                  "DisplayName": "是否已分配库存",
                  "DataType": 5,
                  "Not_Nullable": true,
                  "DataLength": 1
                },
                {
                  "ID": 19,
                  "Name": "isExchangePoint",
                  "OrderNo": 18,
                  "DisplayName": "是否已兑换积分",
                  "DataType": 5,
                  "Not_Nullable": true,
                  "DataLength": 1
                },
                {
                  "ID": 20,
                  "Name": "isUseCouponCode",
                  "OrderNo": 19,
                  "DisplayName": "是否已使用优惠码",
                  "DataType": 5,
                  "Not_Nullable": true,
                  "DataLength": 1
                },
                {
                  "ID": 21,
                  "Name": "memo",
                  "OrderNo": 20,
                  "DisplayName": "附言",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 22,
                  "Name": "offsetAmount",
                  "OrderNo": 21,
                  "DisplayName": "调整金额",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 23,
                  "Name": "paymentMethodName",
                  "OrderNo": 22,
                  "DisplayName": "支付方式名称",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 24,
                  "Name": "paymentMethodType",
                  "OrderNo": 23,
                  "DisplayName": "支付方式类型",
                  "DataType": 2
                },
                {
                  "ID": 25,
                  "Name": "phone",
                  "OrderNo": 24,
                  "DisplayName": "电话",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 26,
                  "Name": "price",
                  "OrderNo": 25,
                  "DisplayName": "价格",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 27,
                  "Name": "promotionDiscount",
                  "OrderNo": 26,
                  "DisplayName": "促销折扣",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 28,
                  "Name": "promotionNames",
                  "OrderNo": 27,
                  "DisplayName": "促销名称",
                  "DataType": 7,
                  "DataLength": -1
                },
                {
                  "ID": 29,
                  "Name": "quantity",
                  "OrderNo": 28,
                  "DisplayName": "数量",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 30,
                  "Name": "refundAmount",
                  "OrderNo": 29,
                  "DisplayName": "退款金额",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 31,
                  "Name": "returnedQuantity",
                  "OrderNo": 30,
                  "DisplayName": "已退货数量",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 32,
                  "Name": "rewardPoint",
                  "OrderNo": 31,
                  "DisplayName": "赠送积分",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 33,
                  "Name": "shippedQuantity",
                  "OrderNo": 32,
                  "DisplayName": "已发货数量",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 34,
                  "Name": "shippingMethodName",
                  "OrderNo": 33,
                  "DisplayName": "配送方式名称",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 35,
                  "Name": "sn",
                  "OrderNo": 34,
                  "DisplayName": "编号",
                  "DataType": 1,
                  "IndexType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 36,
                  "Name": "status",
                  "OrderNo": 35,
                  "DisplayName": "状态",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 37,
                  "Name": "tax",
                  "OrderNo": 36,
                  "DisplayName": "税金",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 38,
                  "Name": "type",
                  "OrderNo": 37,
                  "DisplayName": "类型",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 39,
                  "Name": "weight",
                  "OrderNo": 38,
                  "DisplayName": "重量",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 40,
                  "Name": "zipCode",
                  "OrderNo": 39,
                  "DisplayName": "邮编",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 41,
                  "Name": "area_id",
                  "OrderNo": 40,
                  "DisplayName": "地区",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "area",
                  "RelateField": "id",
                  "IndexType": 2
                },
                {
                  "ID": 42,
                  "Name": "couponCode_id",
                  "OrderNo": 41,
                  "DisplayName": "优惠码",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "couponcode",
                  "RelateField": "id",
                  "IndexType": 2,
                  "GraphDesc": "P1=672.78,1619.00\r\nP2=877.60,1619.00\r\nP3=877.60,1510.00\r\nP4=931.39,1510.00\r\nHookP1=171.22,36.36\r\nHookP2=59.61,681.51\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=1\r\nHorz1=1\r\nHorz2=1"
                },
                {
                  "ID": 43,
                  "Name": "member_id",
                  "OrderNo": 42,
                  "DisplayName": "会员",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "member",
                  "RelateField": "id",
                  "IndexType": 2,
                  "Not_Nullable": true,
                  "GraphDesc": "P1=600.92,1001.00\r\nP2=766.00,1001.00\r\nP3=766.00,1001.00\r\nP4=931.39,1001.00\r\nHookP1=192.08,233.40\r\nHookP2=67.61,172.51\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1"
                },
                {
                  "ID": 44,
                  "Name": "paymentMethod_id",
                  "OrderNo": 43,
                  "DisplayName": "支付方式",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "paymentmethod",
                  "RelateField": "id",
                  "IndexType": 2,
                  "GraphDesc": "P1=1072.00,1806.80\r\nP2=1072.00,1689.00\r\nP3=1072.00,1689.00\r\nP4=1072.00,1570.49\r\nHookP1=103.76,20.20\r\nHookP2=140.61,665.51\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=0\r\nHorz2=0"
                },
                {
                  "ID": 45,
                  "Name": "shippingMethod_id",
                  "OrderNo": 44,
                  "DisplayName": "配送方式",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "shippingmethod",
                  "RelateField": "id",
                  "IndexType": 2
                },
                {
                  "ID": 46,
                  "Name": "store_id",
                  "OrderNo": 45,
                  "DisplayName": "店铺",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "store",
                  "RelateField": "id",
                  "IndexType": 2,
                  "Not_Nullable": true,
                  "GraphDesc": "P1=1031.00,394.29\r\nP2=1031.00,611.00\r\nP3=1031.00,611.00\r\nP4=1031.00,828.49\r\nHookP1=261.68,337.71\r\nHookP2=99.61,83.51\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=0\r\nHorz2=0"
                }
              ]
            }
          },
          {
            "ID": 12,
            "Name": "orderreturnsitem",
            "Caption": "退货项",
            "OrderNo": 12,
            "GraphDesc": "Left=1715.02\r\nTop=1216.86",
            "MetaFields": {
              "Count": 8,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "Not_Nullable": true
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 2,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 3,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 5,
                  "Name": "name",
                  "OrderNo": 4,
                  "DisplayName": "名称",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 6,
                  "Name": "quantity",
                  "OrderNo": 5,
                  "DisplayName": "数量",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 7,
                  "Name": "sn",
                  "OrderNo": 6,
                  "DisplayName": "编号",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 8,
                  "Name": "specifications",
                  "OrderNo": 7,
                  "DisplayName": "规格",
                  "DataType": 7,
                  "DataLength": -1
                },
                {
                  "ID": 9,
                  "Name": "orderReturns_id",
                  "OrderNo": 8,
                  "DisplayName": "订单退货",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "orderreturns",
                  "RelateField": "id",
                  "IndexType": 2,
                  "Not_Nullable": true,
                  "GraphDesc": "P1=1604.82,1283.00\r\nP2=1660.00,1283.00\r\nP3=1660.00,1283.00\r\nP4=1715.02,1283.00\r\nHookP1=201.18,196.62\r\nHookP2=19.98,66.14\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1"
                }
              ]
            }
          },
          {
            "ID": 13,
            "Name": "orderreturns",
            "Caption": "订单退货",
            "OrderNo": 13,
            "GraphDesc": "Left=1375.82\r\nTop=1086.38",
            "MetaFields": {
              "Count": 15,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "Not_Nullable": true
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 2,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 3,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 5,
                  "Name": "address",
                  "OrderNo": 4,
                  "DisplayName": "地址",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 6,
                  "Name": "area",
                  "OrderNo": 5,
                  "DisplayName": "地区",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 7,
                  "Name": "deliveryCorp",
                  "OrderNo": 6,
                  "DisplayName": "物流公司",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 8,
                  "Name": "freight",
                  "OrderNo": 7,
                  "DisplayName": "物流费用",
                  "DataType": 3,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 9,
                  "Name": "memo",
                  "OrderNo": 8,
                  "DisplayName": "备注",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 10,
                  "Name": "phone",
                  "OrderNo": 9,
                  "DisplayName": "电话",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 11,
                  "Name": "shipper",
                  "OrderNo": 10,
                  "DisplayName": "发货人",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 12,
                  "Name": "shippingMethod",
                  "OrderNo": 11,
                  "DisplayName": "配送方式",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 13,
                  "Name": "sn",
                  "OrderNo": 12,
                  "DisplayName": "编号",
                  "DataType": 1,
                  "IndexType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 14,
                  "Name": "trackingNo",
                  "OrderNo": 13,
                  "DisplayName": "运单号",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 15,
                  "Name": "zipCode",
                  "OrderNo": 14,
                  "DisplayName": "邮编",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 16,
                  "Name": "orders",
                  "OrderNo": 15,
                  "DisplayName": "订单",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "orders",
                  "RelateField": "id",
                  "IndexType": 2,
                  "Not_Nullable": true,
                  "GraphDesc": "P1=1212.39,1217.00\r\nP2=1294.00,1217.00\r\nP3=1294.00,1217.00\r\nP4=1375.82,1217.00\r\nHookP1=228.61,388.51\r\nHookP2=20.18,130.62\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1"
                }
              ]
            }
          },
          {
            "ID": 14,
            "Name": "orderrefunds",
            "Caption": "订单退款",
            "OrderNo": 14,
            "GraphDesc": "Left=1816.11\r\nTop=953.61",
            "MetaFields": {
              "Count": 12,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "Not_Nullable": true
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 2,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 3,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 5,
                  "Name": "account",
                  "OrderNo": 4,
                  "DisplayName": "退款账号",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 6,
                  "Name": "amount",
                  "OrderNo": 5,
                  "DisplayName": "退款金额",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 7,
                  "Name": "bank",
                  "OrderNo": 6,
                  "DisplayName": "退款银行",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 8,
                  "Name": "memo",
                  "OrderNo": 7,
                  "DisplayName": "备注",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 9,
                  "Name": "method",
                  "OrderNo": 8,
                  "DisplayName": "方式",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 10,
                  "Name": "payee",
                  "OrderNo": 9,
                  "DisplayName": "收款人",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 11,
                  "Name": "paymentMethod",
                  "OrderNo": 10,
                  "DisplayName": "支付方式",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 12,
                  "Name": "sn",
                  "OrderNo": 11,
                  "DisplayName": "编号",
                  "DataType": 1,
                  "IndexType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 13,
                  "Name": "orders",
                  "OrderNo": 12,
                  "DisplayName": "订单",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "orders",
                  "RelateField": "id",
                  "IndexType": 2,
                  "Not_Nullable": true,
                  "GraphDesc": "P1=1212.39,1061.00\r\nP2=1514.00,1061.00\r\nP3=1514.00,1061.00\r\nP4=1816.11,1061.00\r\nHookP1=236.61,232.51\r\nHookP2=19.89,107.39\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1"
                }
              ]
            }
          },
          {
            "ID": 15,
            "Name": "orderpayment",
            "Caption": "订单支付",
            "OrderNo": 15,
            "GraphDesc": "Left=1222.35\r\nTop=1649.92",
            "MetaFields": {
              "Count": 13,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "Not_Nullable": true
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 2,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 3,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 5,
                  "Name": "account",
                  "OrderNo": 4,
                  "DisplayName": "收款账号",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 6,
                  "Name": "amount",
                  "OrderNo": 5,
                  "DisplayName": "付款金额",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 7,
                  "Name": "bank",
                  "OrderNo": 6,
                  "DisplayName": "收款银行",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 8,
                  "Name": "fee",
                  "OrderNo": 7,
                  "DisplayName": "支付手续费",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 9,
                  "Name": "memo",
                  "OrderNo": 8,
                  "DisplayName": "备注",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 10,
                  "Name": "method",
                  "OrderNo": 9,
                  "DisplayName": "方式",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 11,
                  "Name": "payer",
                  "OrderNo": 10,
                  "DisplayName": "付款人",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 12,
                  "Name": "paymentMethod",
                  "OrderNo": 11,
                  "DisplayName": "支付方式",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 13,
                  "Name": "sn",
                  "OrderNo": 12,
                  "DisplayName": "编号",
                  "DataType": 1,
                  "IndexType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 14,
                  "Name": "orders",
                  "OrderNo": 13,
                  "DisplayName": "订单",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "orders",
                  "RelateField": "id",
                  "IndexType": 2,
                  "Not_Nullable": true,
                  "GraphDesc": "P1=1212.39,1534.00\r\nP2=1242.00,1534.00\r\nP3=1242.00,1534.00\r\nP4=1242.00,1649.92\r\nHookP1=244.61,705.51\r\nHookP2=19.65,20.08\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=0"
                }
              ]
            }
          },
          {
            "ID": 16,
            "Name": "orderlog",
            "Caption": "订单记录",
            "OrderNo": 16,
            "GraphDesc": "Left=1344.12\r\nTop=1379.64",
            "MetaFields": {
              "Count": 6,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "Not_Nullable": true
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 2,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 3,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 5,
                  "Name": "detail",
                  "OrderNo": 4,
                  "DisplayName": "详情",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 6,
                  "Name": "type",
                  "OrderNo": 5,
                  "DisplayName": "类型",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 7,
                  "Name": "orders",
                  "OrderNo": 6,
                  "DisplayName": "订单",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "orders",
                  "RelateField": "id",
                  "IndexType": 2,
                  "Not_Nullable": true,
                  "GraphDesc": "P1=1212.39,1439.00\r\nP2=1278.00,1439.00\r\nP3=1278.00,1439.00\r\nP4=1344.12,1439.00\r\nHookP1=252.61,610.51\r\nHookP2=19.88,59.36\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1"
                }
              ]
            }
          },
          {
            "ID": 17,
            "Name": "orderitem",
            "Caption": "订单项",
            "OrderNo": 17,
            "GraphDesc": "Left=690.89\r\nTop=1688.99",
            "MetaFields": {
              "Count": 17,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "Not_Nullable": true
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 2,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 3,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 5,
                  "Name": "commissionTotals",
                  "OrderNo": 4,
                  "DisplayName": "佣金小计",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 6,
                  "Name": "isDelivery",
                  "OrderNo": 5,
                  "DisplayName": "是否需要物流",
                  "DataType": 5,
                  "Not_Nullable": true,
                  "DataLength": 1
                },
                {
                  "ID": 7,
                  "Name": "name",
                  "OrderNo": 6,
                  "DisplayName": "名称",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 8,
                  "Name": "price",
                  "OrderNo": 7,
                  "DisplayName": "价格",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 9,
                  "Name": "quantity",
                  "OrderNo": 8,
                  "DisplayName": "数量",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 10,
                  "Name": "returnedQuantity",
                  "OrderNo": 9,
                  "DisplayName": "已退货数量",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 11,
                  "Name": "shippedQuantity",
                  "OrderNo": 10,
                  "DisplayName": "已发货数量",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 12,
                  "Name": "sn",
                  "OrderNo": 11,
                  "DisplayName": "编号",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 13,
                  "Name": "specifications",
                  "OrderNo": 12,
                  "DisplayName": "规格",
                  "DataType": 7,
                  "DataLength": -1
                },
                {
                  "ID": 14,
                  "Name": "thumbnail",
                  "OrderNo": 13,
                  "DisplayName": "缩略图",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 15,
                  "Name": "type",
                  "OrderNo": 14,
                  "DisplayName": "类型",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 16,
                  "Name": "weight",
                  "OrderNo": 15,
                  "DisplayName": "重量",
                  "DataType": 2
                },
                {
                  "ID": 17,
                  "Name": "orders",
                  "OrderNo": 16,
                  "DisplayName": "订单",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "orders",
                  "RelateField": "id",
                  "IndexType": 2,
                  "Not_Nullable": true,
                  "GraphDesc": "P1=951.00,1570.49\r\nP2=951.00,1630.00\r\nP3=915.00,1630.00\r\nP4=915.00,1688.99\r\nHookP1=19.61,721.51\r\nHookP2=224.11,20.01\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=0\r\nHorz2=0"
                },
                {
                  "ID": 18,
                  "Name": "sku_id",
                  "OrderNo": 17,
                  "DisplayName": "SKU",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "sku",
                  "RelateField": "id",
                  "IndexType": 2
                }
              ]
            }
          },
          {
            "ID": 18,
            "Name": "memberdepositlog",
            "Caption": "会员预存款记录",
            "OrderNo": 18,
            "GraphDesc": "Left=33.67\r\nTop=1181.36",
            "MetaFields": {
              "Count": 9,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "Not_Nullable": true
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 2,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 3,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 5,
                  "Name": "balance",
                  "OrderNo": 4,
                  "DisplayName": "当前余额",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 6,
                  "Name": "credit",
                  "OrderNo": 5,
                  "DisplayName": "收入金额",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 7,
                  "Name": "debit",
                  "OrderNo": 6,
                  "DisplayName": "支出金额",
                  "DataType": 3,
                  "Not_Nullable": true,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 8,
                  "Name": "memo",
                  "OrderNo": 7,
                  "DisplayName": "备注",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 9,
                  "Name": "type",
                  "OrderNo": 8,
                  "DisplayName": "类型",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 10,
                  "Name": "member_id",
                  "OrderNo": 9,
                  "DisplayName": "会员",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "member",
                  "RelateField": "id",
                  "IndexType": 2,
                  "Not_Nullable": true,
                  "GraphDesc": "P1=401.00,1173.60\r\nP2=401.00,1201.00\r\nP3=401.00,1201.00\r\nP4=270.67,1201.00\r\nHookP1=44.08,362.40\r\nHookP2=217.33,19.64\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=0\r\nHorz2=1"
                }
              ]
            }
          },
          {
            "ID": 19,
            "Name": "deliverycenter",
            "Caption": "发货点",
            "OrderNo": 19,
            "GraphDesc": "Left=1034.32\r\nTop=476.29",
            "MetaFields": {
              "Count": 14,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "Not_Nullable": true
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 2,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 3,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 5,
                  "Name": "address",
                  "OrderNo": 4,
                  "DisplayName": "地址",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 6,
                  "Name": "areaName",
                  "OrderNo": 5,
                  "DisplayName": "地区名称",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 7,
                  "Name": "contact",
                  "OrderNo": 6,
                  "DisplayName": "联系人",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 8,
                  "Name": "isDefault",
                  "OrderNo": 7,
                  "DisplayName": "是否默认",
                  "DataType": 5,
                  "Not_Nullable": true,
                  "DataLength": 1
                },
                {
                  "ID": 9,
                  "Name": "memo",
                  "OrderNo": 8,
                  "DisplayName": "备注",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 10,
                  "Name": "mobile",
                  "OrderNo": 9,
                  "DisplayName": "手机",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 11,
                  "Name": "name",
                  "OrderNo": 10,
                  "DisplayName": "名称",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 12,
                  "Name": "phone",
                  "OrderNo": 11,
                  "DisplayName": "电话",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 13,
                  "Name": "zipCode",
                  "OrderNo": 12,
                  "DisplayName": "邮编",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 14,
                  "Name": "area_id",
                  "OrderNo": 13,
                  "DisplayName": "地区",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "area",
                  "RelateField": "id",
                  "IndexType": 2
                },
                {
                  "ID": 15,
                  "Name": "store_id",
                  "OrderNo": 14,
                  "DisplayName": "店铺",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "store",
                  "RelateField": "id",
                  "IndexType": 2,
                  "GraphDesc": "P1=1083.00,394.29\r\nP2=1083.00,435.00\r\nP3=1083.00,435.00\r\nP4=1083.00,476.29\r\nHookP1=313.68,345.71\r\nHookP2=48.68,19.71\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=0\r\nHorz2=0"
                }
              ]
            }
          },
          {
            "ID": 20,
            "Name": "couponcode",
            "Caption": "优惠码",
            "OrderNo": 20,
            "GraphDesc": "Left=465.78\r\nTop=1582.64",
            "MetaFields": {
              "Count": 8,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "Not_Nullable": true
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 2,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 3,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 5,
                  "Name": "code",
                  "OrderNo": 4,
                  "DisplayName": "号码",
                  "DataType": 1,
                  "IndexType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 6,
                  "Name": "isUsed",
                  "OrderNo": 5,
                  "DisplayName": "是否已使用",
                  "DataType": 5,
                  "Not_Nullable": true,
                  "DataLength": 1
                },
                {
                  "ID": 7,
                  "Name": "usedDate",
                  "OrderNo": 6,
                  "DisplayName": "使用日期",
                  "DataType": 4
                },
                {
                  "ID": 8,
                  "Name": "coupon_id",
                  "OrderNo": 7,
                  "DisplayName": "优惠券",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "coupon",
                  "RelateField": "id",
                  "IndexType": 2,
                  "Not_Nullable": true,
                  "GraphDesc": "P1=647.00,1393.49\r\nP2=647.00,1488.00\r\nP3=647.00,1488.00\r\nP4=647.00,1582.64\r\nHookP1=26.77,265.51\r\nHookP2=181.22,20.36\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=0\r\nHorz2=0"
                },
                {
                  "ID": 9,
                  "Name": "member_id",
                  "OrderNo": 8,
                  "DisplayName": "会员",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "member",
                  "RelateField": "id",
                  "IndexType": 2,
                  "GraphDesc": "P1=533.00,1173.60\r\nP2=533.00,1378.00\r\nP3=533.00,1378.00\r\nP4=533.00,1582.64\r\nHookP1=176.08,378.40\r\nHookP2=67.22,28.36\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=0\r\nHorz2=0"
                }
              ]
            }
          },
          {
            "ID": 21,
            "Name": "coupon",
            "Caption": "优惠券",
            "OrderNo": 21,
            "GraphDesc": "Left=620.23\r\nTop=1099.49",
            "MetaFields": {
              "Count": 17,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "Not_Nullable": true
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 2,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 3,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 5,
                  "Name": "beginDate",
                  "OrderNo": 4,
                  "DisplayName": "使用起始日期",
                  "DataType": 4
                },
                {
                  "ID": 6,
                  "Name": "endDate",
                  "OrderNo": 5,
                  "DisplayName": "使用结束日期",
                  "DataType": 4
                },
                {
                  "ID": 7,
                  "Name": "introduction",
                  "OrderNo": 6,
                  "DisplayName": "介绍",
                  "DataType": 7,
                  "DataLength": -1
                },
                {
                  "ID": 8,
                  "Name": "isEnabled",
                  "OrderNo": 7,
                  "DisplayName": "是否启用",
                  "DataType": 5,
                  "Not_Nullable": true,
                  "DataLength": 1
                },
                {
                  "ID": 9,
                  "Name": "isExchange",
                  "OrderNo": 8,
                  "DisplayName": "是否允许积分兑换",
                  "DataType": 5,
                  "Not_Nullable": true,
                  "DataLength": 1
                },
                {
                  "ID": 10,
                  "Name": "maximumPrice",
                  "OrderNo": 9,
                  "DisplayName": "最大商品价格",
                  "DataType": 3,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 11,
                  "Name": "maximumQuantity",
                  "OrderNo": 10,
                  "DisplayName": "最大商品数量",
                  "DataType": 2
                },
                {
                  "ID": 12,
                  "Name": "minimumPrice",
                  "OrderNo": 11,
                  "DisplayName": "最小商品价格",
                  "DataType": 3,
                  "DataLength": 23,
                  "DataScale": 6
                },
                {
                  "ID": 13,
                  "Name": "minimumQuantity",
                  "OrderNo": 12,
                  "DisplayName": "最小商品数量",
                  "DataType": 2
                },
                {
                  "ID": 14,
                  "Name": "name",
                  "OrderNo": 13,
                  "DisplayName": "名称",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 15,
                  "Name": "point",
                  "OrderNo": 14,
                  "DisplayName": "积分兑换数",
                  "DataType": 2
                },
                {
                  "ID": 16,
                  "Name": "prefix",
                  "OrderNo": 15,
                  "DisplayName": "前缀",
                  "DataType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 17,
                  "Name": "priceExpression",
                  "OrderNo": 16,
                  "DisplayName": "价格运算表达式",
                  "DataType": 1,
                  "DataLength": 255
                },
                {
                  "ID": 18,
                  "Name": "store_id",
                  "OrderNo": 17,
                  "DisplayName": "店铺",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "store",
                  "RelateField": "id",
                  "IndexType": 2,
                  "GraphDesc": "P1=828.00,394.29\r\nP2=828.00,475.00\r\nP3=716.00,475.00\r\nP4=716.00,1099.49\r\nHookP1=58.68,353.71\r\nHookP2=95.77,19.51\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=0\r\nHorz2=0"
                }
              ]
            }
          },
          {
            "ID": 22,
            "Name": "cartitem",
            "Caption": "购物车项",
            "OrderNo": 22,
            "GraphDesc": "Left=40.54\r\nTop=1001.66",
            "MetaFields": {
              "Count": 6,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "Not_Nullable": true
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 2,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 3,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 5,
                  "Name": "quantity",
                  "OrderNo": 4,
                  "DisplayName": "数量",
                  "DataType": 2,
                  "Not_Nullable": true
                },
                {
                  "ID": 6,
                  "Name": "cart_id",
                  "OrderNo": 5,
                  "DisplayName": "购物车",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "cart",
                  "RelateField": "id",
                  "IndexType": 2,
                  "Not_Nullable": true,
                  "GraphDesc": "P1=147.00,897.28\r\nP2=147.00,949.00\r\nP3=147.00,949.00\r\nP4=147.00,1001.66\r\nHookP1=100.23,89.72\r\nHookP2=106.46,20.34\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=0\r\nHorz2=0"
                },
                {
                  "ID": 7,
                  "Name": "sku_id",
                  "OrderNo": 6,
                  "DisplayName": "SKU",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "sku",
                  "RelateField": "id",
                  "IndexType": 2,
                  "Not_Nullable": true
                }
              ]
            }
          },
          {
            "ID": 23,
            "Name": "cart",
            "Caption": "购物车",
            "OrderNo": 23,
            "GraphDesc": "Left=46.77\r\nTop=779.28",
            "MetaFields": {
              "Count": 6,
              "items": [
                {
                  "ID": 1,
                  "Name": "id",
                  "OrderNo": 1,
                  "DisplayName": "ID",
                  "DataType": 2,
                  "KeyFieldType": 1,
                  "Not_Nullable": true
                },
                {
                  "ID": 2,
                  "Name": "createDate",
                  "OrderNo": 2,
                  "DisplayName": "创建日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 3,
                  "Name": "modifyDate",
                  "OrderNo": 3,
                  "DisplayName": "最后修改日期",
                  "DataType": 4,
                  "Not_Nullable": true
                },
                {
                  "ID": 5,
                  "Name": "expire",
                  "OrderNo": 4,
                  "DisplayName": "过期时间",
                  "DataType": 4
                },
                {
                  "ID": 6,
                  "Name": "cartKey",
                  "OrderNo": 5,
                  "DisplayName": "密钥",
                  "DataType": 1,
                  "IndexType": 1,
                  "Not_Nullable": true,
                  "DataLength": 255
                },
                {
                  "ID": 7,
                  "Name": "member_id",
                  "OrderNo": 6,
                  "DisplayName": "会员",
                  "DataType": 2,
                  "KeyFieldType": 3,
                  "RelateTable": "member",
                  "RelateField": "id",
                  "IndexType": 2,
                  "GraphDesc": "P1=356.92,838.00\r\nP2=305.00,838.00\r\nP3=305.00,838.00\r\nP4=253.77,838.00\r\nHookP1=20.08,70.40\r\nHookP2=187.23,58.72\r\nMod_OP1=0\r\nMod_OP2=0\r\nMod_CP=0\r\nHorz1=1\r\nHorz2=1"
                }
              ]
            }
          }
        ]
      }
    }
  ]
}