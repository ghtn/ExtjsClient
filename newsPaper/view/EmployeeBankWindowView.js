/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.EmployeeBankWindowView', {
			extend : 'Ext.window.Window',
			id : 'employeeBankWindowView',
			title : '添加',
			modal : true,
			width : 850,
			height : 600,
			/* 自动滚轴 */
			autoScroll : true,
			closable : true,
			layout : 'fit',
			items : [{
						xtype : "form",
						id:"employeeBankForm",
						bodyPadding : 10,
						url: '/InformationSystemService/employee/add',
						/* 自动滚轴 */
						autoScroll : true,
						frame : true,
						layout : 'form',
						items : [
							{
								frame : true,
								style:'border-width:0;',
								layout : 'column',
								defaultType : "textfield",
								items : [{
									name:'empNumber',
									allowBlank:false,
									blankText:"员工号不能为空",
									fieldLabel:"员工号",
									labelStyle:"text-align:right",
									vtype:"alphanum", // 数字、字母、下划线
									vtypeText:"由字母、数字和下划线组成",
									minLength:5,
									minLengthText:"员工号长度不能小于{0}",
									maxLength:20,
									maxLengthText:"员工号长度不能大于{0}"
								}, {
									name:'name',
									fieldLabel:"姓名",
									labelStyle:"text-align:right",
									allowBlank:false,
									blankText:"姓名不能为空"
								}, {
									name:'secondName',
									fieldLabel:"曾姓名",
									labelStyle:"text-align:right"
								}]
							}, 
							{
								frame : true,
								style:'border-width:0;',
								layout : 'column',
								defaultType : "textfield",
								items : [{
									name:'sex',
									fieldLabel:"性别",
									labelStyle:"text-align:right",
									xtype: 'combo',
									editable:false,// 禁止手动写入
								    /* 从本地加载数据 */  
								    queryMode:"local",  
									/* 显示 data 的 field 名称 */  
								    displayField: 'disp',
   									valueField: 'value',
			                        store:"SexStore",
			                        emptyText:"男"
								}, {
									name:"country",
									fieldLabel:"国家地区",
									labelStyle:"text-align:right",
									xtype: 'combo',
									editable:false,// 禁止手动写入
								    /* 从本地加载数据 */  
								    queryMode:"local",  
									/* 显示 data 的 field 名称 */  
								    displayField: 'disp',
   									valueField: 'value',
			                        store:"CountryStore",
			                        emptyText:"中国"
								}, {
									fieldLabel:"配置方式",
									name:"cfgStyle",
									labelStyle:"text-align:right"
								}]
							}, 
							{
								frame : true,
								style:'border-width:0;',
								layout : 'column',
								defaultType : "textfield",
								items : [{
									fieldLabel:"行政待遇级别",
									name:"salaryGrade",
									labelStyle:"text-align:right"
								}, {
									name:"technicist",
									fieldLabel:"技术人员",
									labelStyle:"text-align:right"
								}, {
									xtype:"datefield",
									id:'birthday',
									name:"birthday",
                       				format: 'Y-m-d',
                       				editable:false,// 禁止手动写入
									fieldLabel:"出身日期",
									labelStyle:"text-align:right"
								}]
							}, 
							
							{
								frame : true,
								style:'border-width:0;',
								layout : 'column',
								defaultType : "textfield",
								items : [{
									name:"card",
									fieldLabel:"身份证号",
									labelStyle:"text-align:right"
								}, {
									name:"bloodType",
									fieldLabel:"血型",
			                        labelStyle:"text-align:right",
									xtype: 'combo',
									editable:false,// 禁止手动写入
								    /* 从本地加载数据 */  
								    queryMode:"local",  
									/* 显示 data 的 field 名称 */  
								    displayField: 'disp',
									valueField: 'value',
                       				store:"BloodStore"
								}, {
									name:"source",
									fieldLabel:"来源",
									labelStyle:"text-align:right"
								}]
							}, 
							{
								frame : true,
								style:'border-width:0;',
								layout : 'column',
								defaultType : "textfield",
								items : [{
									name:"workTime",
									xtype:"datefield",
									id:'workTime',
									editable:false,// 禁止手动写入
                       				format: 'Y-m-d',
									fieldLabel:"参加工作时间",
									labelStyle:"text-align:right"
								}, {
									name:"unitTime",
									xtype:"datefield",
									id:'unitTime',
									editable:false,// 禁止手动写入
                       				format: 'Y-m-d',
									fieldLabel:"来本单位时间",
									labelStyle:"text-align:right"
								}, {
									name:"deptName",
									fieldLabel:"所在部门",
									labelStyle:"text-align:right",
									xtype: 'combo',
									editable:false,// 禁止手动写入
								    /* 从本地加载数据 */  
								    queryMode:"local",  
									/* 显示 data 的 field 名称 */  
								    displayField: 'disp',
									valueField: 'value',
                       				store:"DeptStore"
								}]
							}, 
							{
								frame : true,
								style:'border-width:0;',
								layout : 'column',
								defaultType : "textfield",
								items : [{
									name:"duty",
									fieldLabel:"职务",
									labelStyle:"text-align:right"
								}, {
									name:"dutyTime",
									xtype:"datefield",
									id:'dutyTime',
									editable:false,// 禁止手动写入
                       				format: 'Y-m-d',
									fieldLabel:"职务任职时间",
									labelStyle:"text-align:right"
								}, {
									name:"jobTitle",
									fieldLabel:"职称",
									labelStyle:"text-align:right"
								}]
							}, 
							{
								frame : true,
								style:'border-width:0;',
								layout : 'column',
								defaultType : "textfield",
								items : [{
									name:"jobTitleTime",
									xtype:"datefield",
									id:'jobTitleTime',
									editable:false,// 禁止手动写入
                       				format: 'Y-m-d',
									fieldLabel:"职称任职时间",
									labelStyle:"text-align:right"
								}, {
									name:"jobDist",
									fieldLabel:"工别",
									labelStyle:"text-align:right"
								}, {
									name:"jobType",
									fieldLabel:"工种",
									labelStyle:"text-align:right"
								}]
							}, 
							{
								frame : true,
								style:'border-width:0;',
								layout : 'column',
								defaultType : "textfield",
								items : [{
									name:"jobTypeTime",
									xtype:"datefield",
									id:'jobTypeTime',
									editable:false,// 禁止手动写入
                       				format: 'Y-m-d',
									fieldLabel:"工种任职时间",
									labelStyle:"text-align:right"
								}, {
									name:"education",
									fieldLabel:"文化程度",
									labelStyle:"text-align:right"
								}, {
									name:"politicsStatus",
									fieldLabel:"政治面貌",
									labelStyle:"text-align:right"
								}]
							}, 
							{
								frame : true,
								style:'border-width:0;',
								layout : 'column',
								defaultType : "textfield",
								items : [{
									name:"postState",
									fieldLabel:"在岗状态",
									labelStyle:"text-align:right"
								}, {
									name:"myIngredient",
									fieldLabel:"本人成分",
									labelStyle:"text-align:right"
								}, {
									name:"healthStatus",
									fieldLabel:"健康状况",
									labelStyle:"text-align:right"
								}]
							}, 
							{
								frame : true,
								style:'border-width:0;',
								layout : 'column',
								defaultType : "textfield",
								items : [{
									name:"familyOrigin",
									fieldLabel:"家庭出身",
									labelStyle:"text-align:right"
								}, {
									name:"postSalary",
									xtype:"numberfield",
                    				minValue:0,
									fieldLabel:"岗位工资",
									labelStyle:"text-align:right",
									emptyText:'0'
								}, {
									name:"skillSalary",
									xtype:"numberfield",
                    				minValue:0,
									fieldLabel:"技能工资",
									labelStyle:"text-align:right",
									emptyText:'0'
								}]
							}, 
							{
								frame : true,
								style:'border-width:0;',
								layout : 'column',
								defaultType : "textfield",
								items : [{
									name:"firstEducation",
									fieldLabel:"第一学历",
									labelStyle:"text-align:right"
								}, {
									name:"schoolName",
									fieldLabel:"学校名称",
									labelStyle:"text-align:right"
								}, {
									name:"studyStyle",
									fieldLabel:"就读形式",
									labelStyle:"text-align:right"
								}]
							}, 
							{
								frame : true,
								style:'border-width:0;',
								layout : 'column',
								defaultType : "textfield",
								items : [{
									name:"profession",
									fieldLabel:"所学专业",
									labelStyle:"text-align:right"
								}, {
									name:"graduateTime",
									xtype:"datefield",
									id:'graduateTime',
									editable:false,// 禁止手动写入
                       				format: 'Y-m-d',
									fieldLabel:"毕业时间",
									labelStyle:"text-align:right"
								}, {
									name:"speciality",
									fieldLabel:"本人特长",
									labelStyle:"text-align:right"
								}]
							}, 
							{
								frame : true,
								style:'border-width:0;',
								layout : 'column',
								defaultType : "textfield",
								items : [{
									name:"domicilePlace",
									fieldLabel:"户籍所在地",
									labelStyle:"text-align:right"
								}, {
									name:"homeAddress",
									fieldLabel:"家庭住址",
									labelStyle:"text-align:right"
								}, {
									name:"postalCode",
									fieldLabel:"邮政编码",
									labelStyle:"text-align:right"
								}]
							}, 
							{
								frame : true,
								style:'border-width:0;',
								layout : 'column',
								defaultType : "textfield",
								items : [{
									name:"telphone",
									fieldLabel:"联系电话",
									labelStyle:"text-align:right"
								}, {
									name:"resume",
									fieldLabel:"个人简历",
									labelStyle:"text-align:right"
								}, {
									name:"armTime",
									xtype:"datefield",
									id:'armTime',
									editable:false,// 禁止手动写入
                       				format: 'Y-m-d',
									fieldLabel:"参军时间",
									labelStyle:"text-align:right"
								}]
							}, 
							{
								frame : true,
								style:'border-width:0;',
								layout : 'column',
								defaultType : "textfield",
								items : [{
									name:"endArmTime",
									xtype:"datefield",
									id:'endArmTime',
									editable:false,// 禁止手动写入
                       				format: 'Y-m-d',
									fieldLabel:"退伍时间",
									labelStyle:"text-align:right"
								}, {
									name:"conversionTime",
									xtype:"datefield",
									id:'conversionTime',
									editable:false,// 禁止手动写入
                       				format: 'Y-m-d',
									fieldLabel:"转制时间",
									labelStyle:"text-align:right"
								}, {
									name:"productLine",
									fieldLabel:"生成线",
									labelStyle:"text-align:right"
								}]
							}, 
							{
								frame : true,
								style:'border-width:0;',
								layout : 'column',
								defaultType : "textfield",
								items : [{
									name:"job",
									fieldLabel:"岗位",
									labelStyle:"text-align:right"
								}, {
									name:"skillGrage",
									xtype:"numberfield",
                    				minValue:0,
									fieldLabel:"技术级别",
									labelStyle:"text-align:right",
									emptyText:"0"
								}, {
									name:"jobQualification",
									fieldLabel:"职称资质",
									labelStyle:"text-align:right"
								}]
							}, 
							{
								frame : true,
								style:'border-width:0;',
								layout : 'column',
								defaultType : "textfield",
								items : [{
									name:"cardBirthday",
									xtype:"datefield",
									id:'cardBirthday',
									editable:false,// 禁止手动写入
                       				format: 'Y-m-d',
									fieldLabel:"身份证出生日期",
									labelStyle:"text-align:right"
								}, {
									name:"selfNationality",
									fieldLabel:"本人籍贯",
									labelStyle:"text-align:right"
								}, {
									name:"comment",
									fieldLabel:"备注",
									labelStyle:"text-align:right"
								}]
							},
							{
								frame : true,
								style:'border-width:0;',
								layout : 'column',
								defaultType : "textfield",
								items : [{
									name:"deptId",
									fieldLabel:"部门号",
									labelStyle:"text-align:right"
								}]
							}
						],
						bbar : [
							'->', // 右对齐， 简写！
							{
								itemId : 'employeeBankFormReset',
								xtype : 'button',
								text : '重置',
								iconCls : 'Arrowredo'
							},
							'-',
							{
								itemId : 'employeeBankFormSubmit',
								xtype : 'button',
								formBind : true,
								text : '提交',
								formBind : true,
								iconCls : 'Accept'
							},
							' ',
							' ',
							' ',
							' ',
							' '
							]
					}]
		});