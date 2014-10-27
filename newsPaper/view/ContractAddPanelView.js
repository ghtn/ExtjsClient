/**
 * Created with IntelliJ IDEA. User: Administrator Date: 13-12-4 Time: 下午4:40 To
 * change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.view.ContractAddPanelView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.contractAddPanelView',
	id : "contractAddPanelView",
	autoScroll : true,
	items : {
		xtype : 'form',
		id : "contractBankForm",
		url : '../contract/add',
		padding:'0 150 0 150',
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
									itemId : 'entryDateBank',
									xtype : 'datefield',
									labelStyle : "text-align:right",
									fieldLabel : '录入时间',
									editable : false,// 禁止手动写入
									format : 'Y-m-d'
								}, {
									name : 'type',
									labelStyle : "text-align:right",
									fieldLabel : '证书类型'
								}]
					}]
		}, {
			xtype : 'fieldset',
			title : '证书',
			height : 395,
			frame : true,
			items : [{
				html : '<img src=./resources/contract.png height=395 width=820/>'
			}]
		}],
		bbar : [
				'->', // 右对齐， 简写！
				{
					itemId : 'contractBankFormReset',
					xtype : 'button',
					text : '重置',
					iconCls : 'Arrowredo'
				}, '-', {
					itemId : 'contractBankFormSubmit',
					xtype : 'button',
					formBind : true,
					text : '提交',
					iconCls : 'Accept'
				}]
	}

});