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
            },
            '#filterSubject': {
                click: this.filterSubject
            },
            '#paperFileField': {
                change: this.paperFileFieldChange
            },
            '#startImportPaper': {
                click: this.startImportPaper
            },
            '#downloadPaperTemplate': {
                click: this.downloadPaperTemplate
            },
            '#makePaperSubjectGridView': {
                render: this.makePaperSubjectGridRender
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
        Ext.create('NewsPaper.view.MakePaperImportWindowView').show();
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
    },

    filterSubject: function () {
        var startDate = Ext.getCmp('makePaperSubjectGridView').down('#startDate').getValue();
        var endDate = Ext.getCmp('makePaperSubjectGridView').down('#endDate').getValue();
        startDate = Ext.util.Format.date(startDate, 'Y-m-d');
        endDate = Ext.util.Format.date(endDate, 'Y-m-d');

//        alert("startDate = " + startDate + ", endDate = " + endDate);

        var store = Ext.data.StoreManager.lookup('MakePaperSubjectGridStore');
        store.load({
            params: {
                startDate: startDate,
                endDate: endDate
            }
        });
    },

    paperFileFieldChange: function (field, value) {
        if (value == '' || value == undefined || value == 'null' || value == null) {
            Ext.MessageBox.alert('错误', '请选择模板文件！');
            return;
        }

        // 文件扩展名
        var fileExtension = value.substr(value.lastIndexOf('.') + 1);

        if (fileExtension.toLowerCase() != "xls" && fileExtension.toLowerCase() != "xlsx") {
            Ext.MessageBox.alert('错误', '文件格式不正确, 必须为excel文件！');
            return;
        }

        var form = Ext.getCmp('makePaperImportWindowView').down('#makePaperImportForm').getForm();

        form.submit({
            waitMsg: '上传数据文件中...',
            success: function (form, action) {
                Ext.example.msg('上传成功', action.result.msg);

                var button = Ext.getCmp('makePaperImportWindowView').down('#startImportPaper');
                button.setDisabled(false);
            },
            failure: function (form, action) {
                Ext.MessageBox.alert('上传失败', action.result.msg);
            }
        });
    },

    startImportPaper: function () {
        var window = Ext.getCmp('makePaperImportWindowView');

        var progress = Ext.MessageBox.wait('正在导入试卷', '导入', {
            text: '导入中...'
        });

        Ext.Ajax.request({
            url: '/InformationSystemService/paper/import',
            method: 'post',
            success: function (response) {
                progress.close();
                window.close();
                var result = Ext.JSON.decode(response.responseText);
                if (result.success) {
                    Ext.example.msg('导入成功', result.msg);
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

    downloadPaperTemplate: function () {
        window.open('/InformationSystemService/paper/downloadTemplate?fileName=试卷模板.xls');
    },

    makePaperSubjectGridRender: function (grid) {
        var store = grid.getStore();

        store.on('beforeload', function () {
            var startDate = "";
            var endDate = "";
            if (grid.down('#startDate')) {
                startDate = grid.down('#startDate').getValue();
                startDate = Ext.util.Format.date(startDate, 'Y-m-d');
            }
            if (grid.down('#endDate')) {
                endDate = grid.down('#endDate').getValue();
                endDate = Ext.util.Format.date(endDate, 'Y-m-d');
            }

            var typeParam = {
                startDate: startDate,
                endDate: endDate
            };
            Ext.apply(store.proxy.extraParams, typeParam);
        })
    }
});




