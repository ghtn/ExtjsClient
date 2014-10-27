/**
 * 试题库controller Created with IntelliJ IDEA. User: Administrator Date: 13-12-2
 * Time: 下午4:28 To change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.controller.InfoController', {
	extend : 'Ext.app.Controller',
	views : ['SourceEditBaseContainer', 'SourceEditPanelContainer',
			'SourceEditPanelView', 'DutyEditBaseContainer',
			'DutyEditPanelContainer', 'DutyEditPanelView',
			'JobTitleEditBaseContainer', 'JobTitleEditPanelContainer',
			'JobTitleEditPanelView', 'JobTypeEditBaseContainer',
			'JobTypeEditPanelContainer', 'JobTypeEditPanelView',
			'JobDistEditBaseContainer', 'JobDistEditPanelContainer',
			'JobDistEditPanelView', 'ProductionLineEditBaseContainer',
			'ProductionLineEditPanelContainer', 'ProductionLineEditPanelView'],
	stores : ['SourceStore', 'DutyStore', 'JobTitleStore', 'JobTypeStore',
			'JobDistStore', 'ProductionLineStore'],
	models : ['BaseModel'],

	init : function() {
		this.control({
					'#sourceAdd' : {// 添加来源
						click : this.sourceAdd
					},
					'#sourceDelete' : {// 删除所选(来源)
						click : this.sourceDelete
					},
					'#dutyAdd' : {// 添加职务
						click : this.dutyAdd
					},
					'#dutyDelete' : {// 删除所选(职务)
						click : this.dutyDelete
					},
					'#jobTitleAdd' : {// 添加职称
						click : this.jobTitleAdd
					},
					'#jobTitleDelete' : {// 删除所选(职称)
						click : this.jobTitleDelete
					},
					'#jobTypeAdd' : {// 添加工种
						click : this.jobTypeAdd
					},
					'#jobTypeDelete' : {// 删除所选(工种)
						click : this.jobTypeDelete
					},
					'#jobDistAdd' : {// 添加工别
						click : this.jobDistAdd
					},
					'#jobDistDelete' : {// 删除所选(工别)
						click : this.jobDistDelete
					},
					'#productionLineAdd' : {// 添加生产线
						click : this.productionLineAdd
					},
					'#productionLineDelete' : {// 删除所选(生产线)
						click : this.productionLineDelete
					}
				});

	},

	productionLineDelete : function() {
		var view = Ext.getCmp('productionLineEditPanelView');
		var value = view.down('#productionLineValue').getValue();
		var store = Ext.data.StoreManager.lookup('ProductionLineStore');
		var exist = true;
		store.each(function(record) {
					if (record.get('disp') != value) {
						exist = false;
					}
				});
		if (!exist) {
			var progress = Ext.MessageBox.wait('正在删除数据源', '提交', {
						text : '删除中...'
					});
			Ext.Ajax.request({
				url : '/InformationSystemService/info/remove',
				method : 'post',
				params : {
					account : user.account,
					fieldName : "productionLine",
					value : value
				},
				success : function(response) {
					progress.close();
					var result = Ext.JSON.decode(response.responseText);
					if (result.success) {
						Ext.example.msg('恭喜', '删除成功！');
						store.load({
							params : {
								account : user.account,
								fieldName : 'productionLine'
							},
							callback : function(records, opts, success) {
								if (success) {
									view.down('#productionLineValue').reset();
									var list = Ext
											.getCmp('productionLineEditPanelView')
											.down('#productionLineList');
									list.removeAll();
									for (var i = 0; i < records.length; i++) {
										list.add({
													value : (i + 1)
															+ "、"
															+ records[i].data.value
												});
									}
								}
							}
						});
					} else {
						Ext.example.msg('对不起', '删除失败！');
					}
				},
				failure : function(response) {
					progress.close();
					Ext.example.msg('对不起', '删除失败！');
				}
			});
		} else {
			Ext.MessageBox.alert("错误", "请选择来源中存在的数据！");
		}
	},

	productionLineAdd : function() {
		var view = Ext.getCmp('productionLineEditPanelView');
		var value = view.down('#productionLineValue').getValue();
		var store = Ext.data.StoreManager.lookup('ProductionLineStore');
		var exist = false;
		store.each(function(record) {
					if (record.get('disp') == value) {
						exist = true;
					}
				});
		if (!exist) {
			var progress = Ext.MessageBox.wait('正在添加数据源', '提交', {
						text : '添加中...'
					});
			Ext.Ajax.request({
				url : '/InformationSystemService/info/add',
				method : 'post',
				params : {
					account : user.account,
					fieldName : "productionLine",
					value : value
				},
				success : function(response) {
					progress.close();
					var result = Ext.JSON.decode(response.responseText);
					if (result.success) {
						Ext.example.msg('恭喜', '添加成功！');
						store.load({
							params : {
								account : user.account,
								fieldName : 'productionLine'
							},
							callback : function(records, opts, success) {
								if (success) {
									view.down('#productionLineValue').reset();
									var list = Ext
											.getCmp('productionLineEditPanelView')
											.down('#productionLineList');
									list.removeAll();
									for (var i = 0; i < records.length; i++) {
										list.add({
													value : (i + 1)
															+ "、"
															+ records[i].data.value
												});
									}
								}
							}
						});
					} else {
						Ext.example.msg('对不起', '添加失败！');
					}
				},
				failure : function(response) {
					progress.close();
					Ext.example.msg('对不起', '添加失败！');

				}
			});
		} else {
			Ext.MessageBox.alert("错误", "不可重复添加！");
		}
	},
	jobDistDelete : function() {
		var view = Ext.getCmp('jobDistEditPanelView');
		var value = view.down('#jobDistValue').getValue();
		var store = Ext.data.StoreManager.lookup('ProductionLineStore');
		var exist = true;
		store.each(function(record) {
					if (record.get('disp') != value) {
						exist = false;
					}
				});
		if (!exist) {
			var progress = Ext.MessageBox.wait('正在删除数据源', '提交', {
						text : '删除中...'
					});
			Ext.Ajax.request({
				url : '/InformationSystemService/info/remove',
				method : 'post',
				params : {
					account : user.account,
					fieldName : "jobDist",
					value : value
				},
				success : function(response) {
					progress.close();
					var result = Ext.JSON.decode(response.responseText);
					if (result.success) {
						Ext.example.msg('恭喜', '删除成功！');
						store.load({
							params : {
								account : user.account,
								fieldName : 'jobDist'
							},
							callback : function(records, opts, success) {
								if (success) {
									view.down('#jobDistValue').reset();
									var list = Ext
											.getCmp('jobDistEditPanelView')
											.down('#jobDistList');
									list.removeAll();
									for (var i = 0; i < records.length; i++) {
										list.add({
													value : (i + 1)
															+ "、"
															+ records[i].data.value
												});
									}
								}
							}
						});
					} else {
						Ext.example.msg('对不起', '删除失败！');
					}
				},
				failure : function(response) {
					progress.close();
					Ext.example.msg('对不起', '删除失败！');
				}
			});
		} else {
			Ext.MessageBox.alert("错误", "请选择来源中存在的数据！");
		}
	},

	jobDistAdd : function() {
		var view = Ext.getCmp('jobDistEditPanelView');
		var value = view.down('#jobDistValue').getValue();
		var store = Ext.data.StoreManager.lookup('JobDistStore');
		var exist = false;
		store.each(function(record) {
					if (record.get('disp') == value) {
						exist = true;
					}
				});
		if (!exist) {
			var progress = Ext.MessageBox.wait('正在添加数据源', '提交', {
						text : '添加中...'
					});
			Ext.Ajax.request({
				url : '/InformationSystemService/info/add',
				method : 'post',
				params : {
					account : user.account,
					fieldName : "jobDist",
					value : value
				},
				success : function(response) {
					progress.close();
					var result = Ext.JSON.decode(response.responseText);
					if (result.success) {
						Ext.example.msg('恭喜', '添加成功！');
						store.load({
							params : {
								account : user.account,
								fieldName : 'jobDist'
							},
							callback : function(records, opts, success) {
								if (success) {
									view.down('#jobDistValue').reset();
									var list = Ext
											.getCmp('jobDistEditPanelView')
											.down('#jobDistList');
									list.removeAll();
									for (var i = 0; i < records.length; i++) {
										list.add({
													value : (i + 1)
															+ "、"
															+ records[i].data.value
												});
									}
								}
							}
						});
					} else {
						Ext.example.msg('对不起', '添加失败！');
					}
				},
				failure : function(response) {
					progress.close();
					Ext.example.msg('对不起', '添加失败！');

				}
			});
		} else {
			Ext.MessageBox.alert("错误", "不可重复添加！");
		}
	},

	jobTypeDelete : function() {
		var view = Ext.getCmp('jobTypeEditPanelView');
		var value = view.down('#jobTypeValue').getValue();
		var store = Ext.data.StoreManager.lookup('JobTypeStore');
		var exist = true;
		store.each(function(record) {
					if (record.get('disp') != value) {
						exist = false;
					}
				});
		if (!exist) {
			var progress = Ext.MessageBox.wait('正在删除数据源', '提交', {
						text : '删除中...'
					});
			Ext.Ajax.request({
				url : '/InformationSystemService/info/remove',
				method : 'post',
				params : {
					account : user.account,
					fieldName : "jobType",
					value : value
				},
				success : function(response) {
					progress.close();
					var result = Ext.JSON.decode(response.responseText);
					if (result.success) {
						Ext.example.msg('恭喜', '删除成功！');
						store.load({
							params : {
								account : user.account,
								fieldName : 'jobType'
							},
							callback : function(records, opts, success) {
								if (success) {
									view.down('#jobTypeValue').reset();
									var list = Ext
											.getCmp('jobTypeEditPanelView')
											.down('#jobTypeList');
									list.removeAll();
									for (var i = 0; i < records.length; i++) {
										list.add({
													value : (i + 1)
															+ "、"
															+ records[i].data.value
												});
									}
								}
							}
						});
					} else {
						Ext.example.msg('对不起', '删除失败！');
					}
				},
				failure : function(response) {
					progress.close();
					Ext.example.msg('对不起', '删除失败！');
				}
			});
		} else {
			Ext.MessageBox.alert("错误", "请选择来源中存在的数据！");
		}
	},

	jobTypeAdd : function() {
		var view = Ext.getCmp('jobTypeEditPanelView');
		var value = view.down('#jobTypeValue').getValue();
		var store = Ext.data.StoreManager.lookup('JobTypeStore');
		var exist = false;
		store.each(function(record) {
					if (record.get('disp') == value) {
						exist = true;
					}
				});
		if (!exist) {
			var progress = Ext.MessageBox.wait('正在添加数据源', '提交', {
						text : '添加中...'
					});
			Ext.Ajax.request({
				url : '/InformationSystemService/info/add',
				method : 'post',
				params : {
					account : user.account,
					fieldName : "jobType",
					value : value
				},
				success : function(response) {
					progress.close();
					var result = Ext.JSON.decode(response.responseText);
					if (result.success) {
						Ext.example.msg('恭喜', '添加成功！');
						store.load({
							params : {
								account : user.account,
								fieldName : 'jobType'
							},
							callback : function(records, opts, success) {
								if (success) {
									view.down('#jobTypeValue').reset();
									var list = Ext
											.getCmp('jobTypeEditPanelView')
											.down('#jobTypeList');
									list.removeAll();
									for (var i = 0; i < records.length; i++) {
										list.add({
													value : (i + 1)
															+ "、"
															+ records[i].data.value
												});
									}
								}
							}
						});
					} else {
						Ext.example.msg('对不起', '添加失败！');
					}
				},
				failure : function(response) {
					progress.close();
					Ext.example.msg('对不起', '添加失败！');

				}
			});
		} else {
			Ext.MessageBox.alert("错误", "不可重复添加！");
		}
	},
	jobTitleDelete : function() {
		var view = Ext.getCmp('jobTitleEditPanelView');
		var value = view.down('#jobTitleValue').getValue();
		var store = Ext.data.StoreManager.lookup('JobTitleStore');
		var exist = true;
		store.each(function(record) {
					if (record.get('disp') != value) {
						exist = false;
					}
				});
		if (!exist) {
			var progress = Ext.MessageBox.wait('正在删除数据源', '提交', {
						text : '删除中...'
					});
			Ext.Ajax.request({
				url : '/InformationSystemService/info/remove',
				method : 'post',
				params : {
					account : user.account,
					fieldName : "jobTitle",
					value : value
				},
				success : function(response) {
					progress.close();
					var result = Ext.JSON.decode(response.responseText);
					if (result.success) {
						Ext.example.msg('恭喜', '删除成功！');
						store.load({
							params : {
								account : user.account,
								fieldName : 'jobTitle'
							},
							callback : function(records, opts, success) {
								if (success) {
									view.down('#jobTitleValue').reset();
									var list = Ext
											.getCmp('jobTitleEditPanelView')
											.down('#jobTitleList');
									list.removeAll();
									for (var i = 0; i < records.length; i++) {
										list.add({
													value : (i + 1)
															+ "、"
															+ records[i].data.value
												});
									}
								}
							}
						});
					} else {
						Ext.example.msg('对不起', '删除失败！');
					}
				},
				failure : function(response) {
					progress.close();
					Ext.example.msg('对不起', '删除失败！');
				}
			});
		} else {
			Ext.MessageBox.alert("错误", "请选择来源中存在的数据！");
		}
	},

	jobTitleAdd : function() {
		var view = Ext.getCmp('jobTitleEditPanelView');
		var value = view.down('#jobTitleValue').getValue();
		var store = Ext.data.StoreManager.lookup('JobTitleStore');
		var exist = false;
		store.each(function(record) {
					if (record.get('disp') == value) {
						exist = true;
					}
				});
		if (!exist) {
			var progress = Ext.MessageBox.wait('正在添加数据源', '提交', {
						text : '添加中...'
					});
			Ext.Ajax.request({
				url : '/InformationSystemService/info/add',
				method : 'post',
				params : {
					account : user.account,
					fieldName : "jobTitle",
					value : value
				},
				success : function(response) {
					progress.close();
					var result = Ext.JSON.decode(response.responseText);
					if (result.success) {
						Ext.example.msg('恭喜', '添加成功！');
						store.load({
							params : {
								account : user.account,
								fieldName : 'jobTitle'
							},
							callback : function(records, opts, success) {
								if (success) {
									view.down('#jobTitleValue').reset();
									var list = Ext
											.getCmp('jobTitleEditPanelView')
											.down('#jobTitleList');
									list.removeAll();
									for (var i = 0; i < records.length; i++) {
										list.add({
													value : (i + 1)
															+ "、"
															+ records[i].data.value
												});
									}
								}
							}
						});
					} else {
						Ext.example.msg('对不起', '添加失败！');
					}
				},
				failure : function(response) {
					progress.close();
					Ext.example.msg('对不起', '添加失败！');

				}
			});
		} else {
			Ext.MessageBox.alert("错误", "不可重复添加！");
		}
	},
	dutyDelete : function() {
		var view = Ext.getCmp('dutyEditPanelView');
		var value = view.down('#dutyValue').getValue();
		var store = Ext.data.StoreManager.lookup('DutyStore');
		var exist = true;
		store.each(function(record) {
					if (record.get('disp') != value) {
						exist = false;
					}
				});
		if (!exist) {
			var progress = Ext.MessageBox.wait('正在删除数据源', '提交', {
						text : '删除中...'
					});
			Ext.Ajax.request({
				url : '/InformationSystemService/info/remove',
				method : 'post',
				params : {
					account : user.account,
					fieldName : "duty",
					value : value
				},
				success : function(response) {
					progress.close();
					var result = Ext.JSON.decode(response.responseText);
					if (result.success) {
						Ext.example.msg('恭喜', '删除成功！');
						store.load({
							params : {
								account : user.account,
								fieldName : 'duty'
							},
							callback : function(records, opts, success) {
								if (success) {
									view.down('#dutyValue').reset();
									var list = Ext.getCmp('dutyEditPanelView')
											.down('#dutyList');
									list.removeAll();
									for (var i = 0; i < records.length; i++) {
										list.add({
													value : (i + 1)
															+ "、"
															+ records[i].data.value
												});
									}
								}
							}
						});
					} else {
						Ext.example.msg('对不起', '删除失败！');
					}
				},
				failure : function(response) {
					progress.close();
					Ext.example.msg('对不起', '删除失败！');
				}
			});
		} else {
			Ext.MessageBox.alert("错误", "请选择来源中存在的数据！");
		}
	},

	dutyAdd : function() {
		var view = Ext.getCmp('dutyEditPanelView');
		var value = view.down('#dutyValue').getValue();
		var store = Ext.data.StoreManager.lookup('DutyStore');
		var exist = false;
		store.each(function(record) {
					if (record.get('disp') == value) {
						exist = true;
					}
				});
		if (!exist) {
			var progress = Ext.MessageBox.wait('正在添加数据源', '提交', {
						text : '添加中...'
					});
			Ext.Ajax.request({
				url : '/InformationSystemService/info/add',
				method : 'post',
				params : {
					account : user.account,
					fieldName : "duty",
					value : value
				},
				success : function(response) {
					progress.close();
					var result = Ext.JSON.decode(response.responseText);
					if (result.success) {
						Ext.example.msg('恭喜', '添加成功！');
						store.load({
							params : {
								account : user.account,
								fieldName : 'duty'
							},
							callback : function(records, opts, success) {
								if (success) {
									view.down('#dutyValue').reset();
									var list = Ext.getCmp('dutyEditPanelView')
											.down('#dutyList');
									list.removeAll();
									for (var i = 0; i < records.length; i++) {
										list.add({
													value : (i + 1)
															+ "、"
															+ records[i].data.value
												});
									}
								}
							}
						});
					} else {
						Ext.example.msg('对不起', '添加失败！');
					}
				},
				failure : function(response) {
					progress.close();
					Ext.example.msg('对不起', '添加失败！');

				}
			});
		} else {
			Ext.MessageBox.alert("错误", "不可重复添加！");
		}
	},
	sourceDelete : function() {
		var view = Ext.getCmp('sourceEditPanelView');
		var value = view.down('#sourceValue').getValue();
		var store = Ext.data.StoreManager.lookup('SourceStore');
		var exist = true;
		store.each(function(record) {
					if (record.get('disp') != value) {
						exist = false;
					}
				});
		if (!exist) {
			var progress = Ext.MessageBox.wait('正在删除数据源', '提交', {
						text : '删除中...'
					});
			Ext.Ajax.request({
				url : '/InformationSystemService/info/remove',
				method : 'post',
				params : {
					account : user.account,
					fieldName : "source",
					value : value
				},
				success : function(response) {
					progress.close();
					var result = Ext.JSON.decode(response.responseText);
					if (result.success) {
						Ext.example.msg('恭喜', '删除成功！');
						store.load({
							params : {
								account : user.account,
								fieldName : 'source'
							},
							callback : function(records, opts, success) {
								if (success) {
									view.down('#sourceValue').reset();
									var list = Ext
											.getCmp('sourceEditPanelView')
											.down('#sourceList');
									list.removeAll();
									for (var i = 0; i < records.length; i++) {
										list.add({
													value : (i + 1)
															+ "、"
															+ records[i].data.value
												});
									}
								}
							}
						});
					} else {
						Ext.example.msg('对不起', '删除失败！');
					}
				},
				failure : function(response) {
					progress.close();
					Ext.example.msg('对不起', '删除失败！');
				}
			});
		} else {
			Ext.MessageBox.alert("错误", "请选择来源中存在的数据！");
		}
	},

	sourceAdd : function() {
		var view = Ext.getCmp('sourceEditPanelView');
		var value = view.down('#sourceValue').getValue();
		var store = Ext.data.StoreManager.lookup('SourceStore');
		var exist = false;
		store.each(function(record) {
					if (record.get('disp') == value) {
						exist = true;
					}
				});
		if (!exist) {
			var progress = Ext.MessageBox.wait('正在添加数据源', '提交', {
						text : '添加中...'
					});
			Ext.Ajax.request({
				url : '/InformationSystemService/info/add',
				method : 'post',
				params : {
					account : user.account,
					fieldName : "source",
					value : value
				},
				success : function(response) {
					progress.close();
					var result = Ext.JSON.decode(response.responseText);
					if (result.success) {
						Ext.example.msg('恭喜', '添加成功！');
						store.load({
							params : {
								account : user.account,
								fieldName : 'source'
							},
							callback : function(records, opts, success) {
								if (success) {
									view.down('#sourceValue').reset();
									var list = Ext
											.getCmp('sourceEditPanelView')
											.down('#sourceList');
									list.removeAll();
									for (var i = 0; i < records.length; i++) {
										list.add({
													value : (i + 1)
															+ "、"
															+ records[i].data.value
												});
									}
								}
							}
						});
					} else {
						Ext.example.msg('对不起', '添加失败！');
					}
				},
				failure : function(response) {
					progress.close();
					Ext.example.msg('对不起', '添加失败！');

				}
			});
		} else {
			Ext.MessageBox.alert("错误", "不可重复添加！");
		}
	}

});
