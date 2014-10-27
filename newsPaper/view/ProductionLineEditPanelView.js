/**
 * Created with IntelliJ IDEA. User: Administrator Date: 13-12-4 Time: 下午4:40 To
 * change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.view.ProductionLineEditPanelView', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.productionLineEditPanelView',
			id : "productionLineEditPanelView",
			autoScroll : true,
			items : {
				xtype : 'form',
				id : "productionLineEditForm",
				// url : '../contract/add',
				padding : '30 300 0 300',
				/* 自动滚轴 */
				autoScroll : true,
				frame : true,
				items : [{
							xtype : 'fieldset',
							title : '生产线',
							itemId:'productionLineList',
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
										fieldLabel : "生产线",
										itemId:'productionLineValue',
										allowBlank : false,
										blankText : "生产线不能为空",
										labelWidth : 50,
										xtype : 'combo',
										queryMode : "local",
										displayField : 'disp',
										valueField : 'value',
										store : "ProductionLineStore"
									}]
						}],
				bbar : [
						{
							itemId : 'productionLineAdd',
							xtype : 'button',
							text : '添加生产线',
							formBind : true,
							iconCls : 'Add'
						}, '-', {
							itemId : 'productionLineDelete',
							xtype : 'button',
							formBind : true,
							text : '删除所选',
							iconCls : 'Delete'
						}]
			}

		});