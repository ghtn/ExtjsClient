/**
 * 试题库controller
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:28
 * To change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.controller.ExamController', {
    extend: 'Ext.app.Controller',
    views: ['ExamBaseContainer', 'ExamGridContainer', 'ExamGridView'],
    stores: ['ExamGridStore', 'PaperPublishStore', 'ExamEmpGridStore', 'ExamEmpStore'],
    models: ['ExamGridModel', 'ExamEmpGridModel'],

    init: function () {
        this.control({
            '#addExam': {
                click: this.addExamClick
            },
            '#removeExam': {
                click: this.removeExam
            },
            '#examAddFormSubmit': {
                click: this.examAddFormSubmit
            },
            '#filterExamEmp': {
                click: this.filterExamEmp
            },
            'examGridView': {
                itemdblclick: this.showExamEditWindow,
                render: this.examGridRender
            },
            '#editFilterExamEmp': {
                click: this.editFilterExamEmp
            },
            '#examEditFormSubmit': {
                click: this.examEditFormSubmit
            },
            '#filterExam': {
                click: this.filterExam
            }
        })
    },

    addExamClick: function () {
        Ext.create('NewsPaper.view.ExamAddWindowView').show();
        var store = Ext.data.StoreManager.lookup('ExamEmpGridStore');
        store.load({
            params: {
                idCard: "",
                name: ""
            }
        });
    },

    removeExam: function () {
        var grid = Ext.getCmp('examGridView');
        var record = grid.getSelectionModel().getSelection()[0];
        if (record) {
            Ext.MessageBox.confirm('确认删除', '确认删除所选择的考试?', function (btn) {
                if (btn == 'yes') {
                    var progress = Ext.MessageBox.wait('正在删除所选择的考试信息', '删除', {
                        text: '删除中...'
                    });
                    Ext.Ajax.request({
                        url: '/InformationSystemService/exam/remove',
                        method: 'post',
                        params: {
                            id: record.data.id
                        },
                        success: function (response) {
                            var gridStore = Ext.data.StoreManager.lookup('ExamGridStore');
                            progress.close();
                            var result = Ext.JSON.decode(response.responseText);
                            if (result.success) {
                                Ext.example.msg('删除成功', result.msg);
                            } else {
                                Ext.MessageBox.alert('删除失败', result.msg);
                            }
                            gridStore.reload();
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

    examAddFormSubmit: function () {
        var window = Ext.getCmp('examAddWindowView');
        var form = window.down('#examAddForm').getForm();

        var examEmpGrid = window.down('#examEmpGrid');
        var records = examEmpGrid.getSelectionModel().getSelection();
        if (!records || records.length <= 0) {
            Ext.MessageBox.alert('错误', '考试人员为空! ');
            return;
        }

        if (form.isValid()) {
            Ext.MessageBox.confirm('确认提交', '确认提交考试信息?', function (btn) {
                if (btn == 'yes') {
                    var date = window.down('#examDate').getValue();
                    var time = window.down('#examTime').getValue();
                    date = Ext.util.Format.date(date, 'Y-m-d');
                    time = Ext.util.Format.date(time, 'H:i:s');
                    var dateTime = date + " " + time;

                    var paramStr = "";
                    for (var i = 0; i < records.length; i++) {
                        paramStr += records[i].data.id + "#"
                    }

                    paramStr = paramStr.substr(0, paramStr.length - 1); // 去掉字符串中的最后一个"#"

                    form.submit({
                        params: {
                            'examTime': dateTime,
                            'paramStr': paramStr
                        },
                        waitMsg: '正在添加考试...',
                        success: function (form, action) {
                            Ext.example.msg('增加成功', action.result.msg);
                            var gridStore = Ext.data.StoreManager.lookup('ExamGridStore');
                            window.close();
                            gridStore.reload();
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

    filterExamEmp: function () {
        var idCard = Ext.getCmp('examAddWindowView').down('#idCard').getValue();
        var name = Ext.getCmp('examAddWindowView').down('#name').getValue();

        var store = Ext.data.StoreManager.lookup('ExamEmpGridStore');
        store.load({
            params: {
                idCard: idCard,
                name: name
            }
        });
    },

    showExamEditWindow: function (view, record) {
        var window = Ext.create('NewsPaper.view.ExamEditWindowView').show();
        window.down('form').loadRecord(record);

        window.down('#examDate').setValue(record.data.examTime.substr(0, 10));
        window.down('#examTime').setValue(record.data.examTime.substr(11));

        // 部门下的所有员工
        var empGridStore = Ext.data.StoreManager.lookup('ExamEmpGridStore');
        empGridStore.load({
            params: {
                idCard: "",
                name: ""
            }
        });

        // 已经选中的员工
        var examEmpStore = Ext.data.StoreManager.lookup('ExamEmpStore');
        examEmpStore.load({
            params: {
                examId: record.data.id
            },
            callback: function (records, operation, success) {
                var grid = window.down('#examEmpGrid');
                grid.getSelectionModel().select(records);
            }
        });

    },

    editFilterExamEmp: function () {
        var window = Ext.getCmp('examEditWindowView');
        var idCard = window.down('#idCard').getValue();
        var name = window.down('#name').getValue();

        var store = Ext.data.StoreManager.lookup('ExamEmpGridStore');
        store.load({
            params: {
                idCard: idCard,
                name: name
            }
        });

        // 设置选中状态
        var records = [];
        var examEmpStore = Ext.data.StoreManager.lookup('ExamEmpStore');
        examEmpStore.each(function (record) {
            records.push(record);
        });
        var grid = window.down('#examEmpGrid');
        grid.getSelectionModel().select(records);
    },

    examEditFormSubmit: function () {
        var window = Ext.getCmp('examEditWindowView');
        var form = window.down('#examEditForm').getForm();

        var examEmpGrid = window.down('#examEmpGrid');
        var records = examEmpGrid.getSelectionModel().getSelection();
        if (!records || records.length <= 0) {
            Ext.MessageBox.alert('错误', '考试人员为空! ');
            return;
        }

        if (form.isValid()) {
            Ext.MessageBox.confirm('确认提交', '确认提交考试信息?', function (btn) {
                if (btn == 'yes') {
                    var date = window.down('#examDate').getValue();
                    var time = window.down('#examTime').getValue();
                    date = Ext.util.Format.date(date, 'Y-m-d');
                    time = Ext.util.Format.date(time, 'H:i:s');
                    var dateTime = date + " " + time;

                    var paramStr = "";
                    for (var i = 0; i < records.length; i++) {
                        paramStr += records[i].data.id + "#"
                    }

                    paramStr = paramStr.substr(0, paramStr.length - 1); // 去掉字符串中的最后一个"#"

                    form.submit({
                        params: {
                            'examTime': dateTime,
                            'paramStr': paramStr
                        },
                        waitMsg: '正在更新考试信息...',
                        success: function (form, action) {
                            Ext.example.msg('更新成功', action.result.msg);
                            var gridStore = Ext.data.StoreManager.lookup('ExamGridStore');
                            window.close();
                            gridStore.reload();
                        },
                        failure: function (form, action) {
                            Ext.MessageBox.alert('更新失败', action.result.msg);
                            window.close();
                        }
                    });
                }
            });
        }
    },

    filterExam: function () {
        var grid = Ext.getCmp('examGridView');
        var startDate = grid.down('#startDate').getValue();
        var endDate = grid.down('#endDate').getValue();
        startDate = Ext.util.Format.date(startDate, 'Y-m-d');
        endDate = Ext.util.Format.date(endDate, 'Y-m-d');

        var store = Ext.data.StoreManager.lookup('ExamGridStore');
        store.load({
            params: {
                startDate: startDate,
                endDate: endDate
            }
        });
    },

    examGridRender: function (grid) {
        var store = grid.getStore();

        store.on('beforeload', function () {
            var startDate = grid.down('#startDate').getValue();
            var endDate = grid.down('#endDate').getValue();
            startDate = Ext.util.Format.date(startDate, 'Y-m-d');
            endDate = Ext.util.Format.date(endDate, 'Y-m-d');

            var typeParam = {
                startDate: startDate,
                endDate: endDate
            };
            Ext.apply(store.proxy.extraParams, typeParam);
        })
    }
});




