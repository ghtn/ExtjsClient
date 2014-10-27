/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.UserEditWindowView', {
			extend : 'Ext.window.Window',
			id : 'userEditWindowView',
			title : '修改信息',
			modal : true,
			width : 400,
			height : 300,
			autoScroll : true,
			closable : true,
			layout : 'fit',
			items : {
				xtype : 'form',
				itemId : 'userEditForm',
				url : '/InformationSystemService/user/updateInfo',
				autoScroll : true,
				padding : '10 10 10 30',
				frame : true,
				defaultType : "textfield",
				defaults : {
					padding : '10 0 10 0',
					labelStyle : "text-align:right"
				},
				items : [{
							name : 'account',
							itemId:'_account',
							allowBlank : false,
							blankText : "账号不能为空",
							fieldLabel : "账号",
							vtype : "alphanum", // 数字、字母、下划线
							vtypeText : "由字母、数字和下划线组成"
						}, {
							name : 'password',
							itemId:'password',
							fieldLabel : "密码",
							emptyText:'不填则不修改密码',
							inputType : 'password'
						}, {
							name : 'rePassword',
							itemId:'rePassword',
							fieldLabel : "确认密码",
							emptyText:'不填则不修改密码',
							inputType : 'password'
						}, {
							name : 'type',
							fieldLabel : "职务",
							allowBlank : false,
							blankText : "职务不能为空",
							xtype : 'combo',
							editable : false,// 禁止手动写入
							/* 从本地加载数据 */
							queryMode : "local",
							/* 显示 data 的 field 名称 */
							displayField : 'disp',
							valueField : 'value',
							store : "DutyStore"
						}],
				bbar : [
						'->', // 右对齐， 简写！
						{
							itemId : 'userEditFormSubmit',
							xtype : 'button',
							text : '提交',
							formBind : true,
							iconCls : 'Accept'
						}]
			}

		});