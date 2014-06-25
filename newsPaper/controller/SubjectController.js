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
            },
            '#subjectTypeRadio': {
                change: this.subjectTypeRadioChange
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
        // 默认选择题, 显示选择题答案, 隐藏判断题答案
        var form = Ext.getCmp('subjectAddWindowView').getComponent('subjectAddForm');
        var subjectChoice = form.down('#subjectChoice'); // 选择题答案
        var judgeRadioGroup = form.down('#judgeRadioGroup'); // 判断题答案

        subjectChoice.show();
        judgeRadioGroup.hide();
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

        // 重置答案
        var answerStore = Ext.data.StoreManager.lookup('SubjectAnswerStore');
        answerStore.removeAll();
    },

    subjectAddFormSubmit: function () {
        var window = Ext.getCmp('subjectAddWindowView');
        var form = window.down('#subjectAddForm').getForm();
        if (form.isValid()) {
            Ext.MessageBox.confirm('确认提交', '确认提交题目?', function (btn) {
                if (btn == 'yes') {
                    var typeRadio1 = window.down('#typeRadio1'); // 选择题

                    var paramStr = "";
                    var gridStore = Ext.data.StoreManager.lookup('SubjectGridStore');
                    var answerStore = Ext.data.StoreManager.lookup('SubjectAnswerStore');

                    if (typeRadio1.getValue()) {
                        // 如果是选择题, 把答案信息赋值给paramStr
                        answerStore.each(function (record) {
                            paramStr += record.data.answerDesc + "#" + record.data.correct + "@";
                        });
                        paramStr = paramStr.substr(0, paramStr.length - 1); // 去掉字符串中的最后一个"@"
                    }

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
                            window.close();
                        }
                    });
                }
            });
        }
    },

    subjectTypeRadioChange: function () {
        var form = Ext.getCmp('subjectAddWindowView').getComponent('subjectAddForm');
        var typeRadio1 = form.down('#typeRadio1'); // 选择题
        var typeRadio2 = form.down('#typeRadio2'); // 判断题

        var subjectChoice = form.down('#subjectChoice'); // 选择题答案
        var judgeRadioGroup = form.down('#judgeRadioGroup'); // 判断题答案
//        alert(radio1.getValue());
//        var grid = Ext.getCmp('subjectAddWindowView').getComponent('subjectAddForm').getComponent('subjectChoice');
//
//        grid.hide();

        if (typeRadio1.getValue()) {
//            alert("选择题");
            // 如果是选择题,显示选择题答案,  隐藏判断题答案
            subjectChoice.show();
            judgeRadioGroup.hide();
        } else {
            // 如果是判断题, 显示判断题答案, 隐藏选择题答案
            subjectChoice.hide();
            judgeRadioGroup.show();
        }

    }
});




