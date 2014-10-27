/**
 * Created with IntelliJ IDEA. User: Administrator Date: 13-12-4 Time: 下午4:40 To
 * change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.view.SourceEditPanelView', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.sourceEditPanelView',
			id : "sourceEditPanelView",
			autoScroll : true,
			items : {
				xtype : 'form',
				id : "sourceEditForm",
				// url : '../contract/add',
				padding : '30 300 0 300',
				/* 自动滚轴 */
				autoScroll : true,
				frame : true,
				items : [{
							xtype : 'fieldset',
							title : '来源',
							itemId:'sourceList',
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
										fieldLabel : "来源",
										itemId:'sourceValue',
										allowBlank : false,
										blankText : "来源不能为空",
										labelWidth : 30,
										xtype : 'combo',
										queryMode : "local",
										displayField : 'disp',
										valueField : 'value',
										store : "SourceStore"
									}]
						}],
				bbar : [
						{
							itemId : 'sourceAdd',
							xtype : 'button',
							text : '添加来源',
							formBind : true,
							iconCls : 'Add'
						}, '-', {
							itemId : 'sourceDelete',
							xtype : 'button',
							formBind : true,
							text : '删除所选',
							iconCls : 'Delete'
						}]
			}

		});