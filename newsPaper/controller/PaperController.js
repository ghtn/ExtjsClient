/**
 * 试题库controller
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:28
 * To change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.controller.PaperController', {
    extend: 'Ext.app.Controller',
    views: ['PaperBaseContainer', 'PaperGridContainer', 'PaperGridView'],
    stores: [ 'PaperGridStore', 'DepartmentStore', 'PaperStatusStore', 'PaperSubjectGridStore'],
    models: [ 'PaperGridModel', 'DepartmentModel', 'PaperStatusModel'],

    init: function () {
        this.control({
            '#filterPaper': {
                click: this.filterPaper
            },
            '#publishPaper': {
                click: this.publishPaper
            },
            '#revokePaper': {
                click: this.revokePaper
            },
            '#removePaper': {
                click: this.removePaper
            },
            'paperGridView': {
                itemdblclick: this.showPaperEditWindow,
                render: this.paperGridRender
            },
            '#addPaperSubjectFromBank': {
                click: this.addPaperSubjectFromBankClick
            },
            '#filterSubjectBank': {
                click: this.filterSubjectBank
            },
            '#submitSubjectBank': {
                click: this.submitSubjectBank
            },
            '#paperEditFormSubmit': {
                click: this.paperEditFormSubmit
            }
        })
    },

    filterPaper: function () {
        var store = Ext.data.StoreManager.lookup('PaperGridStore');
        store.loadPage(1);
    },

    publishPaper: function () {
        var grid = Ext.getCmp('paperGridView');
        var record = grid.getSelectionModel().getSelection()[0];
        if (record) {
            if (record.data.status == 0) {
                Ext.MessageBox.confirm('确认发布', '确认发布所选择的试卷?', function (btn) {
                    if (btn == 'yes') {
                        var gridStore = Ext.data.StoreManager.lookup('PaperGridStore');
                        var progress = Ext.MessageBox.wait('正在发布所选择的试卷', '发布', {
                            text: '发布中...'
                        });
                        Ext.Ajax.request({
                            url: '/InformationSystemService/paper/publish',
                            method: 'post',
                            params: {
                                id: record.data.id
                            },
                            success: function (response) {
                                progress.close();
                                var result = Ext.JSON.decode(response.responseText);
                                if (result.success) {
                                    Ext.example.msg('发布成功', result.msg);
                                } else {
                                    Ext.MessageBox.alert('发布失败', result.msg);
                                }
                                grid.getSelectionModel().clearSelections();
                                gridStore.reload();
                            },
                            failure: function (response) {
                                progress.close();
                                var result = Ext.JSON.decode(response.responseText);
                                Ext.MessageBox.alert('发布失败', result.msg);
                                gridStore.reload();
                            }
                        });
                    }
                })
            } else {
                Ext.MessageBox.alert('错误', '请选择一条未发布的记录！');
            }
        } else {
            Ext.MessageBox.alert('错误', '请选择一条记录！');
        }
    },

    revokePaper: function () {
        var grid = Ext.getCmp('paperGridView');
        var record = grid.getSelectionModel().getSelection()[0];
        if (record) {
            if (record.data.status == 1) {
                Ext.MessageBox.confirm('确认撤销', '确认撤销所选择的试卷?', function (btn) {
                    if (btn == 'yes') {
                        var gridStore = Ext.data.StoreManager.lookup('PaperGridStore');
                        var progress = Ext.MessageBox.wait('正在撤销所选择的试卷', '发布', {
                            text: '撤销中...'
                        });
                        Ext.Ajax.request({
                            url: '/InformationSystemService/paper/revoke',
                            method: 'post',
                            params: {
                                id: record.data.id
                            },
                            success: function (response) {
                                progress.close();
                                var result = Ext.JSON.decode(response.responseText);
                                if (result.success) {
                                    Ext.example.msg('撤销成功', result.msg);
                                } else {
                                    Ext.MessageBox.alert('撤销失败', result.msg);
                                }
                                grid.getSelectionModel().clearSelections();
                                gridStore.reload();
                            },
                            failure: function (response) {
                                progress.close();
                                var result = Ext.JSON.decode(response.responseText);
                                Ext.MessageBox.alert('撤销失败', result.msg);
                                gridStore.reload();
                            }
                        });
                    }
                })
            } else {
                Ext.MessageBox.alert('错误', '请选择一条已发布的记录！');
            }
        } else {
            Ext.MessageBox.alert('错误', '请选择一条记录！');
        }
    },

    removePaper: function () {
        var grid = Ext.getCmp('paperGridView');

        var record = grid.getSelectionModel().getSelection()[0];

        if (record) {
            if (record.data.status == 1) {
                Ext.MessageBox.alert('错误', '已经发布的试卷不能删除！');
                return;
            }
            Ext.MessageBox.confirm('确认删除', '确认删除所选择的试卷?', function (btn) {
                if (btn == 'yes') {
                    var gridStore = Ext.data.StoreManager.lookup('PaperGridStore');
                    var progress = Ext.MessageBox.wait('正在删除所选择的试卷', '发布', {
                        text: '删除中...'
                    });
                    Ext.Ajax.request({
                        url: '/InformationSystemService/paper/remove',
                        method: 'post',
                        params: {
                            id: record.data.id
                        },
                        success: function (response) {
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
                            gridStore.reload();
                        }
                    });
                }
            })
        } else {
            Ext.MessageBox.alert('错误', '请选择一条记录！');
        }
    },

    showPaperEditWindow: function (view, record) {
        var window = Ext.create('NewsPaper.view.PaperEditWindowView').show();
        window.down('form').loadRecord(record);

        var store = Ext.data.StoreManager.lookup('PaperSubjectGridStore');
        store.load({
            params: {
                paperId: record.data.id
            }
        });
    },

    addPaperSubjectFromBankClick: function () {
        Ext.create('NewsPaper.view.SubjectBankWindowView').show();
        var subjectStore = Ext.data.StoreManager.lookup('MakePaperSubjectGridStore');
        subjectStore.load({
            params: {
                startDate: "",
                endDate: ""
            }
        });

        // 默认选中试卷中已经有的试题
        var paperSubjectStore = Ext.data.StoreManager.lookup('PaperSubjectGridStore');
        var records = [];
        paperSubjectStore.each(function (record) {
            records.push(record);
        });
        var grid = Ext.getCmp('subjectBankWindowView').down('#subjectBankGridView');
        grid.getSelectionModel().select(records);
    },

    filterSubjectBank: function () {
        // 刷新时, 保存grid的选中状态
        var grid = Ext.getCmp('subjectBankWindowView').down('#subjectBankGridView');
        var paperSubjectStore = Ext.data.StoreManager.lookup('PaperSubjectGridStore');
        var records = [];
        paperSubjectStore.each(function (record) {
            records.push(record);
        });

        var startDate = Ext.getCmp('subjectBankWindowView').down('#startDate').getValue();
        var endDate = Ext.getCmp('subjectBankWindowView').down('#endDate').getValue();
        startDate = Ext.util.Format.date(startDate, 'Y-m-d');
        endDate = Ext.util.Format.date(endDate, 'Y-m-d');

        var store = Ext.data.StoreManager.lookup('MakePaperSubjectGridStore');
        store.load({
            params: {
                startDate: startDate,
                endDate: endDate
            }
        });

        // 刷新时, 保存grid的选中状态
        grid.getSelectionModel().select(records);
    },

    submitSubjectBank: function () {
        var window = Ext.getCmp('subjectBankWindowView');
        var subjectBankgrid = window.down('#subjectBankGridView');
        var records = subjectBankgrid.getSelectionModel().getSelection();

        if (records && records.length > 0) {
            Ext.MessageBox.confirm('确认提交', '确认提交编辑的试卷?', function (btn) {
                if (btn == 'yes') {
                    var paramStr = "";
                    for (var i = 0; i < records.length; i++) {
                        paramStr += records[i].data.id + "#"
                    }

                    paramStr = paramStr.substr(0, paramStr.length - 1); // 去掉字符串中的最后一个"#"

                    var paperGrid = Ext.getCmp('paperGridView');
                    var paper = paperGrid.getSelectionModel().getSelection()[0];

                    var paperSubjectGridStore = Ext.data.StoreManager.lookup('PaperSubjectGridStore');
                    var paperGridStore = Ext.data.StoreManager.lookup('PaperGridStore');

                    var progress = Ext.MessageBox.wait('正在提交编辑的试卷', '提交', {
                        text: '提交中...'
                    });
                    Ext.Ajax.request({
                        url: '/InformationSystemService/paper/updateSubject',
                        method: 'post',
                        params: {
                            id: paper.data.id,
                            paramStr: paramStr
                        },
                        success: function (response) {
                            progress.close();
                            var result = Ext.JSON.decode(response.responseText);
                            if (result.success) {
                                Ext.example.msg('编辑成功', result.msg);
                                Ext.getCmp('paperEditWindowView').down('#subNumText').setValue(result.subNum);
                            } else {
                                Ext.MessageBox.alert('编辑失败', result.msg);
                            }
                            window.close();
                            paperSubjectGridStore.reload();
                            paperGridStore.reload();
                        },
                        failure: function (response) {
                            progress.close();
                            var result = Ext.JSON.decode(response.responseText);
                            Ext.MessageBox.alert('编辑失败', result.msg);
                            window.close();
                        }
                    });
                }
            });
        } else {
            Ext.MessageBox.alert('错误', '请选择试题!');
        }
    },

    paperEditFormSubmit: function () {
        var window = Ext.getCmp('paperEditWindowView');
        var form = window.down('#paperEditForm').getForm();
        if (form.isValid()) {
            Ext.MessageBox.confirm('确认提交', '确认提交试卷?', function (btn) {
                if (btn == 'yes') {
                    var paperGrid = Ext.getCmp('paperGridView');
                    var paper = paperGrid.getSelectionModel().getSelection()[0];
                    form.submit({
                        params: {
                            'id': paper.data.id
                        },
                        waitMsg: '正在更新试卷...',
                        success: function (form, action) {
                            Ext.example.msg('更新成功', action.result.msg);
                            window.close();
                            var paperGridStore = Ext.data.StoreManager.lookup('PaperGridStore');
                            paperGridStore.reload();
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

    paperGridRender: function (grid) {
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

            var status = null;
            if (grid.down('#statusCombo')) {
                status = grid.down('#statusCombo').getValue();
            }
            if (status == null) {
                status = -1;
            }

            var typeParam = {
                startDate: startDate,
                endDate: endDate,
                status: status
            };
            Ext.apply(store.proxy.extraParams, typeParam);
        })
    }
});




