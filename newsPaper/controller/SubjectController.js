/**
 * 试题库controller
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:28
 * To change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.controller.SubjectController', {
    extend: 'Ext.app.Controller',
    views: ['SubjectBaseContainer', 'SubjectGridContainer', 'SubjectTypeTreeView', 'SubjectGridView'],
    stores: ['SubjectTypeTreeStore', 'SubjectGridStore', 'DepartmentStore', 'SubjectAnswerStore'],
    models: ['SubjectTypeTreeModel', 'SubjectGridModel', 'DepartmentModel', 'SubjectAnswerModel'],

    init: function () {
        this.control({
            'subjectTypeTreeView': {
                itemclick: this.showSubject
            },
            'subjectGridView': {
                render: this.subjectGridRender
            },
            '#addSubject': {
                click: this.addSubjectClick
            },
            '#addSubjectChoice': {
                click: this.addSubjectChoice
            },
            '#removeSubjectChoice': {
                click: this.removeSubjectChoice
            },
            '#subjectAddFormReset': {
                click: this.subjectAddFormReset
            },
            '#subjectAddFormSubmit': {
                click: this.subjectAddFormSubmit
            }
        })
    },
    showSubject: function () {
        var store = Ext.data.StoreManager.lookup('SubjectGridStore');
        store.loadPage(1);
    },

    subjectGridRender: function (grid) {
        var store = grid.getStore();
        store.on('beforeload', function () {
            var tree = Ext.getCmp('subjectTypeTreeView');
            var node = tree.getSelectionModel().getSelection()[0];
            var typeParam;
            if (node) {
                var id = node.data.id;
                typeParam = {type: id};
            } else {
                typeParam = {type: -1};
            }
            Ext.apply(store.proxy.extraParams, typeParam);
        })
    },

    addSubjectClick: function () {
        Ext.create('NewsPaper.view.SubjectAddWindowView').show();
    },

    addSubjectChoice: function () {
        var store = Ext.data.StoreManager.lookup('SubjectAnswerStore');
        var newChoice = Ext.create('NewsPaper.model.SubjectAnswerModel', {
            answerDesc: ''
        });
//        store.insert(0,newChoice);
        store.add(newChoice);
    },

    removeSubjectChoice: function () {
        var grid = Ext.getCmp('subjectAddWindowView').getComponent('subjectAddForm').getComponent('subjectChoice');
        var record = grid.getSelectionModel().getSelection()[0];
//        alert(record.data.description);
        if (record) {
            var store = Ext.data.StoreManager.lookup('SubjectAnswerStore');
            store.remove(record);
        } else {
            Ext.MessageBox.alert('错误', '请选择一条记录！');
        }
    },

    subjectAddFormReset: function () {
        Ext.getCmp('subjectAddWindowView').down('#subjectAddForm').getForm().reset();
    },

    subjectAddFormSubmit: function () {
        var form = Ext.getCmp('subjectAddWindowView').down('#subjectAddForm').getForm();
        if (form.isValid()) {
            Ext.MessageBox.confirm('确认提交', '确认提交题目?', function (btn) {
                if (btn == 'yes') {
                    var window = Ext.getCmp('subjectAddWindowView');
                    var gridStore = Ext.data.StoreManager.lookup('SubjectGridStore');
                    var paramStr = "";
                    var answerStore = Ext.data.StoreManager.lookup('SubjectAnswerStore');
                    answerStore.each(function (record) {
                        paramStr += record.data.answerDesc + "#" + record.data.correct + "@";
                    });
                    paramStr = paramStr.substr(0, paramStr.length - 1); // 去掉字符串中的最后一个"@"
                    form.submit({
                        params: {
                            'paramStr': paramStr
                        },
                        waitMsg: '正在添加试题...',
                        success: function (form, action) {
                            Ext.example.msg('增加成功', action.result.msg);
                            answerStore.removeAll(true);
                            window.close();
                            gridStore.reload();
                        },
                        failure: function (form, action) {
                            Ext.MessageBox.alert('增加失败', action.result.msg);
//                            window.close();
                        }
                    });
                }
            });
        }
    }
});




