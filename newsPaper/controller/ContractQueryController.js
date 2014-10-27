/**
 * 试题库controller Created with IntelliJ IDEA. User: Administrator Date: 13-12-2
 * Time: 下午4:28 To change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.controller.ContractQueryController', {
	extend : 'Ext.app.Controller',
	views : ['ContractQueryBaseContainer', 'ContractQueryGridContainer',
			'ContractQueryGridView', 'ContractEditWindowView'],
	stores : ['ContractQueryGridStore', 'FilterContractStore'],
	models : ['ContractGridModel', 'BaseModel'],

	init : function() {
		this.control({
					'contractQueryGridView' : {
						itemdblclick : this.showContractEditWindow,// 编辑
						render : this.contractQueryGridRender
					},
					'#filterContractQuery' : { // 条件查询
						click : this.filterContractQuery
					},
					'#resetContractQuery' : { // 清空查询条件
						click : this.resetFilterContractQuery
					},
					'#contractEditFormSubmit' : {// 提交编辑
						click : this.contractEditFormSubmit
					}
				})
	},

	/**
	 * 提交编辑
	 */
	contractEditFormSubmit : function() {
		var view = Ext.getCmp('contractEditWindowView');
		var form = view.down('#contractEditForm').getForm();
		var store = Ext.data.StoreManager.lookup('ContractQueryGridStore');
		if (form.isValid()) {// 这个是多余的，不过可以防止意外
			Ext.MessageBox.confirm('确认修改', '确认修改信息?', function(btn) {
						if (btn == 'yes') {
							// 检测是否为空
							var entryDate = view.down("#entryDateEdit");
							if (entryDate.getValue() == null) {
								entryDate.name = "";
							}
							if (getCookie("ghtn_user") == "") {
								Ext.MessageBox.alert("警告", "您长时间未使用，请重新登录！",
										function() {
											window.location.href = "login.jsp";
										});
							} else {
								form.submit({
											waitMsg : '正在修改信息...',
											submitEmptyText : false,
											params : {
												account : user.account
											},
											success : function(form, action) {
												Ext.example.msg('恭喜', '修改成功');
												view.close();
												store.reload();
											},
											failure : function(form, action) {
												Ext.example.msg('对不起', "修改失败！");
												view.close();
											}
										});
							}
						}
					});
		}
	},

	/**
	 * 编辑证书信息
	 * 
	 * @param {}
	 *            view
	 * @param {}
	 *            record
	 */
	showContractEditWindow : function(view, record) {
		var window = Ext.create('NewsPaper.view.ContractEditWindowView').show();
		window.down('form').loadRecord(record);
		// 显示图片
	},

	/**
	 * 条件查询
	 */
	filterContractQuery : function() {
		Ext.getCmp('contractQueryGridView').getStore().loadPage(1);
	},

	/**
	 * 清空查询条件
	 */
	resetFilterContractQuery : function() {
		var grid = Ext.getCmp('contractQueryGridView');
		grid.down('#filterContractQueryCondition').reset();
		grid.down('#filterContractQueryValue').reset();
	},

	contractQueryGridRender : function(grid) {
		var store = grid.getStore();
		store.on('beforeload', function() {
					var queryCondition = grid
							.down('#filterContractQueryCondition')
					var queryValue = grid.down('#filterContractQueryValue')
					if (queryCondition != null) {
						queryCondition = queryCondition.getValue();
					}
					if (queryValue != null) {
						queryValue = queryValue.getValue();
					}
					if (getCookie("ghtn_user") == "") {
						Ext.MessageBox.alert("警告", "您长时间未使用，请重新登录！",
								function() {
									window.location.href = "login.jsp";
								});
					} else {
						var typeParam = {
							account : user.account,
							queryCondition : queryCondition,
							queryValue : queryValue
						};
						Ext.apply(store.proxy.extraParams, typeParam);
					}
				});
	}
});
