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
    stores: [ 'EmployeeGridStore', 'SexStore', 'BloodStore', 'CountryStore', 'DeptStore', 'DeptIdStore', 'PostStateStore', 'FilterEmployeeStore'],
    models: [ 'EmployeeGridModel', 'SexModel', 'BloodModel', 'CountryModel', 'DeptModel', 'DeptIdModel', 'PostStateModel', 'FilterEmployeeModel'],

    init: function () {
        this.control({
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
            '#employeeBankFormReset': {// 重置表单
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
            '#startImportEmployees': {// 导入Excel
                click: this.startImportEmployees
            },
            '#downloadEmployeeTemplate': {// 下载导入模板
                click: this.downloadEmployeeTemplate
            },
            '#filterQueryEmployee':{	// 条件查询
            	click: this.filterQueryEmployee
            },
            '#resetFilterQueryEmployee':{	// 清空查询条件
            	click: this.resetFilterQueryEmployee
            },
            '#employeeBankDeptName':{	// 自动选择相应的部门号
            	change: this.employeeBankDeptName
            },
            '#employeeBankDeptId':{	// 自动选择相应的部门
            	change: this.employeeBankDeptId
            },
            '#employeeEditDeptName':{	// 自动选择相应的部门号
            	change: this.employeeEditDeptName
            },
            '#employeeEditDeptId':{	// 自动选择相应的部门
            	change: this.employeeEditDeptId
            },
            '#employeeBankCard':{	// 根据身份证自动填写身份证出身日期
            	change: this.employeeBankCard
            },
            '#employeeEditCard':{	// 根据身份证自动填写身份证出身日期
            	change: this.employeeEditCard
            },
            '#exportEmployee':{	// 导出
            	click: this.exportEmployee
            }
        })
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
                        	userName:Ext.util.Cookies.get("userName"),
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
                	var armTime = window.down("#armTimeBank");
                	var birthday = window.down("#birthdayBank");
                	var workTime = window.down("#workTimeBank");
                	var unitTime = window.down("#unitTimeBank");
                	var dutyTime = window.down("#dutyTimeBank");
                	var jobTitleTime = window.down("#jobTitleTimeBank");
                	var jobTypeTime = window.down("#jobTypeTimeBank");
                	var graduateTime = window.down("#graduateTimeBank");
                	var endArmTime = window.down("#endArmTimeBank");
                	var conversionTime = window.down("#conversionTimeBank");
                	var cardBirthday = window.down("#employeeBankCardBirthday");
                	
                	var postSalary = window.down("#postSalaryBank");
                	var skillSalary = window.down("#skillSalaryBank");
                	var skillGrage = window.down("#skillGrageBank");
                	
                	
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
                	if( postSalary.value == null){
	                	postSalary.name = "";
                	}
                	if( skillSalary.value == null){
	                	skillSalary.name = "";
                	}
                	if( skillGrage.value == null){
	                	skillGrage.name = "";
                	}
                	
                	var employeeGridStore = Ext.data.StoreManager.lookup('EmployeeGridStore');
                    form.submit({
                        waitMsg: '正在添加人员...',
                        params:{
                        	userName:Ext.util.Cookies.get("userName")
                        },
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
        store.on('beforeload', function(){
	        var queryCondition = grid.down('#filterQueryEmployeeCondition')
	        var queryValue = grid.down('#filterQueryEmployeeValue')
			if( queryCondition != null ){
	    	    queryCondition = queryCondition.getValue();
			}
			if( queryValue != null ){
	    	    queryValue = queryValue.getValue();
			}
	        var typeParam = {
	        	userName:Ext.util.Cookies.get("userName"),
	            queryCondition: queryCondition,
	            queryValue: queryValue,
	            postState:"在职"
	        };
	        Ext.apply(store.proxy.extraParams, typeParam);
        });
    },
    
    employeeEditFormSubmit:function(){
    	var window = Ext.getCmp('employeeEditWindowView');
        var form = window.down('#employeeEditForm').getForm();
        var employeeGridStore = Ext.data.StoreManager.lookup('EmployeeGridStore');
        if (form.isValid()) {// 这个是多余的，不过可以防止意外
            Ext.MessageBox.confirm('确认修改', '确认修改信息?', function (btn) {
                if (btn == 'yes') {
                	// 检测是否为空
                	var armTime = window.down("#armTimeEdit");
                	var birthday = window.down("#birthdayEdit");
                	var workTime = window.down("#workTimeEdit");
                	var unitTime = window.down("#unitTimeEdit");
                	var dutyTime = window.down("#dutyTimeEdit");
                	var jobTitleTime = window.down("#jobTitleTimeEdit");
                	var jobTypeTime = window.down("#jobTypeTimeEdit");
                	var graduateTime = window.down("#graduateTimeEdit");
                	var endArmTime = window.down("#endArmTimeEdit");
                	var conversionTime = window.down("#conversionTimeEdit");
                	var cardBirthday = window.down("#employeeEditCardBirthday");
                	
                	var postSalary = window.down("#postSalaryEdit");
                	var skillSalary = window.down("#skillSalaryEdit");
                	var skillGrage = window.down("#skillGrageEdit");
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
                	if( postSalary.value == null){
	                	postSalary.name = "";
                	}
                	if( skillSalary.value == null){
	                	skillSalary.name = "";
                	}
                	if( skillGrage.value == null){
	                	skillGrage.name = "";
                	}
                    form.submit({
                        waitMsg: '正在修改信息...',
                        submitEmptyText:false,
                        params:{
                    	    userName:Ext.util.Cookies.get("userName")
                        },
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
            params:{
            	userName:Ext.util.Cookies.get("userName")
            },
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
            params:{
            	userName:Ext.util.Cookies.get("userName")
            },
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
    },
    
    downloadEmployeeTemplate: function () {
        window.open('/InformationSystemService/employee/downloadTemplate?fileName=员工模板.xls&userName='+Ext.util.Cookies.get("userName"));
    },
    
    filterQueryEmployee:function(){
		Ext.getCmp('employeeGridView').getStore().loadPage(1);
    },
    resetFilterQueryEmployee:function(){
		var grid = Ext.getCmp('employeeGridView');
        grid.down('#filterQueryEmployeeCondition').reset();
        grid.down('#filterQueryEmployeeValue').reset();
    },
    employeeBankDeptName:function(){
    	var grid = Ext.getCmp('employeeBankWindowView');
        var deptName = grid.down('#employeeBankDeptName').getValue();
        var deptId = grid.down('#employeeBankDeptId');
        switch(deptName){
        	case '101队':
        		deptId.setValue('1001');
        		break;
        	case '201队':
        		deptId.setValue('1002');
        		break;
        	case '202队':
        		deptId.setValue('1003');
        		break;
        	case '203队':
        		deptId.setValue('1004');
        		break;
        	case '204队':
        		deptId.setValue('1005');
        		break;
        	case '综采队':
        		deptId.setValue('1006');
        		break;
        	case '安装队':
        		deptId.setValue('1007');
        		break;
        	case '救护队':
        		deptId.setValue('1008');
        		break;
        	case '维修队':
        		deptId.setValue('1009');
        		break;
        	case '机运队':
        		deptId.setValue('1010');
        		break;
        	case '辅运队':
        		deptId.setValue('1011');
        		break;
        	case '水电队':
        		deptId.setValue('1012');
        		break;
        	case '调度指挥中心':
        		deptId.setValue('1013');
        		break;
        	case '安全管理部':
        		deptId.setValue('1014');
        		break;
        	case '通风科':
        		deptId.setValue('1015');
        		break;
        	case '机运科':
        		deptId.setValue('1016');
        		break;
        	case '地测科':
        		deptId.setValue('1017');
        		break;
        	case '探水队':
        		deptId.setValue('1018');
        		break;
        	case '生产技术科':
        		deptId.setValue('1019');
        		break;
        	case '销售科':
        		deptId.setValue('1020');
        		break;
        	case '机修厂':
        		deptId.setValue('1021');
        		break;
        	case '公司办':
        		deptId.setValue('1022');
        		break;
        	case '企业管理部':
        		deptId.setValue('1023');
        		break;
        	case '人力资源部':
        		deptId.setValue('1024');
        		break;
        	case '计划财务部':
        		deptId.setValue('1025');
        		break;
        	case '党委工作部':
        		deptId.setValue('1026');
        		break;
        	case '武装保卫部':
        		deptId.setValue('1027');
        		break;
        	case '工会':
        		deptId.setValue('1028');
        		break;
        	case '供应科':
        		deptId.setValue('1029');
        		break;
        	case '计能科':
        		deptId.setValue('1030');
        		break;
        	case '房产科':
        		deptId.setValue('1031');
        		break;
        	case '职防环保部':
        		deptId.setValue('1032');
        		break;
        }
    },
    employeeBankDeptId:function(){
    	var grid = Ext.getCmp('employeeBankWindowView');
        var deptId = grid.down('#employeeBankDeptId').getValue();
        var deptName = grid.down('#employeeBankDeptName');
        switch(deptId){
        	case '1001':
        		deptName.setValue('101队');
        		break;
        	case '1002':
        		deptName.setValue('201队');
        		break;
        	case '1003':
        		deptName.setValue('202队');
        		break;
        	case '1004':
        		deptName.setValue('203队');
        		break;
        	case '1005':
        		deptName.setValue('204队');
        		break;
        	case '1006':
        		deptName.setValue('综采队');
        		break;
        	case '1007':
        		deptName.setValue('安装队');
        		break;
        	case '1008':
        		deptName.setValue('救护队');
        		break;
        	case '1009':
        		deptName.setValue('维修队');
        		break;
        	case '1010':
        		deptName.setValue('机运队');
        		break;
        	case '1011':
        		deptName.setValue('辅运队');
        		break;
        	case '1012':
        		deptName.setValue('水电队');
        		break;
        	case '1013':
        		deptName.setValue('调度指挥中心');
        		break;
        	case '1014':
        		deptName.setValue('安全管理部');
        		break;
        	case '1015':
        		deptName.setValue('通风科');
        		break;
        	case '1016':
        		deptName.setValue('机运科');
        		break;
        	case '1017':
        		deptName.setValue('地测科');
        		break;
        	case '1018':
        		deptName.setValue('探水队');
        		break;
        	case '1019':
        		deptName.setValue('生产技术科');
        		break;
        	case '1020':
        		deptName.setValue('销售科');
        		break;
        	case '1021':
        		deptName.setValue('机修厂');
        		break;
        	case '1022':
        		deptName.setValue('公司办');
        		break;
        	case '1023':
        		deptName.setValue('企业管理部');
        		break;
        	case '1024':
        		deptName.setValue('人力资源部');
        		break;
        	case '1025':
        		deptName.setValue('计划财务部');
        		break;
        	case '1026':
        		deptName.setValue('党委工作部');
        		break;
        	case '1027':
        		deptName.setValue('武装保卫部');
        		break;
        	case '1028':
        		deptName.setValue('工会');
        		break;
        	case '1029':
        		deptName.setValue('供应科');
        		break;
        	case '1030':
        		deptName.setValue('计能科');
        		break;
        	case '1031':
        		deptName.setValue('房产科');
        		break;
        	case '1032':
        		deptName.setValue('职防环保部');
        		break;
        }
    },
    employeeEditDeptName:function(){
    	var grid = Ext.getCmp('employeeEditWindowView');
        var deptName = grid.down('#employeeEditDeptName').getValue();
        var deptId = grid.down('#employeeEditDeptId');
        switch(deptName){
        	case '101队':
        		deptId.setValue('1001');
        		break;
        	case '201队':
        		deptId.setValue('1002');
        		break;
        	case '202队':
        		deptId.setValue('1003');
        		break;
        	case '203队':
        		deptId.setValue('1004');
        		break;
        	case '204队':
        		deptId.setValue('1005');
        		break;
        	case '综采队':
        		deptId.setValue('1006');
        		break;
        	case '安装队':
        		deptId.setValue('1007');
        		break;
        	case '救护队':
        		deptId.setValue('1008');
        		break;
        	case '维修队':
        		deptId.setValue('1009');
        		break;
        	case '机运队':
        		deptId.setValue('1010');
        		break;
        	case '辅运队':
        		deptId.setValue('1011');
        		break;
        	case '水电队':
        		deptId.setValue('1012');
        		break;
        	case '调度指挥中心':
        		deptId.setValue('1013');
        		break;
        	case '安全管理部':
        		deptId.setValue('1014');
        		break;
        	case '通风科':
        		deptId.setValue('1015');
        		break;
        	case '机运科':
        		deptId.setValue('1016');
        		break;
        	case '地测科':
        		deptId.setValue('1017');
        		break;
        	case '探水队':
        		deptId.setValue('1018');
        		break;
        	case '生产技术科':
        		deptId.setValue('1019');
        		break;
        	case '销售科':
        		deptId.setValue('1020');
        		break;
        	case '机修厂':
        		deptId.setValue('1021');
        		break;
        	case '公司办':
        		deptId.setValue('1022');
        		break;
        	case '企业管理部':
        		deptId.setValue('1023');
        		break;
        	case '人力资源部':
        		deptId.setValue('1024');
        		break;
        	case '计划财务部':
        		deptId.setValue('1025');
        		break;
        	case '党委工作部':
        		deptId.setValue('1026');
        		break;
        	case '武装保卫部':
        		deptId.setValue('1027');
        		break;
        	case '工会':
        		deptId.setValue('1028');
        		break;
        	case '供应科':
        		deptId.setValue('1029');
        		break;
        	case '计能科':
        		deptId.setValue('1030');
        		break;
        	case '房产科':
        		deptId.setValue('1031');
        		break;
        	case '职防环保部':
        		deptId.setValue('1032');
        		break;
        }
    },
    employeeEditDeptId:function(){
    	var grid = Ext.getCmp('employeeEditWindowView');
        var deptId = grid.down('#employeeEditDeptId').getValue();
        var deptName = grid.down('#employeeEditDeptName');
        switch(deptId){
        	case '1001':
        		deptName.setValue('101队');
        		break;
        	case '1002':
        		deptName.setValue('201队');
        		break;
        	case '1003':
        		deptName.setValue('202队');
        		break;
        	case '1004':
        		deptName.setValue('203队');
        		break;
        	case '1005':
        		deptName.setValue('204队');
        		break;
        	case '1006':
        		deptName.setValue('综采队');
        		break;
        	case '1007':
        		deptName.setValue('安装队');
        		break;
        	case '1008':
        		deptName.setValue('救护队');
        		break;
        	case '1009':
        		deptName.setValue('维修队');
        		break;
        	case '1010':
        		deptName.setValue('机运队');
        		break;
        	case '1011':
        		deptName.setValue('辅运队');
        		break;
        	case '1012':
        		deptName.setValue('水电队');
        		break;
        	case '1013':
        		deptName.setValue('调度指挥中心');
        		break;
        	case '1014':
        		deptName.setValue('安全管理部');
        		break;
        	case '1015':
        		deptName.setValue('通风科');
        		break;
        	case '1016':
        		deptName.setValue('机运科');
        		break;
        	case '1017':
        		deptName.setValue('地测科');
        		break;
        	case '1018':
        		deptName.setValue('探水队');
        		break;
        	case '1019':
        		deptName.setValue('生产技术科');
        		break;
        	case '1020':
        		deptName.setValue('销售科');
        		break;
        	case '1021':
        		deptName.setValue('机修厂');
        		break;
        	case '1022':
        		deptName.setValue('公司办');
        		break;
        	case '1023':
        		deptName.setValue('企业管理部');
        		break;
        	case '1024':
        		deptName.setValue('人力资源部');
        		break;
        	case '1025':
        		deptName.setValue('计划财务部');
        		break;
        	case '1026':
        		deptName.setValue('党委工作部');
        		break;
        	case '1027':
        		deptName.setValue('武装保卫部');
        		break;
        	case '1028':
        		deptName.setValue('工会');
        		break;
        	case '1029':
        		deptName.setValue('供应科');
        		break;
        	case '1030':
        		deptName.setValue('计能科');
        		break;
        	case '1031':
        		deptName.setValue('房产科');
        		break;
        	case '1032':
        		deptName.setValue('职防环保部');
        		break;
        }
    },
    
    employeeBankCard:function(){
    	var grid = Ext.getCmp('employeeBankWindowView');
        var card = grid.down('#employeeBankCard');
        var cardBirthday = grid.down('#employeeBankCardBirthday');
        if( card.isValid()){
        	card = card.getValue();
        	var year, month, day;
			if( card.length == 15){
				year = "19" + Ext.util.Format.substr(card, 6, 2);
				month = Ext.util.Format.substr(card, 8, 2);
				day = Ext.util.Format.substr(card, 10, 2);
			}else if(card.length == 18){
				year = Ext.util.Format.substr(card, 6, 4);
				month = Ext.util.Format.substr(card, 10, 2);
				day = Ext.util.Format.substr(card, 12, 2);
			}
			cardBirthday.setValue(year + "-" + month + "-" + day);
        }
    },
    employeeEditCard:function(){
    	var grid = Ext.getCmp('employeeEditWindowView');
        var card = grid.down('#employeeEditCard');
        var cardBirthday = grid.down('#employeeEditCardBirthday');
        if( card.isValid()){
        	card = card.getValue();
        	var year, month, day;
			if( card.length == 15){
				year = "19" + Ext.util.Format.substr(card, 6, 2);
				month = Ext.util.Format.substr(card, 8, 2);
				day = Ext.util.Format.substr(card, 10, 2);
			}else if(card.length == 18){
				year = Ext.util.Format.substr(card, 6, 4);
				month = Ext.util.Format.substr(card, 10, 2);
				day = Ext.util.Format.substr(card, 12, 2);
			}
			cardBirthday.setValue(year + "-" + month + "-" + day);
        }
    },
    exportEmployee:function(){
    	Ext.MessageBox.confirm('确认导出', '确认导出信息?', function (btn) {
            if (btn == 'yes') {
		        var grid = Ext.getCmp('employeeGridView');
		        var store = grid.getStore();
		        if(store.getCount() == 0){
		        	Ext.MessageBox.alert("提示", "该页没有任何人员！");
		        	return;
		        }
		        var ids = store.getAt(0).data.id;
		        for( var i = 1; i < store.getCount(); i++){
		        	ids += "_";
		        	ids += store.getAt(i).data.id;
		        }
		        window.open('/InformationSystemService/employee/exportEmployee?ids='+ids+"&userName="+Ext.util.Cookies.get("userName"));
            }
		});
    }
});




