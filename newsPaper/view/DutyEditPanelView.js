/**
 * Created with IntelliJ IDEA. User: Administrator Date: 13-12-4 Time: 下午4:40 To
 * change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.view.DutyEditPanelView', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.dutyEditPanelView',
			id : "dutyEditPanelView",
			autoScroll : true,
			items : {
				xtype : 'form',
				id : "dutyEditForm",
				// url : '../contract/add',
				padding : '30 300 0 300',
				/* 自动滚轴 */
				autoScroll : true,
				frame : true,
				items : [{
							xtype : 'fieldset',
							title : '职务',
							itemId:'dutyList',
							collapsible : true,
							frame : true,
							autoScroll : true,
							height : 400,
							defaults : {
								xtype : 'displayfield'
							}
						}, {
							xtype : 'fieldset',
							title : '操作区',
							collapsible : true,
							frame : true,
							height : 60,
							items : [{
										name : 'sex',
										fieldLabel : "职务",
										itemId:'dutyValue',
										allowBlank : false,
										blankText : "职务不能为空",
										labelWidth : 30,
										xtype : 'combo',
										queryMode : "local",
										displayField : 'disp',
										valueField : 'value',
										store : "DutyStore"
									}]
						}],
				bbar : [
						{
							itemId : 'dutyAdd',
							xtype : 'button',
							text : '添加职务',
							formBind : true,
							iconCls : 'Add'
						}, '-', {
							itemId : 'dutyDelete',
							xtype : 'button',
							formBind : true,
							text : '删除所选',
							iconCls : 'Delete'
						}]
			}

		});