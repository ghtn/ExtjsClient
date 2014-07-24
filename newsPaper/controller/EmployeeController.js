/**
 * 试题库controller
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:28
 * To change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.controller.EmployeeController', {
    extend: 'Ext.app.Controller',
    views: ['EmployeeBaseContainer', 'EmployeeGridContainer', 'EmployeeGridView', 'EmployeeBankWindowView', 'EmployeeEditWindowView', 'EmployeeImportWindowView'],
    stores: [ 'EmployeeGridStore', 'SexStore', 'BloodStore', 'CountryStore', 'DeptStore'],
    models: [ 'EmployeeGridModel', 'SexModel', 'BloodModel', 'CountryModel', 'DeptModel'],

    init: function () {
        this.control({
            '#filterEmployee': { // 过滤
                click: this.filterEmployee
            },
            '#addEmployee': {	// 添加
                click: this.addEmployee
            },
            '#removeEmployee': {	// 删除(支持批量删除)
                click: this.removeEmployee
            },
            '#importEmployee': {	// 导入
                click: this.importEmployee
            },
            'employeeGridView': {// 编辑
                itemdblclick: this.showEmployeeEditWindow,
                render: this.employeeGridRender
            },
            '#employeeBankFormReset': {// 重置
                click: this.employeeBankFormReset
            },
            '#employeeBankFormSubmit': {// 提交添加
                click: this.employeeBankFormSubmit
            },
            '#employeeEditFormSubmit': {// 提交修改
                click: this.employeeEditFormSubmit
            },
            '#employeeFileField': {// 上传文件
                change: this.employeeFileField
            },
            '#startImportEmployees': {// 导入
                click: this.startImportEmployees
            }
        })
    },

    filterEmployee: function () {
        var grid = Ext.getCmp('employeeGridView');
        var startDate = grid.down('#startDate').getValue();
        var endDate = grid.down('#endDate').getValue();
//        alert(startDate);
        startDate = Ext.util.Format.date(startDate, 'Y-m-d');
//        alert(startDate);
        endDate = Ext.util.Format.date(endDate, 'Y-m-d');

//        var status = grid.down('#statusCombo').getValue();
//        if (status == null) {
//            status = -1;
//        }

        var store = Ext.data.StoreManager.lookup('EmployeeGridStore');
//        store.load({
//            params: {
//                startDate: startDate,
//                endDate: endDate
//            }
//        });
        store.loadPage(1);
    },

    addEmployee: function () {
        Ext.create('NewsPaper.view.EmployeeBankWindowView').show();
    },

    removeEmployee: function () {
        var grid = Ext.getCmp('employeeGridView');

        var record = grid.getSelectionModel().getSelection()[0];
        if (record) {	
	        var ids = record.data.id;
	        for(var i = 1; i < grid.getSelectionModel().getSelection().length; i++){
		        var rec = grid.getSelectionModel().getSelection()[i];
	        	ids += "#" + rec.data.id;
	        }
//			alert(ids);
            Ext.MessageBox.confirm('确认删除', '确认删除所选择的人员?', function (btn) {
                if (btn == 'yes') {
                	var employeeGridStore = Ext.data.StoreManager.lookup('EmployeeGridStore');
                    var progress = Ext.MessageBox.wait('正在删除所选择的人员', '提交', {
                        text: '删除中...'
                    });
                    Ext.Ajax.request({
                        url: '/InformationSystemService/employee/remove',
                        method: 'post',
                        params: {
                            ids: ids
                        },
                        success: function (response) {
                            progress.close();
                            var result = Ext.JSON.decode(response.responseText);
                            if (result.success) {
                                Ext.example.msg('删除成功', result.msg);
                            } else {
                                Ext.MessageBox.alert('删除失败', result.msg);
                            }
                            employeeGridStore.reload();
                        },
                        failure: function (response) {
                            progress.close();
                            var result = Ext.JSON.decode(response.responseText);
                            Ext.MessageBox.alert('删除失败', result.msg);
                        }
                    });
                }
            })
        } else {
            Ext.MessageBox.alert('错误', '请选择一条记录！');
        }
    },
    
    importEmployee: function () {
	    Ext.create('NewsPaper.view.EmployeeImportWindowView').show();
    },

    showEmployeeEditWindow: function (view, record) {
    	var window = Ext.create('NewsPaper.view.EmployeeEditWindowView').show();
        window.down('form').loadRecord(record);
    },

    employeeBankFormReset: function () {
        Ext.getCmp('employeeBankWindowView').down('#employeeBankForm').getForm().reset();
    },

    employeeBankFormSubmit: function () {
        var window = Ext.getCmp('employeeBankWindowView');
        var form = window.down('#employeeBankForm').getForm();
        if (form.isValid()) {// 这个是多余的，不过可以防止意外
            Ext.MessageBox.confirm('确认添加', '确认添加人员?', function (btn) {
                if (btn == 'yes') {
                	
                	// 检测是否为空
                	var armTime = window.down("#armTime");
                	var birthday = window.down("#birthday");
                	var workTime = window.down("#workTime");
                	var unitTime = window.down("#unitTime");
                	var dutyTime = window.down("#dutyTime");
                	var jobTitleTime = window.down("#jobTitleTime");
                	var jobTypeTime = window.down("#jobTypeTime");
                	var graduateTime = window.down("#graduateTime");
                	var endArmTime = window.down("#endArmTime");
                	var conversionTime = window.down("#conversionTime");
                	var cardBirthday = window.down("#cardBirthday");
                	if( armTime.value == null){
	                	armTime.name = "";
                	}
                	if( birthday.value == null){
	                	birthday.name = "";
                	}
                	if( workTime.value == null){
	                	workTime.name = "";
                	}
                	if( unitTime.value == null){
	                	unitTime.name = "";
                	}
                	if( dutyTime.value == null){
	                	dutyTime.name = "";
                	}
                	if( jobTitleTime.value == null){
	                	jobTitleTime.name = "";
                	}
                	if( jobTypeTime.value == null){
	                	jobTypeTime.name = "";
                	}
                	if( graduateTime.value == null){
	                	graduateTime.name = "";
                	}
                	if( endArmTime.value == null){
	                	endArmTime.name = "";
                	}
                	if( conversionTime.value == null){
	                	conversionTime.name = "";
                	}
                	if( cardBirthday.value == null){
	                	cardBirthday.name = "";
                	}
                	
                	var employeeGridStore = Ext.data.StoreManager.lookup('EmployeeGridStore');
                    form.submit({
                        waitMsg: '正在添加人员...',
                        success: function (form, action) {
                            Ext.example.msg('增加成功', action.result.msg);
                            window.close();
                            employeeGridStore.reload();
                        },
                        failure: function (form, action) {
                            Ext.MessageBox.alert('增加失败', action.result.msg);
                            window.close();
                        }
                    });
                }
            });
        }
    },

    employeeGridRender: function (grid) {
        var store = grid.getStore();

        store.on('beforeload', function () {
            var startDate = grid.down('#startDate').getValue();
            var endDate = grid.down('#endDate').getValue();
            startDate = Ext.util.Format.date(startDate, 'Y-m-d');
            endDate = Ext.util.Format.date(endDate, 'Y-m-d');

//            var status = grid.down('#statusCombo').getValue();
//            if (status == null) {
//                status = -1;
//            }

            var typeParam = {
                startDate: startDate,
                endDate: endDate
            };
            Ext.apply(store.proxy.extraParams, typeParam);
        })
        
//        store.on('load', function () {
//        	alert("load");
//        })
    },
    
    employeeEditFormSubmit:function(){
    	var window = Ext.getCmp('employeeEditWindowView');
        var form = window.down('#employeeEditForm').getForm();
        var employeeGridStore = Ext.data.StoreManager.lookup('EmployeeGridStore');
    	var armTime = window.down("#armTime");
        if (form.isValid()) {// 这个是多余的，不过可以防止意外
            Ext.MessageBox.confirm('确认修改', '确认修改信息?', function (btn) {
                if (btn == 'yes') {
                	// 检测是否为空
                	var armTime = window.down("#armTime");
                	var birthday = window.down("#birthday");
                	var workTime = window.down("#workTime");
                	var unitTime = window.down("#unitTime");
                	var dutyTime = window.down("#dutyTime");
                	var jobTitleTime = window.down("#jobTitleTime");
                	var jobTypeTime = window.down("#jobTypeTime");
                	var graduateTime = window.down("#graduateTime");
                	var endArmTime = window.down("#endArmTime");
                	var conversionTime = window.down("#conversionTime");
                	var cardBirthday = window.down("#cardBirthday");
                	if( armTime.value == null){
	                	armTime.name = "";
                	}
                	if( birthday.value == null){
	                	birthday.name = "";
                	}
                	if( workTime.value == null){
	                	workTime.name = "";
                	}
                	if( unitTime.value == null){
	                	unitTime.name = "";
                	}
                	if( dutyTime.value == null){
	                	dutyTime.name = "";
                	}
                	if( jobTitleTime.value == null){
	                	jobTitleTime.name = "";
                	}
                	if( jobTypeTime.value == null){
	                	jobTypeTime.name = "";
                	}
                	if( graduateTime.value == null){
	                	graduateTime.name = "";
                	}
                	if( endArmTime.value == null){
	                	endArmTime.name = "";
                	}
                	if( conversionTime.value == null){
	                	conversionTime.name = "";
                	}
                	if( cardBirthday.value == null){
	                	cardBirthday.name = "";
                	}
                    form.submit({
                        waitMsg: '正在修改信息...',
                        success: function (form, action) {
                            Ext.example.msg('修改成功', action.result.msg);
                            window.close();
                            employeeGridStore.reload();
                        },
                        failure: function (form, action) {
                            Ext.MessageBox.alert('修改失败', action.result.msg);
                            window.close();
                        }
                    });
                }
            });
        }
    },
    
    
    employeeFileField: function (field, value) {
    	
        if (value == '' || value == undefined || value == 'null' || value == null) {
            Ext.MessageBox.alert('错误', '请选择模板文件！');
            return;
        }

        // 文件扩展名
        var fileExtension = value.substr(value.lastIndexOf('.') + 1);
        
        Ext.MessageBox.alert("fileExtension", fileExtension);

        if (fileExtension.toLowerCase() != "xls" && fileExtension.toLowerCase() != "xlsx") {
            Ext.MessageBox.alert('错误', '文件格式不正确, 必须为excel文件！');
            return;
        }

        var form = Ext.getCmp('employeeImportWindowView').down('#employeeImportForm').getForm();

        form.submit({
            waitMsg: '上传数据文件中...',
            success: function (form, action) {
                Ext.example.msg('上传成功', action.result.msg);
                var button = Ext.getCmp('employeeImportWindowView').down('#startImportEmployees');
                button.setDisabled(false);
            },
            failure: function (form, action) {
                Ext.MessageBox.alert('上传失败', action.result.msg);
            }
        });
    },

    startImportEmployees: function () {
        var window = Ext.getCmp('employeeImportWindowView');

        var progress = Ext.MessageBox.wait('正在导入员工', '导入', {
            text: '导入中...'
        });

        Ext.Ajax.request({
            url: '/InformationSystemService/employee/importEmployees',
            method: 'post',
            success: function (response) {
                progress.close();
                window.close();
                var result = Ext.JSON.decode(response.responseText);
                if (result.success) {
                    Ext.example.msg('导入成功', result.msg);
                    var gridStore = Ext.data.StoreManager.lookup('EmployeeGridStore');
                    gridStore.reload();
                } else {
                    Ext.MessageBox.alert('导入失败', result.msg)
                }
            },
            failure: function (response) {
                progress.close();
                window.close();
                var result = Ext.JSON.decode(response.responseText);
                Ext.MessageBox.alert('导入失败', result.msg)
            }
        });
    }

});




