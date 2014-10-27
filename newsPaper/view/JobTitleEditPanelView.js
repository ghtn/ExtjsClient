/**
 * Created with IntelliJ IDEA. User: Administrator Date: 13-12-4 Time: 下午4:40 To
 * change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.view.JobTitleEditPanelView', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.jobTitleEditPanelView',
			id : "jobTitleEditPanelView",
			autoScroll : true,
			items : {
				xtype : 'form',
				id : "jobTitleEditForm",
				// url : '../contract/add',
				padding : '30 300 0 300',
				/* 自动滚轴 */
				autoScroll : true,
				frame : true,
				items : [{
							xtype : 'fieldset',
							title : '职称',
							itemId:'jobTitleList',
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
										fieldLabel : "职称",
										itemId:'jobTitleValue',
										allowBlank : false,
										blankText : "职称不能为空",
										labelWidth : 30,
										xtype : 'combo',
										queryMode : "local",
										displayField : 'disp',
										valueField : 'value',
										store : "JobTitleStore"
									}]
						}],
				bbar : [
						{
							itemId : 'jobTitleAdd',
							xtype : 'button',
							text : '添加职称',
							formBind : true,
							iconCls : 'Add'
						}, '-', {
							itemId : 'jobTitleDelete',
							xtype : 'button',
							formBind : true,
							text : '删除所选',
							iconCls : 'Delete'
						}]
			}

		});