/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.ModifyPasswordWindowView', {
    extend: 'Ext.window.Window',
    id: 'modifyPasswordWindowView',
    title: '修改密码',
    modal: true,
    width: 420,
    height: 280,
    autoScroll: true,
    closable: true,
    layout: 'fit',
    items: {
        xtype: 'form',
        itemId: 'modifyPasswordForm',
        bodyPadding: 10,
        url: '../user/updatePassword',
        autoScroll : true,
		frame : true,
		defaultType:'textfield',
        items : [
			{
				name:'passwordOld',
				inputType:'password',
				allowBlank:false,
				blankText:"密码不能为空",
				labelStyle:"text-align:right",
				fieldLabel:"密码",
				padding:'20 0 0 30'
			},
			{
				name:'passwordNew',
				inputType:'password',
				allowBlank:false,
				blankText:"新密码不能为空",
				labelStyle:"text-align:right",
				fieldLabel:"新密码",
				padding:'20 0 0 30'
			},
			{
				name:'passwordReNew',
				inputType:'password',
				allowBlank:false,
				blankText:"确认不能为空",
				labelStyle:"text-align:right",
				fieldLabel:"确认密码",
				padding:'20 0 0 30'
			}
		],
        bbar : [
			'->', // 右对齐， 简写！
			{
				itemId : 'modifyPasswordFormReset',
				xtype : 'button',
				text : '重置',
				iconCls : 'Arrowredo'
			},
			'-',
			{
				itemId : 'modifyPasswordFormSubmit',
				xtype : 'button',
				formBind : true,
				text : '提交',
				iconCls : 'Accept'
			}
		]
    }

});