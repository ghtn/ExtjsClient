/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.EmployeeEditWindowView', {
    extend: 'Ext.window.Window',
    id: 'employeeEditWindowView',
    title: '调动人员',
    modal: true,
    width: 870,
    height: 600,
    autoScroll: true,
    closable: true,
    layout: 'fit',
    items: {
        xtype: 'form',
        itemId: 'employeeEditForm',
        bodyPadding: 10,
        url: '/InformationSystemService/employee/updateEdit',
        autoScroll : true,
		frame : true,
		layout : 'form',
        items: [
            {// 必填项区域
				xtype:'fieldset',
		        title: '必填项',
		        collapsible: true,
				frame : true,
				layout : 'form',
				items : [
					{// 必填项第一行
						xtype:'fieldset',
						frame : true,
						style:'border-width:0;',
						layout : 'column',
						defaultType : "textfield",
						items : [
							{
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
							},
							{
								name:'name',
								fieldLabel:"姓名",
								labelStyle:"text-align:right",
								allowBlank:false,
								blankText:"姓名不能为空",
								regex:/^[\u4E00-\u9FA5]+$/,  // 汉字的正则表达式
								regexText:"姓名只能由汉字组成！"
							},
							{
								name:'sex',
								fieldLabel:"性别",
								allowBlank:false,
								blankText:"性别不能为空",
								labelStyle:"text-align:right",
								xtype: 'combo',
								editable:false,// 禁止手动写入
							    /* 从本地加载数据 */  
							    queryMode:"local",  
								/* 显示 data 的 field 名称 */  
							    displayField: 'disp',
								valueField: 'value',
		                        store:"SexStore"
							}
						]
					},
					{// 必填项第二行
						xtype:'fieldset',
						frame : true,
						style:'border-width:0;',
						layout : 'column',
						defaultType : "textfield",
						items : [
							{
								name:"card",
								itemId:'employeeEditCard',
								fieldLabel:"身份证号",
								labelStyle:"text-align:right",
								allowBlank:false,
								blankText:"身份证号不能为空",
								regex : /^(\d{18,18}|\d{15,15}|\d{17,17}x)$/,
								regexText : '身份证号不合法！'
							}, 
							{
								name:"deptName",
								fieldLabel:"所在部门",
								itemId : 'employeeEditDeptName',
								allowBlank:false,
								blankText:"所在部门不能为空",
								labelStyle:"text-align:right",
								xtype: 'combo',
								editable:false,// 禁止手动写入
							    /* 从本地加载数据 */  
							    queryMode:"local",  
								/* 显示 data 的 field 名称 */  
							    displayField: 'disp',
								valueField: 'value',
                   				store:"DeptStore"
							},
							{
								name:"deptId",
								fieldLabel:"部门号",
								itemId : 'employeeEditDeptId',
								allowBlank:false,
								blankText:"部门号不能为空",
								labelStyle:"text-align:right",
								xtype: 'combo',
								editable:false,// 禁止手动写入
							    /* 从本地加载数据 */  
							    queryMode:"local",  
								/* 显示 data 的 field 名称 */  
							    displayField: 'disp',
								valueField: 'value',
                   				store:"DeptIdStore"
							}
						]
					},
					{// 必填项第三行
						xtype:'fieldset',
						frame : true,
						style:'border-width:0;',
						layout : 'column',
						defaultType : "textfield",
						items : [
							{
								name:"jobType",
								fieldLabel:"工种",
								allowBlank:false,
								blankText:"工种不能为空",
								labelStyle:"text-align:right",
								xtype: 'combo',
								editable:false,// 禁止手动写入
							    /* 从本地加载数据 */  
							    queryMode:"local",  
								/* 显示 data 的 field 名称 */  
							    displayField: 'disp',
								valueField: 'value',
                   				store:"JobTypeStore"
							},
							{
								name:"unitTime",
								xtype:"datefield",
								allowBlank:false,
								blankText:"来本单位时间不能为空",
								id:'unitTimeEdit',
								editable:false,// 禁止手动写入
                   				format: 'Y-m-d',
								fieldLabel:"来本单位时间",
								labelStyle:"text-align:right"
							},
							{
								name:"postState",
								fieldLabel:"在岗状态",
								allowBlank:false,
								blankText:"在岗状态不能为空",
								labelStyle:"text-align:right",
								xtype: 'combo',
								editable:false,// 禁止手动写入
							    /* 从本地加载数据 */  
							    queryMode:"local",  
								/* 显示 data 的 field 名称 */  
							    displayField: 'disp',
								valueField: 'value',
		                        store:"PostStateStore"
							}
						]
					}
				]
			},
			{// 选填项区域
				xtype:'fieldset',
		        title: '选填项',
		        collapsible: true,
				frame : true,
				layout : 'form',
				items : [
					{// 选填项第一行
						xtype:'fieldset',
						frame : true,
						style:'border-width:0;',
						layout : 'column',
						defaultType : "textfield",
						items : [
							{
								name:'secondName',
								fieldLabel:"曾姓名",
								labelStyle:"text-align:right",
								regex:/^[\u4E00-\u9FA5]+$/,  // 汉字的正则表达式
								regexText:"曾姓名只能由汉字组成！"
							},
							{
								xtype:"datefield",
								id:'birthdayEdit',
								name:"birthday",
                   				format: 'Y-m-d',
                   				editable:false,// 禁止手动写入
								fieldLabel:"出身日期",
								labelStyle:"text-align:right"
							},
							{
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
							}
						]
					},
					{// 选填项第二行
						xtype:'fieldset',
						frame : true,
						style:'border-width:0;',
						layout : 'column',
						defaultType : "textfield",
						items : [
							{
								name:"jobDist",
								fieldLabel:"工别",
								labelStyle:"text-align:right",
								xtype: 'combo',
								editable:false,// 禁止手动写入
							    /* 从本地加载数据 */  
							    queryMode:"local",  
								/* 显示 data 的 field 名称 */  
							    displayField: 'disp',
								valueField: 'value',
                   				store:"JobDistStore"
							}, 
							{
								name:"speciality",
								fieldLabel:"本人特长",
								labelStyle:"text-align:right"
							},
							{
								name:"telphone",
								fieldLabel:"联系电话",
								labelStyle:"text-align:right"
							}
						]
					},
					{// 选填项第三行
						xtype:'fieldset',
						frame : true,
						style:'border-width:0;',
						layout : 'column',
						defaultType : "textfield",
						items : [
							{
								name:"jobQualification",
								fieldLabel:"职称资质",
								labelStyle:"text-align:right"
							},
							{
								name:"selfNationality",
								fieldLabel:"本人籍贯",
								labelStyle:"text-align:right"
							}, 
							{
								name:"myIngredient",
								fieldLabel:"本人成分",
								labelStyle:"text-align:right"
							}
						]
					},
					{// 选填项第四行
						xtype:'fieldset',
						frame : true,
						style:'border-width:0;',
						layout : 'column',
						defaultType : "textfield",
						items : [
							{
								name:"country",
								fieldLabel:"国家地区",
								emptyText:'中国',
								labelStyle:"text-align:right"
							}, 
							{
								fieldLabel:"配置方式",
								name:"cfgStyle",
								labelStyle:"text-align:right"
							},
							{
								fieldLabel:"行政待遇级别",
								name:"salaryGrade",
								labelStyle:"text-align:right"
							}
						]
					},
					{// 选填项第五行
						xtype:'fieldset',
						frame : true,
						style:'border-width:0;',
						layout : 'column',
						defaultType : "textfield",
						items : [
							{
								name:"technicist",
								fieldLabel:"技术人员",
								labelStyle:"text-align:right",
								xtype: 'combo',
								editable:false,// 禁止手动写入
							    /* 从本地加载数据 */  
							    queryMode:"local",  
								/* 显示 data 的 field 名称 */  
							    displayField: 'disp',
								valueField: 'value',
                   				store:"TechStore"
							}, 
							{
								name:"source",
								fieldLabel:"来源",
								labelStyle:"text-align:right",
								xtype: 'combo',
								editable:false,// 禁止手动写入
							    /* 从本地加载数据 */  
							    queryMode:"local",  
								/* 显示 data 的 field 名称 */  
							    displayField: 'disp',
								valueField: 'value',
                   				store:"SourceStore"
							},
							{
								name:"workTime",
								xtype:"datefield",
								id:'workTimeEdit',
								editable:false,// 禁止手动写入
                   				format: 'Y-m-d',
								fieldLabel:"参加工作时间",
								labelStyle:"text-align:right"
							}
						]
					},
					{// 选填项第六行
						xtype:'fieldset',
						frame : true,
						style:'border-width:0;',
						layout : 'column',
						defaultType : "textfield",
						items : [
							{
								name:"duty",
								fieldLabel:"职务",
								labelStyle:"text-align:right",
								xtype: 'combo',
								editable:false,// 禁止手动写入
							    /* 从本地加载数据 */  
							    queryMode:"local",  
								/* 显示 data 的 field 名称 */  
							    displayField: 'disp',
								valueField: 'value',
                   				store:"DutyStore"
							}, 
							{
								name:"dutyTime",
								xtype:"datefield",
								id:'dutyTimeEdit',
								editable:false,// 禁止手动写入
                   				format: 'Y-m-d',
								fieldLabel:"职务任职时间",
								labelStyle:"text-align:right"
							},
							{
								name:"education",
								fieldLabel:"文化程度",
								labelStyle:"text-align:right"
							}
						]
					},
					{// 选填项第七行
						xtype:'fieldset',
						frame : true,
						style:'border-width:0;',
						layout : 'column',
						defaultType : "textfield",
						items : [
							{
								name:"jobTitle",
								fieldLabel:"职称",
								labelStyle:"text-align:right",
								xtype: 'combo',
								editable:false,// 禁止手动写入
							    /* 从本地加载数据 */  
							    queryMode:"local",  
								/* 显示 data 的 field 名称 */  
							    displayField: 'disp',
								valueField: 'value',
                   				store:"JobTitleStore"
							},
							{
								name:"jobTitleTime",
								xtype:"datefield",
								id:'jobTitleTimeEdit',
								editable:false,// 禁止手动写入
                   				format: 'Y-m-d',
								fieldLabel:"职称任职时间",
								labelStyle:"text-align:right"
							},
							{
								name:"politicsStatus",
								fieldLabel:"政治面貌",
								labelStyle:"text-align:right"
							}
						]
					},
					{// 选填项第八行
						xtype:'fieldset',
						frame : true,
						style:'border-width:0;',
						layout : 'column',
						defaultType : "textfield",
						items : [
							{
								name:"job",
								fieldLabel:"岗位",
								labelStyle:"text-align:right"
							}, 
							{
								name:"jobTypeTime",
								xtype:"datefield",
								id:'jobTypeTimeEdit',
								editable:false,// 禁止手动写入
                   				format: 'Y-m-d',
								fieldLabel:"工种任职时间",
								labelStyle:"text-align:right"
							},
							{
								name:"healthStatus",
								fieldLabel:"健康状况",
								labelStyle:"text-align:right"
							}
						]
					},
					{// 选填项第九行
						xtype:'fieldset',
						frame : true,
						style:'border-width:0;',
						layout : 'column',
						defaultType : "textfield",
						items : [
							{
								name:"firstEducation",
								fieldLabel:"第一学历",
								labelStyle:"text-align:right"
							},
							{
								name:"schoolName",
								fieldLabel:"学校名称",
								labelStyle:"text-align:right"
							}, 
							{
								name:"studyStyle",
								fieldLabel:"就读形式",
								labelStyle:"text-align:right"
							}
						]
					},
					{// 选填项第十行
						xtype:'fieldset',
						frame : true,
						style:'border-width:0;',
						layout : 'column',
						defaultType : "textfield",
						items : [
							{
								name:"profession",
								fieldLabel:"所学专业",
								labelStyle:"text-align:right"
							}, 
							{
								name:"graduateTime",
								xtype:"datefield",
								id:'graduateTimeEdit',
								editable:false,// 禁止手动写入
                   				format: 'Y-m-d',
								fieldLabel:"毕业时间",
								labelStyle:"text-align:right"
							}, 
							{
								name:"familyOrigin",
								fieldLabel:"家庭出身",
								labelStyle:"text-align:right"
							}
						]
					},
					{// 选填项第十一行
						xtype:'fieldset',
						frame : true,
						style:'border-width:0;',
						layout : 'column',
						defaultType : "textfield",
						items : [
							{
								name:"postSalary",
								xtype:"numberfield",
								itemId:'postSalaryEdit',
                				minValue:0,
								fieldLabel:"岗位工资",
								labelStyle:"text-align:right"
							}, 
							{
								name:"skillSalary",
								xtype:"numberfield",
								itemId:'skillSalaryEdit',
                				minValue:0,
								fieldLabel:"技能工资",
								labelStyle:"text-align:right"
							}, 
							{
								name:"productionLine",
								fieldLabel:"生产线",
								labelStyle:"text-align:right",
								xtype: 'combo',
								editable:false,// 禁止手动写入
							    /* 从本地加载数据 */  
							    queryMode:"local",  
								/* 显示 data 的 field 名称 */  
							    displayField: 'disp',
								valueField: 'value',
                   				store:"ProductionLineStore"
							}
						]
					},
					{// 选填项第十二行
						xtype:'fieldset',
						frame : true,
						style:'border-width:0;',
						layout : 'column',
						defaultType : "textfield",
						items : [
							{
								name:"domicilePlace",
								fieldLabel:"户籍所在地",
								labelStyle:"text-align:right"
							}, 
							{
								name:"homeAddress",
								fieldLabel:"家庭住址",
								labelStyle:"text-align:right"
							}, 
							{
								name:"postalCode",
								fieldLabel:"邮政编码",
								labelStyle:"text-align:right"
							}
						]
					},
					{// 选填项第十三行
						xtype:'fieldset',
						frame : true,
						style:'border-width:0;',
						layout : 'column',
						defaultType : "textfield",
						items : [
							{
								name:"armTime",
								xtype:"datefield",
								id:'armTimeEdit',
								editable:false,// 禁止手动写入
                   				format: 'Y-m-d',
								fieldLabel:"参军时间",
								labelStyle:"text-align:right"
							},
							{
								name:"endArmTime",
								xtype:"datefield",
								id:'endArmTimeEdit',
								editable:false,// 禁止手动写入
                   				format: 'Y-m-d',
								fieldLabel:"退伍时间",
								labelStyle:"text-align:right"
							}, 
							{
								name:"conversionTime",
								xtype:"datefield",
								id:'conversionTimeEdit',
								editable:false,// 禁止手动写入
                   				format: 'Y-m-d',
								fieldLabel:"转制时间",
								labelStyle:"text-align:right"
							}
						]
					},
					{// 选填项第十四行
						xtype:'fieldset',
						frame : true,
						style:'border-width:0;',
						layout : 'column',
						defaultType : "textfield",
						items : [
							{
								name:"skillGrage",
								xtype:"numberfield",
								itemId:'skillGrageEdit',
                				minValue:0,
								fieldLabel:"技术级别",
								labelStyle:"text-align:right"
							}, 
							{
					            text: '预警',
					            name: 'warn',
					            hidden:true,
					            flex: 1
					        },
					        {
								name:"cardBirthday",
								xtype:"datefield",
								itemId:'employeeEditCardBirthday',
								editable:false,// 禁止手动写入
                   				format: 'Y-m-d',
								fieldLabel:"身份证出生日期",
								labelStyle:"text-align:right"
							}
						]
					},
					{// 选填项第十五行
						xtype:'fieldset',
						frame : true,
						style:'border-width:0;',
						layout : 'column',
						defaultType : "textfield",
						items : [
							{
								xtype:'textarea',
								name:"resume",
								width:350,
								fieldLabel:"个人简历",
								labelStyle:"text-align:right"
							}, 
							{
								xtype:'textarea',
								name:"comment",
								width:350,
								fieldLabel:"备注",
								labelStyle:"text-align:right"
							},
							{
								name:'id',
								hidden:true
							}
						]
					}
				]
			}
        ],
        bbar : [
			'->', // 右对齐， 简写！
			{
				itemId : 'employeeEditFormSubmit',
				xtype : 'button',
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
    }

});