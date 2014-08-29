/**
 * 试题库controller Created with IntelliJ IDEA. User: Administrator Date: 13-12-2
 * Time: 下午4:28 To change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.controller.ContractController', {
	extend : 'Ext.app.Controller',
	views : ['ContractBaseContainer', 'ContractGridContainer',
			'ContractGridView', 'ContractEditWindowView',
			'ContractBankWindowView'],
	stores : ['ContractGridStore', 'FilterContractStore'],
	models : ['ContractGridModel', 'FilterContractModel'],

	init : function() {
		this.control({
					'contractGridView' : {
						itemdblclick : this.showContractEditWindow,// 编辑
						render : this.contractGridRender
					},
					'#filterContract' : { // 条件查询
						click : this.filterContract
					},
					'#resetContract' : { // 清空查询条件
						click : this.resetFilterContract
					},
					'#removeContract' : { // 删除
						click : this.removeContract
					},
					'#addContract' : { // 录入
						click : this.addContract
					},
					'#contractBankFormReset' : {// 重置
						click : this.contractBankFormReset
					},
					'#contractBankFormSubmit' : {// 提交
						click : this.contractBankFormSubmit
					}
				})
	},
	
	/**
	 * 重置
	 */
	contractBankFormReset:function(){
		 Ext.getCmp('contractBankWindowView').down('#contractBankForm').getForm().reset();
	},
	
	/**
	 * 提交
	 */
	contractBankFormSubmit:function(){
		var view = Ext.getCmp('contractBankWindowView');
        var form = view.down('#contractBankForm').getForm();
        if (form.isValid()) {
            Ext.MessageBox.confirm('确认录入', '确认录入合同?', function (btn) {
                if (btn == 'yes') {
                	// 检测是否为空
                	var entryDate = view.down("#entryDate");
                	if( entryDate.getValue() == null){
	                	entryDate.name = "";
                	}
                	
                	var userName = Ext.util.Cookies.get("userName");
					if( userName == null){
						Ext.MessageBox.alert("警告", "您长时间未使用，请重新登录！", function(){
							window.location.href = window.location.protocol + "//" 
								+ window.location.host + "/InformationSystemClient";
						});
					}else{
	                	var store = Ext.data.StoreManager.lookup('ContractGridStore');
	                    form.submit({
	                        waitMsg: '正在录入合同...',
	                        params:{
	                        	userName:userName
	                        },
	                        success: function (form, action) {
	                            Ext.example.msg('录入成功', action.result.msg);
	                            view.close();
	                            store.reload();
	                        },
	                        failure: function (form, action) {
	                            Ext.MessageBox.alert('录入失败', "操作失败！");
	                            view.close();
	                        }
	                    });
					}
                }
            });
        }
	},

	/**
	 * 录入
	 */
	addContract : function() {
		Ext.create('NewsPaper.view.ContractBankWindowView').show();
	},

	/**
	 * 删除合同
	 */
	removeContract : function() {
		var grid = Ext.getCmp('contractGridView');
		var record = grid.getSelectionModel().getSelection()[0];
		if (record) {
			var id = record.data.id;
			Ext.MessageBox.confirm('确认删除', '确认删除所选择的合同?', function(btn) {
				if (btn == 'yes') {
					var userName = Ext.util.Cookies.get("userName");
					if (userName == null) {
						Ext.MessageBox.alert("警告", "您长时间未使用，请重新登录！",
								function() {
									window.location.href = window.location.protocol
											+ "//"
											+ window.location.host
											+ "/InformationSystemClient";
								});
					} else {
						var store = Ext.data.StoreManager
								.lookup('ContractGridStore');
						var progress = Ext.MessageBox.wait('正在删除所选择的合同', '提交',
								{
									text : '删除中...'
								});
						Ext.Ajax.request({
									url : '/InformationSystemService/contract/remove',
									method : 'post',
									params : {
										userName : userName,
										id : id
									},
									success : function(response) {
										progress.close();
										var result = Ext.JSON
												.decode(response.responseText);
										if (result.success) {
											Ext.example.msg('删除成功', result.msg);
										} else {
											Ext.MessageBox.alert('删除失败',
													result.msg);
										}
										store.reload();
									},
									failure : function(response) {
										progress.close();
										var result = Ext.JSON
												.decode(response.responseText);
										Ext.MessageBox
												.alert('删除失败', result.msg);
									}
								});
					}
				}
			})
		} else {
			Ext.MessageBox.alert('错误', '请选择一条记录！');
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
	filterContract : function() {
		Ext.getCmp('contractGridView').getStore().loadPage(1);
	},

	/**
	 * 清空查询条件
	 */
	resetFilterContract : function() {
		var grid = Ext.getCmp('contractGridView');
		grid.down('#filterContractCondition').reset();
		grid.down('#filterContractValue').reset();
	},

	contractGridRender : function(grid) {
		var store = grid.getStore();
		store.on('beforeload', function() {
			var queryCondition = grid.down('#filterContractCondition')
			var queryValue = grid.down('#filterContractValue')
			if (queryCondition != null) {
				queryCondition = queryCondition.getValue();
			}
			if (queryValue != null) {
				queryValue = queryValue.getValue();
			}
			var userName = Ext.util.Cookies.get("userName");
			if (userName == null) {
				Ext.MessageBox.alert("警告", "您长时间未使用，请重新登录！", function() {
					window.location.href = window.location.protocol + "//"
							+ window.location.host + "/InformationSystemClient";
				});
			} else {
				var typeParam = {
					userName : userName,
					queryCondition : queryCondition,
					queryValue : queryValue
				};
				Ext.apply(store.proxy.extraParams, typeParam);
			}
		});
	}
});
