/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.ContractBankWindowView', {
	extend : 'Ext.window.Window',
	id : 'contractBankWindowView',
	title : '录入',
	modal : true,
	width : 850,
	height : 600,
	/* 自动滚轴 */
	autoScroll : true,
	closable : true,
	layout : 'fit',
	items : [{
		xtype : "form",
		id:"contractBankForm",
		bodyPadding : 10,
		url: '/InformationSystemService/contract/add',
		/* 自动滚轴 */
		autoScroll : true,
		frame : true,
		layout : 'form',
		items : [{
			xtype : 'fieldset',
			title : '信息',
			frame : true,
			layout : 'form',
			items : [{
						xtype : 'fieldset',
						frame : true,
						layout : 'column',
						defaultType : 'textfield',
						style : 'border-width:0;',
						items : [{
									name : 'number',
									labelStyle : "text-align:right",
									fieldLabel : '证书编号'
								}, {
									name : 'empNumber',
									labelStyle : "text-align:right",
									fieldLabel : '员工号'
								}, {
									name : 'name',
									labelStyle : "text-align:right",
									fieldLabel : '姓名'
								}]
					}, {
						xtype : 'fieldset',
						frame : true,
						layout : 'column',
						defaultType : 'textfield',
						style : 'border-width:0;',
						items : [{
									name : 'card',
									labelStyle : "text-align:right",
									fieldLabel : '身份证号',
									regex : /^(\d{18,18}|\d{15,15}|\d{17,17}x)$/,
									regexText : '身份证号不合法！'
								}, {
									name : 'entryDate',
									itemId:'entryDate',
									xtype : 'datefield',
									labelStyle : "text-align:right",
									fieldLabel : '录入时间',
									editable:false,// 禁止手动写入
									format : 'Y-m-d'
								}, {
									name : 'type',
									labelStyle : "text-align:right",
									fieldLabel : '证书类型'
								}]
					}]
		}, {
			xtype : 'fieldset',
			title : '合同',
			height : 395,
			frame : true,
			items : [{
						html : '<img src=./resources/contract.png height=395 width=800/>'
					}]
		}],
		bbar : [
			'->', // 右对齐， 简写！
			{
				itemId : 'contractBankFormReset',
				xtype : 'button',
				text : '重置',
				iconCls : 'Arrowredo'
			},
			'-',
			{
				itemId : 'contractBankFormSubmit',
				xtype : 'button',
				formBind : true,
				text : '提交',
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