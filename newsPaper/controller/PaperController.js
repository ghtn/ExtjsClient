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
    stores: [ 'PaperGridStore', 'DepartmentStore', 'PaperStatusStore'],
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
            }
        })
    },

    filterPaper: function () {
        var grid = Ext.getCmp('paperGridView');
        var startDate = grid.down('#startDate').getValue();
        var endDate = grid.down('#endDate').getValue();
        startDate = Ext.util.Format.date(startDate, 'Y-m-d');
        endDate = Ext.util.Format.date(endDate, 'Y-m-d');

        var deptId = grid.down('#deptCombo').getValue();
        if (deptId == null || deptId == "null" || deptId == "" || deptId == undefined) {
            deptId = -1;
        }

        var status = grid.down('#statusCombo').getValue();
        if (status == null) {
            status = -1;
        }

        var store = Ext.data.StoreManager.lookup('PaperGridStore');
        store.load({
            params: {
                startDate: startDate,
                endDate: endDate,
                deptId: deptId,
                status: status
            }
        });
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
    }
});




