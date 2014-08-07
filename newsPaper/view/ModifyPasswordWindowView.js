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
        url: '/InformationSystemService/user/updatePassword',
        autoScroll : true,
		frame : true,
		defaultType:'textfield',
        items : [
        	{
				name:'name',
				itemId:'modifyPasswordName',
				allowBlank:false,
				blankText:"用户名不能为空",
				fieldLabel:"用户名",
				disabled:true,
				labelStyle:"text-align:right",
				padding:'20 0 0 30',
				vtype:"alphanum", // 数字、字母、下划线
				vtypeText:"由字母、数字和下划线组成",
				minLength:5,
				minLengthText:"学号长度不能小于{0}",
				maxLength:20,
				maxLengthText:"学号长度不能大于{0}"
			},
			{
				name:'passwordOld',
				inputType:'password',
				allowBlank:false,
				blankText:"当前密码不能为空",
				labelStyle:"text-align:right",
				fieldLabel:"当前密码",
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