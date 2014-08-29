/**
 * 试题库controller Created with IntelliJ IDEA. User: Administrator Date: 13-12-2
 * Time: 下午4:28 To change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.controller.ContractAddController', {
	extend : 'Ext.app.Controller',
	views : ['ContractAddBaseContainer', 'ContractAddPanelContainer',
			'ContractAddPanelView'],
	init : function() {
		this.control({
					'#contractBankFormReset' : {// 重置
						click : this.contractBankFormReset
					},
					'#contractBankFormSubmit' : {// 提交
						click : this.contractBankFormSubmit
					}
				})
	},

	/**
	 * 提交
	 */
	contractBankFormSubmit : function() {
		var view = Ext.getCmp('contractAddPanelView');
		var form = view.down('#contractBankForm').getForm();
		if (form.isValid()) {// 这个是多余的，不过可以防止意外
			Ext.MessageBox.confirm('确认录入', '确认录入证书?', function(btn) {
				if (btn == 'yes') {
					// 检测是否为空
					var entryDateBank = view.down("#entryDateBank");

					if (entryDateBank.getValue() == null) {
						entryDateBank.name = "";
					}

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
						form.submit({
							waitMsg : '正在添加人员...',
							params : {
								userName : userName
							},
							success : function(form, action) {
								Ext.example.msg('添加成功', action.result.msg);
							},
							failure : function(form, action) {
								Ext.example.msg('添加失败', "操作失败！");
							}
						});
					}
				}
			});
		}
	},

	/**
	 * 重置
	 */
	contractBankFormReset : function() {
		Ext.getCmp('contractAddPanelView').down('#contractBankForm').getForm()
				.reset();
	}

});
