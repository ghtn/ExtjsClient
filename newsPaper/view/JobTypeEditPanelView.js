/**
 * Created with IntelliJ IDEA. User: Administrator Date: 13-12-4 Time: 下午4:40 To
 * change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.view.JobTypeEditPanelView', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.jobTypeEditPanelView',
			id : "jobTypeEditPanelView",
			autoScroll : true,
			items : {
				xtype : 'form',
				id : "jobTypeEditForm",
				// url : '../contract/add',
				padding : '30 300 0 300',
				/* 自动滚轴 */
				autoScroll : true,
				frame : true,
				items : [{
							xtype : 'fieldset',
							title : '工种',
							itemId:'jobTypeList',
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
										fieldLabel : "工种",
										itemId:'jobTypeValue',
										allowBlank : false,
										blankText : "工种不能为空",
										labelWidth : 30,
										xtype : 'combo',
										queryMode : "local",
										displayField : 'disp',
										valueField : 'value',
										store : "JobTypeStore"
									}]
						}],
				bbar : [
						{
							itemId : 'jobTypeAdd',
							xtype : 'button',
							text : '添加工种',
							formBind : true,
							iconCls : 'Add'
						}, '-', {
							itemId : 'jobTypeDelete',
							xtype : 'button',
							formBind : true,
							text : '删除所选',
							iconCls : 'Delete'
						}]
			}

		});