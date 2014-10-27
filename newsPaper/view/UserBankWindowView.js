/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.UserBankWindowView', {
			extend : 'Ext.window.Window',
			id : 'userBankWindowView',
			title : '添加用户',
			modal : true,
			width : 400,
			height : 300,
			/* 自动滚轴 */
			autoScroll : true,
			closable : true,
			layout : 'fit',
			items : [{
						xtype : "form",
						id : "userBankForm",
						url : '/InformationSystemService/user/add',
						/* 自动滚轴 */
						autoScroll : true,
						padding : '10 10 10 30',
						frame : true,
						defaultType : "textfield",
						defaults : {
							allowBlank : false,
							padding : '10 0 10 0',
							labelStyle : "text-align:right"
						},
						items : [{
									name : '_account',
									blankText : "账号不能为空",
									fieldLabel : "账号",
									vtype : "alphanum", // 数字、字母、下划线
									vtypeText : "由字母、数字和下划线组成"
								}, {
									name : 'password',
									blankText : "密码不能为空",
									fieldLabel : "密码",
									inputType : 'password'
								}, {
									name : 'rePassword',
									blankText : "确认密码不能为空",
									fieldLabel : "确认密码",
									inputType : 'password'
								}, {
									name : 'type',
									fieldLabel : "职务",
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
									itemId : 'userBankFormReset',
									xtype : 'button',
									text : '重置',
									iconCls : 'Arrowredo'
								}, '-', {
									itemId : 'userBankFormSubmit',
									xtype : 'button',
									formBind : true,
									text : '提交',
									iconCls : 'Accept'
								}, ' ', ' ']
					}]
		});