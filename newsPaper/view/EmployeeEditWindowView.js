/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.EmployeeEditWindowView', {
    extend: 'Ext.window.Window',
    id: 'employeeEditWindowView',
    title: '编辑',
    modal: true,
    width: 850,
    height: 600,
    autoScroll: true,
    closable: true,
    layout: 'fit',
    items: {
        xtype: 'form',
        itemId: 'employeeEditForm',
        bodyPadding: 10,
        url: '/InformationSystemService/employee/update',
        autoScroll : true,
		frame : true,
		layout : 'form',
        items: [
            {
            	frame : true,
				style:'border-width:0;',
				layout : 'column',
				defaultType : "textfield",
                items: [
                    {
                        fieldLabel: '员工号',
                        name: 'empNumber',
                        labelStyle:"text-align:right",
                        readOnly: true
                    },
                    {
                        fieldLabel: '姓名',
                        labelStyle:"text-align:right",
                        name: 'name'
                    },
                    {
                        fieldLabel: '曾姓名',
                        labelStyle:"text-align:right",
                        name: 'secondName'
                    }
                ]
            },
            {
            	frame : true,
				style:'border-width:0;',
				layout : 'column',
				defaultType : "textfield",
                items: [
					{
						fieldLabel:"性别",
						labelStyle:"text-align:right",
						xtype: 'combo',
						name:"sex",
						editable:false,// 禁止手动写入
					    /* 从本地加载数据 */  
					    queryMode:"local",  
						/* 显示 data 的 field 名称 */  
					    displayField: 'disp',
						valueField: 'value',
                        store:"SexStore"
					},
                    {
                        labelStyle:"text-align:right",
                        fieldLabel: '国家地区',
                        name: 'country',
                        xtype: 'combo',
						editable:false,// 禁止手动写入
					    /* 从本地加载数据 */  
					    queryMode:"local",  
						/* 显示 data 的 field 名称 */  
					    displayField: 'disp',
						valueField: 'value',
                        store:"CountryStore"
                    },
                    {
                        labelStyle:"text-align:right",
                        fieldLabel: '配置方式',
                        name: 'cfgStyle'
                    }
                ]
            },
            {
            	frame : true,
				style:'border-width:0;',
				layout : 'column',
				defaultType : "textfield",
                items: [
                    {
                        fieldLabel: '行政待遇级别',
                        name: 'salaryGrade',
                        labelStyle:"text-align:right"
                    },
                    {
                        fieldLabel: '技术人员',
                        labelStyle:"text-align:right",
                        name: 'technicist'
                    },
                    {
                    	xtype:"datefield",
                    	id:'birthday',
                    	editable:false,// 禁止手动写入
                        format: 'Y-m-d',
                        fieldLabel: '出身日期',
                        labelStyle:"text-align:right",
                        name: 'birthday'
                    }
                ]
            },
            {
            	frame : true,
				style:'border-width:0;',
				layout : 'column',
				defaultType : "textfield",
                items: [
                    {
                        fieldLabel: '身份证号',
                        name: 'card',
                        labelStyle:"text-align:right"
                    },
                    {
                        fieldLabel: '血型',
                        labelStyle:"text-align:right",
                        name: 'bloodType',
						xtype: 'combo',
						editable:false,// 禁止手动写入
					    /* 从本地加载数据 */  
					    queryMode:"local",  
						/* 显示 data 的 field 名称 */  
					    displayField: 'disp',
						valueField: 'value',
                        store:"BloodStore"
                    },
                    {
                        fieldLabel: '来源',
                        labelStyle:"text-align:right",
                        name: 'source'
                    }
                ]
            },
            {
            	frame : true,
				style:'border-width:0;',
				layout : 'column',
				defaultType : "textfield",
                items: [
                    {
                    	xtype:"datefield",
                    	id:'workTime',
                    	editable:false,// 禁止手动写入
                        fieldLabel: '参加工作时间',
                        format: 'Y-m-d',
                        labelStyle:"text-align:right",
                        name: 'workTime'
                    },
                    {
                    	xtype:"datefield",
                    	id:'unitTime',
                    	editable:false,// 禁止手动写入
                        fieldLabel: '来本单位时间',
                        format: 'Y-m-d',
                        labelStyle:"text-align:right",
                        name: 'unitTime'
                    },
                    {
                        fieldLabel: '所在部门',
                        labelStyle:"text-align:right",
                        name: 'deptName',
                        xtype: 'combo',
						editable:false,// 禁止手动写入
					    /* 从本地加载数据 */  
					    queryMode:"local",  
						/* 显示 data 的 field 名称 */  
					    displayField: 'disp',
						valueField: 'value',
           				store:"DeptStore"
                    }
                ]
            },
            {
            	frame : true,
				style:'border-width:0;',
				layout : 'column',
				defaultType : "textfield",
                items: [
                    {
                        fieldLabel: '职务',
                        labelStyle:"text-align:right",
                        name: 'duty'
                    },
                    {
                    	xtype:"datefield",
                    	id:'dutyTime',
                    	editable:false,// 禁止手动写入
                        fieldLabel: '职务任职时间',
                        format: 'Y-m-d',
                        labelStyle:"text-align:right",
                        name: 'dutyTime'
                    },
                    {
                        fieldLabel: '职称',
                        labelStyle:"text-align:right",
                        name: 'jobTitle'
                    }
                ]
            },
            {
            	frame : true,
				style:'border-width:0;',
				layout : 'column',
				defaultType : "textfield",
                items: [
                    {
                    	xtype:"datefield",
                    	id:'jobTitleTime',
                    	editable:false,// 禁止手动写入
                        fieldLabel: '职称任职时间',
                        format: 'Y-m-d',
                        labelStyle:"text-align:right",
                        name: 'jobTitleTime'
                    },
                    {
                        fieldLabel: '工别',
                        labelStyle:"text-align:right",
                        name: 'dutjobDistyTime'
                    },
                    {
                        fieldLabel: '工种',
                        labelStyle:"text-align:right",
                        name: 'jobType'
                    }
                ]
            },
            {
            	frame : true,
				style:'border-width:0;',
				layout : 'column',
				defaultType : "textfield",
                items: [
                    {
                    	xtype:"datefield",
                    	id:'jobTypeTime',
                    	editable:false,// 禁止手动写入
                        fieldLabel: '工种任职时间',
                        format: 'Y-m-d',
                        labelStyle:"text-align:right",
                        name: 'jobTypeTime'
                    },
                    {
                        fieldLabel: '文化程度',
                        labelStyle:"text-align:right",
                        name: 'education'
                    },
                    {
                        fieldLabel: '政治面貌',
                        labelStyle:"text-align:right",
                        name: 'politicsStatus'
                    }
                ]
            },
            {
            	frame : true,
				style:'border-width:0;',
				layout : 'column',
				defaultType : "textfield",
                items: [
                    {
                        fieldLabel: '在岗状态',
                        labelStyle:"text-align:right",
                        name: 'postState'
                    },
                    {
                        fieldLabel: '本人成分',
                        labelStyle:"text-align:right",
                        name: 'myIngredient'
                    },
                    {
                        fieldLabel: '健康状况',
                        labelStyle:"text-align:right",
                        name: 'healthStatus'
                    }
                ]
            },
            {
            	frame : true,
				style:'border-width:0;',
				layout : 'column',
				defaultType : "textfield",
                items: [
                    {
                        fieldLabel: '家庭出身',
                        labelStyle:"text-align:right",
                        name: 'familyOrigin'
                    },
                    {
                    	xtype:"numberfield",
                    	minValue:0,
                        fieldLabel: '岗位工资',
                        labelStyle:"text-align:right",
                        name: 'postSalary'
                    },
                    {
                    	xtype:"numberfield",
                    	minValue:0,
                        fieldLabel: '技能工资',
                        labelStyle:"text-align:right",
                        name: 'skillSalary'
                    }
                ]
            },
            {
            	frame : true,
				style:'border-width:0;',
				layout : 'column',
				defaultType : "textfield",
                items: [
                    {
                        fieldLabel: '第一学历',
                        labelStyle:"text-align:right",
                        name: 'firstEducation'
                    },
                    {
                        fieldLabel: '学校名称',
                        labelStyle:"text-align:right",
                        name: 'schoolName'
                    },
                    {
                        fieldLabel: '就读形式',
                        labelStyle:"text-align:right",
                        name: 'studyStyle'
                    }
                ]
            },
            {
            	frame : true,
				style:'border-width:0;',
				layout : 'column',
				defaultType : "textfield",
                items: [
                    {
                        fieldLabel: '所学专业',
                        labelStyle:"text-align:right",
                        name: 'profession'
                    },
                    {
                        xtype:"datefield",
                        id:'graduateTime',
                        editable:false,// 禁止手动写入
                        fieldLabel: '毕业时间',
                        format: 'Y-m-d',
                        labelStyle:"text-align:right",
                        name: 'graduateTime'
                    },
                    {
                        fieldLabel: '本人特长',
                        labelStyle:"text-align:right",
                        name: 'speciality'
                    }
                ]
            },
            {
            	frame : true,
				style:'border-width:0;',
				layout : 'column',
				defaultType : "textfield",
                items: [
                    {
                        fieldLabel: '户籍所在地',
                        labelStyle:"text-align:right",
                        name: 'domicilePlace'
                    },
                    {
                        fieldLabel: '家庭住址',
                        labelStyle:"text-align:right",
                        name: 'homeAddress'
                    },
                    {
                        fieldLabel: '邮政编码',
                        labelStyle:"text-align:right",
                        name: 'postalCode'
                    }
                ]
            },
            {
            	frame : true,
				style:'border-width:0;',
				layout : 'column',
				defaultType : "textfield",
                items: [
                    {
                        fieldLabel: '联系电话',
                        labelStyle:"text-align:right",
                        name: 'telphone'
                    },
                    {
                        fieldLabel: '个人简历',
                        labelStyle:"text-align:right",
                        name: 'resume'
                    },
                    {
                        xtype:"datefield",
                        id:"armTime",
                        editable:false,// 禁止手动写入
                        fieldLabel: '参军时间',
                        format: 'Y-m-d',
                        labelStyle:"text-align:right",
                        name: 'armTime'
                    }
                ]
            },
            
            {
            	frame : true,
				style:'border-width:0;',
				layout : 'column',
				defaultType : "textfield",
                items: [
                    {
                    	xtype:"datefield",
                    	id:"endArmTime",
                    	editable:false,// 禁止手动写入
                        format: 'Y-m-d',
                        fieldLabel: '退伍时间',
                        labelStyle:"text-align:right",
                        name: 'endArmTime'
                    },
                    {
                    	xtype:"datefield",
                    	id:"conversionTime",
                    	editable:false,// 禁止手动写入
                        format: 'Y-m-d',
                        fieldLabel: '转制时间',
                        labelStyle:"text-align:right",
                        name: 'conversionTime'
                    },
                    {
                        fieldLabel: '生成线',
                        labelStyle:"text-align:right",
                        name: 'productLine'
                    }
                ]
            },
            {
            	frame : true,
				style:'border-width:0;',
				layout : 'column',
				defaultType : "textfield",
                items: [
                    {
                        fieldLabel: '岗位',
                        labelStyle:"text-align:right",
                        name: 'job'
                    },
                    {
                    	xtype:"numberfield",
                    	minValue:0,
                        fieldLabel: '技术级别',
                        labelStyle:"text-align:right",
                        name: 'skillGrage'
                    },
                    {
                        fieldLabel: '职称资质',
                        labelStyle:"text-align:right",
                        name: 'jobQualification'
                    }
                ]
            },
            {
            	frame : true,
				style:'border-width:0;',
				layout : 'column',
				defaultType : "textfield",
                items: [
                    {
                    	xtype:"datefield",
                    	id:"cardBirthday",
                    	editable:false,// 禁止手动写入
                        format: 'Y-m-d',
                        fieldLabel: '身份证出生日期',
                        labelStyle:"text-align:right",
                        name: 'cardBirthday'
                    },
                    {
                        fieldLabel: '备注',
                        labelStyle:"text-align:right",
                        name: 'comment'
                    },
                    {
                        fieldLabel: '部门号',
                        labelStyle:"text-align:right",
                        name: 'deptId'
                    }
                ]
            },
            {
            	frame : true,
				style:'border-width:0;',
				layout : 'column',
				defaultType : "textfield",
                items: [
                    {
                        fieldLabel: '本人籍贯',
                        labelStyle:"text-align:right",
                        name: 'selfNationality'
                    },
                    {
                    	fieldLabel: 'ID',
                        name: 'id',
                        labelStyle:"text-align:right",
                        hidden:true
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