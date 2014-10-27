/**
 * Created with IntelliJ IDEA. User: Administrator Date: 13-12-4 Time: 下午4:40 To
 * change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.view.JobDistEditPanelView', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.jobDistEditPanelView',
			id : "jobDistEditPanelView",
			autoScroll : true,
			items : {
				xtype : 'form',
				id : "jobDistEditForm",
				// url : '../contract/add',
				padding : '30 300 0 300',
				/* 自动滚轴 */
				autoScroll : true,
				frame : true,
				items : [{
							xtype : 'fieldset',
							title : '工别',
							itemId:'jobDistList',
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
										fieldLabel : "工别",
										itemId:'jobDistValue',
										allowBlank : false,
										blankText : "工别不能为空",
										labelWidth : 30,
										xtype : 'combo',
										queryMode : "local",
										displayField : 'disp',
										valueField : 'value',
										store : "JobDistStore"
									}]
						}],
				bbar : [
						{
							itemId : 'jobDistAdd',
							xtype : 'button',
							text : '添加工别',
							formBind : true,
							iconCls : 'Add'
						}, '-', {
							itemId : 'jobDistDelete',
							xtype : 'button',
							formBind : true,
							text : '删除所选',
							iconCls : 'Delete'
						}]
			}

		});