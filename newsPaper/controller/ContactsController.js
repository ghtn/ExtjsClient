/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:28
 * To change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.controller.ContactsController', {
    extend: 'Ext.app.Controller',
    views: ['ContactsBaseContainer', 'ContactsTypeContainer', 'ContactsTypeTreeView',
        'ContactsContainer', 'ContactsGridView'],
    stores: ['ContactsTypeTreeStore', 'ContactsGridStore'],
    models: ['ContactsTypeTreeModel', 'ContactsGridModel'],

    init: function () {

        this.control({
            '#addContactsType': {
                click: this.addContactsTypeClick
            },
            '#removeContactsType': {
                click: this.removeContactsTypeClick
            },
            'contactsTypeTreeView': {
                edit: this.editContactsType,
                itemclick: this.showContacts
            },
            'contactsGridView': {
                render: this.contactsGridRender,
                edit: this.editContacts
            },
            '#addContacts': {
                click: this.addContactsClick
            },
            '#removeContacts': {
                click: this.removeContactsClick
            },
            '#formReset': {
                click: this.formReset
            },
            '#formSubmit': {
                click: this.formSubmit
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
        var newValue = e.value.trim();
        var oldValue = e.originalValue.trim();
        if (newValue != oldValue) {
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

    },
    /**
     * 分页加载contacts
     * @param view
     * @param rec
     * @param item
     * @param index
     * @param e
     */
    showContacts: function (view, rec, item, index, e) {
        //alert(rec.data.id);
        var store = Ext.data.StoreManager.lookup('ContactsGridStore');
        store.loadPage(1);
    },
    /**
     * 在分页加载之前增加id参数
     * @param grid
     * @param opts
     */
    contactsGridRender: function (grid, opts) {
        var store = grid.getStore();
        store.on('beforeload', function () {
            var tree = Ext.getCmp('contactsTypeTreeView');
            var node = tree.getSelectionModel().getSelection()[0];
            if (node) {
                var id = node.data.id;
                if (id == -1) {
                    id = 0;
                }
                var idParam = {id: id};
                Ext.apply(store.proxy.extraParams, idParam);
            }
        })
    },
    addContactsClick: function () {
        var tree = Ext.getCmp('contactsTypeTreeView');
        var node = tree.getSelectionModel().getSelection()[0];
        if (node) {
            if (node.data.leaf == true) {
                Ext.create('NewsPaper.view.ContactsWindowView').show();
            } else {
                Ext.MessageBox.alert('错误', '请选择一个具体的通讯录类别!');
            }
        } else {
            Ext.MessageBox.alert('错误', '请选择一个通讯录类别!');
        }
    },
    removeContactsClick: function () {
        //alert("remove");
    },
    editContacts: function (editor, context, eOpts) {
        var oldValues = context.originalValues;
        var newValues = context.newValues;
        if (oldValues.name != newValues.name
            || oldValues.idCard != newValues.idCard
            || oldValues.phone != newValues.phone
            || oldValues.email != newValues.email) {

            var grid = Ext.getCmp('contactsGridView');
            var store = grid.getStore();
            Ext.Ajax.request({
                url: '/newsPaper/contacts/updateContacts',
                method: 'post',
                params: {
                    id: oldValues.id,
                    name: newValues.name,
                    idCard: newValues.idCard,
                    phone: newValues.phone,
                    email: newValues.email
                },
                success: function (response) {
                    var result = response.responseText;
                    if (result.toUpperCase() == "SUCCESS") {
                        Ext.example.msg('编辑成功', '编辑通讯录成功!');
                    } else {
                        Ext.example.msg('编辑失败', '编辑通讯录失败!');
                    }
                    store.reload();
                },
                failure: function (response) {
                    Ext.example.msg('编辑失败', '编辑通讯录失败!');
                }
            });
        }
    },
    formReset: function () {
        Ext.getCmp('contactsForm').getForm().reset();
    },
    formSubmit: function () {
        var window = Ext.getCmp('contactsWindowView');
        var tree = Ext.getCmp('contactsTypeTreeView');
        var node = tree.getSelectionModel().getSelection()[0];
        var id = node.data.id;
        var grid = Ext.getCmp('contactsGridView');
        var store = grid.getStore();
        var form = Ext.getCmp('contactsForm').getForm();
        if (form.isValid()) {
            form.submit({
                params: {
                    'contactsType.id': id
                },
                success: function (form, action) {
                    //Ext.Msg.alert('Success', action.result.msg);
                    Ext.example.msg('增加成功', '增加通讯录人员成功!');
                    window.close();
                    store.reload();
                },
                failure: function (form, action) {
                    //Ext.Msg.alert('Failed', action.result.msg);
                    Ext.example.msg('增加失败', '增加通讯录人员失败!');
                    window.close();
                    store.reload();
                }
            });
        }
    }
});

function treeRefresh(store, tree) {
    store.reload();
    // 刷新tree,先全部收起,再全部展开
    tree.collapseAll(function () {
        tree.expandAll();
    });
}