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
    stores: ['ExamGridStore', 'PaperPublishStore'],
    models: ['ExamGridModel'],

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
            }
        })
    },

    addExamClick: function () {
        Ext.create('NewsPaper.view.ExamAddWindowView').show();
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
        if (form.isValid()) {
            Ext.MessageBox.confirm('确认提交', '确认提交考试信息?', function (btn) {
                if (btn == 'yes') {
                    var date = window.down('#examDate').getValue();
                    var time = window.down('#examTime').getValue();
                    date = Ext.util.Format.date(date, 'Y-m-d');
                    time = Ext.util.Format.date(time, 'H:i:s');
                    var dateTime = date + " " + time;

                    form.submit({
                        params: {
                            'examTime': dateTime
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


    }
});




