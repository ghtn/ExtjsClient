/**
 * 试题库controller Created with IntelliJ IDEA. User: Administrator Date: 13-12-2
 * Time: 下午4:28 To change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.controller.TransferController', {
	extend : 'Ext.app.Controller',
	views : ['TransferBaseContainer', 'TransferGridContainer',
			'TransferGridView', 'TransferInfoWindowView',
			'TransferEmployeeGridView', 'TransferEmployeeGridContainer',
			'TransferEmployeeBaseContainer', 'EmployeeEditWindowView'],
	stores : ['TransferEmployeeStore', 'AllEmployeeStore', 'TransferStore', 'EmployeeStore', 'SexStore',
			'BloodStore', 'SourceStore', 'DutyStore',
			'JobTitleStore', 'JobTypeStore', 'JobDistStore',
			'ProductionLineStore', 'DeptStore', 'DeptIdStore',
			'PostStateStore', 'FilterEmployeeStore'],
	models : ['EmployeeModel', 'TransferModel', 'BaseModel'],

	init : function() {
		this.control({
					'transferGridView' : {
						itemdblclick : this.showTransferInfoWindow,// 调动详情
						render : this.transferGridRender
					},
					'transferEmployeeGridView' : {
						itemdblclick : this.showTransferEmployeeWindow,// 调动人员
						render : this.transferEmployeeGridView
					},
					'#employeeEditFormSubmit' : {// 提交修改
						click : this.employeeEditFormSubmit
					},
					'#filterTEmployee' : { // 条件查询
						click : this.filterTEmployee
					},
					'#resetFilterTEmployee' : { // 清空查询条件
						click : this.resetFilterTEmployee
					},
					'#filterTransferEmployee' : { // 条件查询
						click : this.filterTransferEmployee
					},
					'#resetFilterTransferEmployee' : { // 清空查询条件
						click : this.resetFilterTransferEmployee
					},
					'#employeeEditCard' : { // 根据身份证自动填写身份证出身日期
						change : this.employeeEditCard
					},
					'#transferEmployee' : { // 人员调动
						click : this.transferEmployee
					},
					'#employeeEditDeptName' : { // 自动选择相应的部门号
						change : this.employeeEditDeptName
					},
					'#employeeEditDeptId' : { // 自动选择相应的部门
						change : this.employeeEditDeptId
					}
				})
	},
	
	employeeEditDeptId : function() {
		var grid = Ext.getCmp('employeeEditWindowView');
		var deptId = grid.down('#employeeEditDeptId').getValue();
		var deptName = grid.down('#employeeEditDeptName');
		switch (deptId) {
			case '1001' :
				deptName.setValue('101队');
				break;
			case '1002' :
				deptName.setValue('201队');
				break;
			case '1003' :
				deptName.setValue('202队');
				break;
			case '1004' :
				deptName.setValue('203队');
				break;
			case '1005' :
				deptName.setValue('204队');
				break;
			case '1006' :
				deptName.setValue('综采队');
				break;
			case '1007' :
				deptName.setValue('安装队');
				break;
			case '1008' :
				deptName.setValue('救护队');
				break;
			case '1009' :
				deptName.setValue('维修队');
				break;
			case '1010' :
				deptName.setValue('机运队');
				break;
			case '1011' :
				deptName.setValue('辅运队');
				break;
			case '1012' :
				deptName.setValue('水电队');
				break;
			case '1013' :
				deptName.setValue('调度指挥中心');
				break;
			case '1014' :
				deptName.setValue('安全管理部');
				break;
			case '1015' :
				deptName.setValue('通风科');
				break;
			case '1016' :
				deptName.setValue('机运科');
				break;
			case '1017' :
				deptName.setValue('地测科');
				break;
			case '1018' :
				deptName.setValue('探水队');
				break;
			case '1019' :
				deptName.setValue('生产技术科');
				break;
			case '1020' :
				deptName.setValue('销售科');
				break;
			case '1021' :
				deptName.setValue('机修厂');
				break;
			case '1022' :
				deptName.setValue('公司办');
				break;
			case '1023' :
				deptName.setValue('企业管理部');
				break;
			case '1024' :
				deptName.setValue('人力资源部');
				break;
			case '1025' :
				deptName.setValue('计划财务部');
				break;
			case '1026' :
				deptName.setValue('党委工作部');
				break;
			case '1027' :
				deptName.setValue('武装保卫部');
				break;
			case '1028' :
				deptName.setValue('工会');
				break;
			case '1029' :
				deptName.setValue('供应科');
				break;
			case '1030' :
				deptName.setValue('计能科');
				break;
			case '1031' :
				deptName.setValue('房产科');
				break;
			case '1032' :
				deptName.setValue('职防环保部');
				break;
		}
	},
	employeeEditDeptName : function() {
		var grid = Ext.getCmp('employeeEditWindowView');
		var deptName = grid.down('#employeeEditDeptName').getValue();
		var deptId = grid.down('#employeeEditDeptId');
		switch (deptName) {
			case '101队' :
				deptId.setValue('1001');
				break;
			case '201队' :
				deptId.setValue('1002');
				break;
			case '202队' :
				deptId.setValue('1003');
				break;
			case '203队' :
				deptId.setValue('1004');
				break;
			case '204队' :
				deptId.setValue('1005');
				break;
			case '综采队' :
				deptId.setValue('1006');
				break;
			case '安装队' :
				deptId.setValue('1007');
				break;
			case '救护队' :
				deptId.setValue('1008');
				break;
			case '维修队' :
				deptId.setValue('1009');
				break;
			case '机运队' :
				deptId.setValue('1010');
				break;
			case '辅运队' :
				deptId.setValue('1011');
				break;
			case '水电队' :
				deptId.setValue('1012');
				break;
			case '调度指挥中心' :
				deptId.setValue('1013');
				break;
			case '安全管理部' :
				deptId.setValue('1014');
				break;
			case '通风科' :
				deptId.setValue('1015');
				break;
			case '机运科' :
				deptId.setValue('1016');
				break;
			case '地测科' :
				deptId.setValue('1017');
				break;
			case '探水队' :
				deptId.setValue('1018');
				break;
			case '生产技术科' :
				deptId.setValue('1019');
				break;
			case '销售科' :
				deptId.setValue('1020');
				break;
			case '机修厂' :
				deptId.setValue('1021');
				break;
			case '公司办' :
				deptId.setValue('1022');
				break;
			case '企业管理部' :
				deptId.setValue('1023');
				break;
			case '人力资源部' :
				deptId.setValue('1024');
				break;
			case '计划财务部' :
				deptId.setValue('1025');
				break;
			case '党委工作部' :
				deptId.setValue('1026');
				break;
			case '武装保卫部' :
				deptId.setValue('1027');
				break;
			case '工会' :
				deptId.setValue('1028');
				break;
			case '供应科' :
				deptId.setValue('1029');
				break;
			case '计能科' :
				deptId.setValue('1030');
				break;
			case '房产科' :
				deptId.setValue('1031');
				break;
			case '职防环保部' :
				deptId.setValue('1032');
				break;
		}
	},
	
	employeeEditCard : function() {
		var grid = Ext.getCmp('employeeEditWindowView');
		var card = grid.down('#employeeEditCard');
		var cardBirthday = grid.down('#employeeEditCardBirthday');
		if (card.isValid()) {
			card = card.getValue();
			var year, month, day;
			if (card.length == 15) {
				year = "19" + Ext.util.Format.substr(card, 6, 2);
				month = Ext.util.Format.substr(card, 8, 2);
				day = Ext.util.Format.substr(card, 10, 2);
			} else if (card.length == 18) {
				year = Ext.util.Format.substr(card, 6, 4);
				month = Ext.util.Format.substr(card, 10, 2);
				day = Ext.util.Format.substr(card, 12, 2);
			}
			cardBirthday.setValue(year + "-" + month + "-" + day);
		}
	},
	employeeEditFormSubmit : function() {
		var view = Ext.getCmp('employeeEditWindowView');
		var form = view.down('#employeeEditForm').getForm();
		var store = Ext.data.StoreManager.lookup('EmployeeStore');
		if (form.isValid()) {// 这个是多余的，不过可以防止意外
			Ext.MessageBox.confirm('确认调动', '确认调动信息?', function(btn) {
						if (btn == 'yes') {
							// 检测是否为空
							var armTime = view.down("#armTimeEdit");
							var birthday = view.down("#birthdayEdit");
							var workTime = view.down("#workTimeEdit");
							var unitTime = view.down("#unitTimeEdit");
							var dutyTime = view.down("#dutyTimeEdit");
							var jobTitleTime = view.down("#jobTitleTimeEdit");
							var jobTypeTime = view.down("#jobTypeTimeEdit");
							var graduateTime = view.down("#graduateTimeEdit");
							var endArmTime = view.down("#endArmTimeEdit");
							var conversionTime = view
									.down("#conversionTimeEdit");
							var cardBirthday = view
									.down("#employeeEditCardBirthday");

							var postSalary = view.down("#postSalaryEdit");
							var skillSalary = view.down("#skillSalaryEdit");
							var skillGrage = view.down("#skillGrageEdit");
							if (armTime.value == null) {
								armTime.name = "";
							}
							if (birthday.value == null) {
								birthday.name = "";
							}
							if (workTime.value == null) {
								workTime.name = "";
							}
							if (unitTime.value == null) {
								unitTime.name = "";
							}
							if (dutyTime.value == null) {
								dutyTime.name = "";
							}
							if (jobTitleTime.value == null) {
								jobTitleTime.name = "";
							}
							if (jobTypeTime.value == null) {
								jobTypeTime.name = "";
							}
							if (graduateTime.value == null) {
								graduateTime.name = "";
							}
							if (endArmTime.value == null) {
								endArmTime.name = "";
							}
							if (conversionTime.value == null) {
								conversionTime.name = "";
							}
							if (cardBirthday.value == null) {
								cardBirthday.name = "";
							}
							if (postSalary.value == null) {
								postSalary.name = "";
							}
							if (skillSalary.value == null) {
								skillSalary.name = "";
							}
							if (skillGrage.value == null) {
								skillGrage.name = "";
							}
							if (getCookie("ghtn_user") == "") {
								Ext.MessageBox.alert("警告", "您长时间未使用，请重新登录！",
										function() {
											window.location.href = "login.jsp";
										});
							} else {
								form.submit({
											waitMsg : '正在调动人员...',
											submitEmptyText : false,
											params : {
												account : user.account
											},
											success : function(form, action) {
												Ext.example.msg('恭喜', '调动成功!');
												view.close();
												store.reload();
											},
											failure : function(form, action) {
												Ext.example.msg('对不起', '调动失败!');
												view.close();
											}
										});
							}
						}
					});
		}
	},

	showTransferEmployeeWindow : function(view, record) {
		var window = Ext.create('NewsPaper.view.EmployeeEditWindowView').show();
		window.down('form').loadRecord(record);
	},

	/**
	 * 人员调动
	 */
	transferEmployee : function() {
		var mainTabPanel = Ext.getCmp('mainTabpanelView');
		var tab = Ext.getCmp(512);
		if (!tab) {
			tab = mainTabPanel.add({
						id : 512,
						title : "调动",
						xtype : 'transferEmployeeBaseContainer',
						closable : true
					});
		}
		mainTabPanel.setActiveTab(tab);
		Ext.data.StoreManager.lookup('AllEmployeeStore').reload();
		Ext.data.StoreManager.lookup('SourceStore').load({
					params : {
						account : user.account,
						fieldName : 'source'
					}
				});
		Ext.data.StoreManager.lookup('DutyStore').load({
					params : {
						account : user.account,
						fieldName : 'source'
					}
				});
		Ext.data.StoreManager.lookup('JobTitleStore').load({
					params : {
						account : user.account,
						fieldName : 'jobTitle'
					}
				});
		Ext.data.StoreManager.lookup('JobDistStore').load({
					params : {
						account : user.account,
						fieldName : 'jobDist'
					}
				});
		Ext.data.StoreManager.lookup('JobTypeStore').load({
					params : {
						account : user.account,
						fieldName : 'jobType'
					}
				});
		Ext.data.StoreManager.lookup('ProductionLineStore').load({
					params : {
						account : user.account,
						fieldName : 'jobType'
					}
				});
	},

	showTransferInfoWindow : function(view, record) {
		// 拿到身份证号
		var card = record.data.card;
		// 准备好store
		store = Ext.data.StoreManager.lookup('TransferStore');
		if (getCookie("ghtn_user") == "") {
			Ext.MessageBox.alert("警告", "您长时间未使用，请重新登录！", function() {
						window.location.href = "login.jsp";
					});
		} else {
			// load回调函数
			store.load({
				params : {
					account : user.account,
					card : card
				},
				callback : function(records, opts, success) {

					if (success) {

						// 如果没有调动详情， 显示相应的信息
						if (records.length == 0) {
							Ext.example.msg('对不起', '暂时还没有该人员的调动过程！');
							return;
						}
						// 显示window
						Ext.create('NewsPaper.view.TransferInfoWindowView')
								.show();
						// 把数据显示到form里
						var form = Ext.getCmp('transferInfoWindowView')
								.down('#trandferInfoForm');
						for (var i = 0; i < records.length; i++) {
							form.add({
										xtype : 'fieldset',
										title : 'No.' + (i + 1),
										collapsible : true,
										defaultType : 'displayfield',
										items : [{
													fieldLabel : '调动时间',
													value : records[i].data.transDate
												}, {
													fieldLabel : '调动过程',
													value : records[i].data.detail
												}]
									});
						}
					} else {
						form.add({
									xtype : 'displayfield',
									fieldLabel : '对不起',
									value : '暂时还没有该人员的调动过程'
								});
					}
				}
			});
		}
	},

	transferGridRender : function(grid) {
		var store = grid.getStore();
		store.on('beforeload', function() {
					var queryCondition = grid
							.down('#filterTransferEmployeeCondition')
					var queryValue = grid.down('#filterTransferEmployeeValue')
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
	},
	transferEmployeeGridView : function(grid) {
		var store = grid.getStore();
		store.on('beforeload', function() {
					var queryCondition = grid
							.down('#filterTransferEmployeeCondition')
					var queryValue = grid.down('#filterTransferEmployeeValue')
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
	},

	filterTransferEmployee : function() {
		Ext.getCmp('transferGridView').getStore().loadPage(1);
	},
	resetFilterTransferEmployee : function() {
		var grid = Ext.getCmp('transferGridView');
		grid.down('#filterTransferEmployeeCondition').reset();
		grid.down('#filterTransferEmployeeValue').reset();
	},

	filterTEmployee : function() {
		Ext.getCmp('transferEmployeeGridView').getStore().loadPage(1);
	},
	resetFilterTEmployee : function() {
		var grid = Ext.getCmp('transferEmployeeGridView');
		grid.down('#filterTransferEmployeeCondition').reset();
		grid.down('#filterTransferEmployeeValue').reset();
	}
});
