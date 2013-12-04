/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:28
 * To change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.controller.ContactsController', {
    extend: 'Ext.app.Controller',
    views: ['ContactsBaseContainer', 'ContactsTypeContainer', 'ContactsTypeTreeView'],
    stores: ['ContactsTypeTreeStore'],
    models: ['ContactsTypeTreeModel'],

    init: function () {

        this.control({
            '#addContactsType': {
                click: this.addContactsTypeClick
            },
            '#removeContactsType': {
                click: this.removeContactsTypeClick
            },
            'contactsTypeTreeView': {
                edit: this.editContactsType
            }
        })
    },

    addContactsTypeClick: function () {
        var tree = Ext.getCmp('contactsTypeTreeView');
        var node = tree.getSelectionModel().getSelection()[0];
        if (node) {
            var store = tree.store;
            Ext.Ajax.request({
                url: '/newsPaper/contactsType/addChild',
                method: 'post',
                params: {
                    id: node.data.id,
                    text: '新添加'
                },
                success: function (response, opts) {
                    var result = response.responseText;
                    if (result.toUpperCase() == "SUCCESS") {
                        Ext.example.msg('添加成功', '添加通讯录类别成功!');
                    } else {
                        Ext.example.msg('添加失败', '添加通讯录类别失败!');
                    }

                    treeRefresh(store, tree);

                },
                failure: function (response, opts) {
                    Ext.example.msg('添加失败', '添加通讯录类别失败!');
                    treeRefresh(store, tree);
                }
            });
        } else {
            Ext.MessageBox.alert('错误', '请选择一个节点！');
        }

    },
    removeContactsTypeClick: function () {
        var tree = Ext.getCmp('contactsTypeTreeView');
        var node = tree.getSelectionModel().getSelection()[0];
        if (node) {
            Ext.MessageBox.confirm('确认删除', '确定删除此节点?', function (btn) {
                if (btn == 'yes') {
                    if (node.data.id == -1) {
                        Ext.MessageBox.alert('错误', '不能删除根节点!');
                        return;
                    }
                    var store = tree.store;
                    Ext.Ajax.request({
                        url: '/newsPaper/contactsType/removeContactsType',
                        method: 'post',
                        params: {
                            id: node.data.id
                        },
                        success: function (response, opts) {
                            var result = response.responseText;
                            if (result.toUpperCase() == "SUCCESS") {
                                Ext.example.msg('删除成功', '删除通讯录类别成功!');
                            } else {
                                Ext.example.msg('删除失败', '删除通讯录类别失败!');
                            }

                            treeRefresh(store, tree);

                        },
                        failure: function (response, opts) {
                            Ext.example.msg('删除失败', '删除通讯录类别失败!');
                            treeRefresh(store, tree);
                        }
                    });
                }
            })
        } else {
            Ext.MessageBox.alert('错误', '请选择一个节点！');
        }
    },
    editContactsType: function (editor, e, eOpts) {
        var tree = Ext.getCmp('contactsTypeTreeView');
        var store = tree.store;
        var newValue = e.value;
        var id = e.record.data.id;
        //alert('newValue = ' + newValue + ", id = " + id);
        Ext.Ajax.request({
            url: '/newsPaper/contactsType/updateContactsType',
            method: 'post',
            params: {
                id: id,
                name: newValue
            },
            success: function (response, opts) {
                var result = response.responseText;
                if (result.toUpperCase() == "SUCCESS") {
                    Ext.example.msg('编辑成功', '编辑通讯录类别成功!');
                } else {
                    Ext.example.msg('编辑失败', '编辑通讯录类别失败!');
                }
                treeRefresh(store, tree);
            },
            failure: function (response, opts) {
                Ext.example.msg('编辑失败', '编辑通讯录类别失败!');
                treeRefresh(store, tree);
            }
        });
    }

});

function treeRefresh(store, tree) {
    store.reload();
    // 刷新tree,先全部收起,再全部展开
    tree.collapseAll(function () {
        tree.expandAll();
    });
}