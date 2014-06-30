/**
 * 试题库controller
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:28
 * To change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.controller.MakePaperController', {
    extend: 'Ext.app.Controller',
    views: ['MakePaperContainer', 'MakePaperSubjectGridContainer', 'MakePaperSubjectGridView'],
    stores: [ 'MakePaperSubjectGridStore', 'DepartmentStore', 'SubjectAnswerStore'],
    models: [ 'SubjectGridModel', 'DepartmentModel', 'SubjectAnswerModel'],

    init: function () {
        this.control({
            '#addPaper': {
                click: this.addPaperClick
            },
            '#genPaper': {
                click: this.genPaperClick
            },
            '#importPaper': {
                click: this.importPaper
            },
            '#makePaperAddFormSubmit': {
                click: this.makePaperAddFormSubmit
            },
            '#makePaperGenFormSubmit': {
                click: this.makePaperGenFormSubmit
            }
        })
    },

    addPaperClick: function () {
        var grid = Ext.getCmp('makePaperSubjectGridView');
        var records = grid.getSelectionModel().getSelection();
        if (!records || records.length <= 0) {
            Ext.MessageBox.alert('错误', '请至少选择一个试题！');
            return;
        }
        Ext.create('NewsPaper.view.MakePaperAddWindowView').show();
    },

    genPaperClick: function () {
        Ext.create('NewsPaper.view.MakePaperGenWindowView').show();
    },

    importPaper: function () {
        alert("import paper");
    },

    makePaperAddFormSubmit: function () {
        var window = Ext.getCmp('makePaperAddWindowView');
        var form = window.down('#makePaperAddForm').getForm();
        if (form.isValid()) {
            Ext.MessageBox.confirm('确认生成', '确认生成试卷?', function (btn) {
                if (btn == 'yes') {
                    var paramStr = "";
                    var grid = Ext.getCmp('makePaperSubjectGridView');
                    var records = grid.getSelectionModel().getSelection();

                    for (var i = 0; i < records.length; i++) {
                        paramStr += records[i].data.id + "#"
                    }

                    paramStr = paramStr.substr(0, paramStr.length - 1); // 去掉字符串中的最后一个"#"

                    form.submit({
                        params: {
                            'paramStr': paramStr
                        },
                        waitMsg: '正在生成试卷...',
                        success: function (form, action) {
                            Ext.example.msg('生成成功', action.result.msg);
                            window.close();
                        },
                        failure: function (form, action) {
                            Ext.MessageBox.alert('生成失败', action.result.msg);
                            window.close();
                        }
                    });
                }
            });
        }
    },

    makePaperGenFormSubmit: function () {
        var window = Ext.getCmp('makePaperGenWindowView');
        var form = window.down('#makePaperGenForm').getForm();
        if (form.isValid()) {
            Ext.MessageBox.confirm('确认生成', '确认生成试卷?', function (btn) {
                if (btn == 'yes') {
                    form.submit({
                        waitMsg: '正在生成试卷...',
                        success: function (form, action) {
                            Ext.example.msg('生成成功', action.result.msg);
                            window.close();
                        },
                        failure: function (form, action) {
                            Ext.MessageBox.alert('生成失败', action.result.msg);
                            window.close();
                        }
                    });
                }
            });
        }
    }
});




