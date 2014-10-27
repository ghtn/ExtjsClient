/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.GradeEditWindowView', {
			extend : 'Ext.window.Window',
			id : 'gradeEditWindowView',
			title : '修改权限',
			modal : true,
			width : 500,
			height : 350,
			autoScroll : true,
			closable : true,
			layout : 'fit',
			items : {
				xtype : 'form',
				itemId : 'geadrEditForm',
				url : '/InformationSystemService/user/update',
				padding:'10 0 0 50',
				autoScroll : true,
				frame : true,
				items : [{
							xtype : 'fieldset',
							frame : true,
							style : 'border-width:0;',
							layout : 'column',
							defaultType : "displayfield",
							defaults : {
								labelStyle : "text-align:right"
							},
							items : [{
										name : 'account',
										itemId:'account',
										fieldLabel : "账号"
									}, {
										name : 'type',
										fieldLabel : "职务"
									}]
						}, {
							xtype : 'fieldset',
							frame : true,
							title : '人事管理',
							style : 'border-width:0;',
							layout : 'column',
							defaultType : 'checkboxfield',
							defaults : {
								padding : '0 25 15 0'
							},
							items : [{
										boxLabel : '人事信息',
										itemId:'grade11'
									}, {
										boxLabel : '人员调动',
										itemId:'grade10'
									}, {
										boxLabel : '人员离职',
										itemId:'grade9'
									}, {
										boxLabel : '人员复职',
										itemId:'grade8'
									}]
						}, {
							xtype : 'fieldset',
							frame : true,
							title : '证书管理',
							style : 'border-width:0;',
							layout : 'column',
							defaultType : 'checkboxfield',
							defaults : {
								padding : '0 25 15 0'
							},
							items : [{
										boxLabel : '证书录入',
										itemId:'grade7'
									}, {
										boxLabel : '查询证书',
										itemId:'grade6'
									}, {
										boxLabel : '删除证书',
										itemId:'grade5'
									}]
						}, {
							xtype : 'fieldset',
							frame : true,
							title : '在线考试',
							style : 'border-width:0;',
							layout : 'column',
							defaultType : 'checkboxfield',
							defaults : {
								padding : '0 25 15 0'
							},
							items : [{
										boxLabel : '题库管理',
										itemId:'grade4'
									}, {
										boxLabel : '制作试卷',
										itemId:'grade3'
									}, {
										boxLabel : '试卷管理',
										itemId:'grade2'
									}, {
										boxLabel : '考试管理',
										itemId:'grade1'
									}, {
										boxLabel : '成绩管理',
										itemId:'grade0'
									}]
						}],
				bbar : [
						'->', // 右对齐， 简写！
						{
							itemId : 'geadrEditFormSubmit',
							xtype : 'button',
							text : '提交',
							formBind : true,
							iconCls : 'Accept'
						}]
			}

		});