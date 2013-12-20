/**
 * 通讯录controller
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:28
 * To change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.controller.ContactsController', {
    extend: 'Ext.app.Controller',
    views: ['ContactsBaseContainer', 'ContactsContainer', 'ContactsTypeTreeView', 'ContactsGridView'],
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
                itemclick: this.showContacts,
                itemcontextmenu: this.showTreeMenu
            },
            'contactsGridView': {
                render: this.contactsGridRender,
                edit: this.editContacts,
                itemcontextmenu: this.showGridMenu
            },
            '#addContacts': {
                click: this.addContactsClick
            },
            '#removeContacts': {
                click: this.removeContactsClick
            },
            '#importContacts': {
                click: this.importContactsClick
            },
            '#contactsAddFormReset': {
                click: this.contactsAddFormReset
            },
            '#contactsAddFormSubmit': {
                click: this.contactsAddFormSubmit
            },
            '#uploadFile': {
                click: this.uploadFile
            },
            '#startImportContacts': {
                click: this.startImportContacts
            },
            '#downloadTemplate': {
                click: this.downloadTemplate
            }
        })
    },

    /**
     * 点击增加通讯录类别按钮
     */
    addContactsTypeClick: function () {
        addContactsType();
    },

    /**
     * 点击删除通讯录类别按钮
     */
    removeContactsTypeClick: function () {
        removeContactsType();
    },

    /**
     * 编辑通讯录类别
     * @param editor 编辑器
     * @param e 选中的记录
     * @param eOpts
     */
    editContactsType: function (editor, e, eOpts) {
        var tree = Ext.getCmp('contactsTypeTreeView');
        var store = tree.store;
        var newValue = e.value.trim();
        var oldValue = e.originalValue.trim();
        if (newValue != oldValue) {
            var id = e.record.data.id;
            //alert('newValue = ' + newValue + ", id = " + id);
            var progress = Ext.MessageBox.wait('正在编辑通讯录类别', '编辑', {
                text: '编辑中...'
            });
            Ext.Ajax.request({
                url: '/newsPaper/contactsType/updateContactsType',
                method: 'post',
                params: {
                    id: id,
                    name: newValue
                },
                success: function (response) {
                    progress.close();
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.success) {
                        Ext.example.msg('编辑成功', result.msg);
                    } else {
                        Ext.MessageBox.alert('编辑失败', result.msg);
                    }
                    treeRefresh(store, tree);
                },
                failure: function (response) {
                    progress.close();
                    var result = Ext.JSON.decode(response.responseText);
                    Ext.MessageBox.alert('编辑失败', result.msg);
                    treeRefresh(store, tree);
                }
            });
        }

    },
    /**
     * 分页加载contacts
     */
    showContacts: function () {
        var store = Ext.data.StoreManager.lookup('ContactsGridStore');
        store.loadPage(1);
    },
    /**
     * 在分页加载之前增加过滤条件, 按照通讯录类别进行过滤
     * @param grid 通讯录列表grid
     */
    contactsGridRender: function (grid) {
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

    /**
     * 点击增加通讯录按钮
     */
    addContactsClick: function () {
        var tree = Ext.getCmp('contactsTypeTreeView');
        var node = tree.getSelectionModel().getSelection()[0];
        if (node) {
            if (node.data.leaf == true) {
                Ext.create('NewsPaper.view.ContactsAddWindowView').show();
            } else {
                Ext.MessageBox.alert('错误', '请选择一个具体的通讯录类别!');
            }
        } else {
            Ext.MessageBox.alert('错误', '请选择一个通讯录类别!');
        }
    },

    /**
     * 点击删除通讯录按钮
     */
    removeContactsClick: function () {
        removeContacts();
    },

    /**
     * 编辑通讯录
     * @param editor 编辑器
     * @param context 正在编辑的记录的上下文
     */
    editContacts: function (editor, context) {
        var oldValues = context.originalValues; // 编辑之前的值
        var newValues = context.newValues; //编辑之后的值
        if (oldValues.name != newValues.name
            || oldValues.idCard != newValues.idCard
            || oldValues.phone != newValues.phone
            || oldValues.email != newValues.email) {

            var progress = Ext.MessageBox.wait('正在编辑通讯录', '编辑', {
                text: '编辑中...'
            });

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
                    progress.close();
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.success) {
                        Ext.example.msg('编辑成功', result.msg);
                    } else {
                        Ext.MessageBox.alert('编辑失败', result.msg);
                    }
                    store.reload();
                },
                failure: function (response) {
                    progress.close();
                    var result = Ext.JSON.decode(response.responseText);
                    Ext.MessageBox.alert('编辑失败', result.msg);
                }
            });
        }
    },

    /**
     * 重置增加通讯录的form
     */
    contactsAddFormReset: function () {
        Ext.getCmp('contactsAddWindowView').down('#contactsAddForm').getForm().reset();
    },

    /**
     * 提交增加通讯录的form
     */
    contactsAddFormSubmit: function () {
        var form = Ext.getCmp('contactsAddWindowView').down('#contactsAddForm').getForm();
        if (form.isValid()) {
            var window = Ext.getCmp('contactsAddWindowView');
            var id = Ext.getCmp('contactsTypeTreeView').getSelectionModel().getSelection()[0].get('id');
            var store = Ext.getCmp('contactsGridView').getStore();
            form.submit({
                params: {
                    'contactsType.id': id
                },
                waitMsg: '正在添加通讯录...',
                success: function (form, action) {
                    Ext.example.msg('增加成功', action.result.msg);
                    window.close();
                    store.reload();
                },
                failure: function (form, action) {
                    Ext.MessageBox.alert('增加失败', action.result.msg);
                    window.close();
                }
            });
        }
    },

    /**
     * 显示通讯录类别区域的右键菜单
     * @param view
     * @param record
     * @param item
     * @param index
     * @param e
     */
    showTreeMenu: function (view, record, item, index, e) {
        // 这两个很重要，否则点击鼠标右键还是会出现浏览器的选项
        e.preventDefault();
        e.stopEvent();

        var menu = Ext.create('Ext.menu.Menu', {
            items: [
                {
                    text: '增加',
                    iconCls: 'Add',
                    handler: function () {
                        addContactsType();
                    }
                },
                {
                    text: '删除',
                    iconCls: 'Delete',
                    handler: function () {
                        removeContactsType();
                    }
                }
            ]
        });
        menu.showAt(e.getXY());
    },

    /**
     * 显示通讯录区域的右键菜单
     * @param view
     * @param record
     * @param item
     * @param index
     * @param e
     */
    showGridMenu: function (view, record, item, index, e) {
        e.preventDefault();
        e.stopEvent();

        var menu = Ext.create('Ext.menu.Menu', {
            items: [
                {
                    text: '删除',
                    iconCls: 'Delete',
                    handler: function () {
                        removeContacts();
                    }
                }
            ]
        });
        menu.showAt(e.getXY());
    },

    /**
     * 点击导入通讯录按钮
     */
    importContactsClick: function () {
        var tree = Ext.getCmp('contactsTypeTreeView');
        var node = tree.getSelectionModel().getSelection()[0];
        if (node) {
            if (node.data.leaf == true) {
                Ext.create('NewsPaper.view.ContactsImportWindowView').show();
            } else {
                Ext.MessageBox.alert('错误', '请选择一个具体的通讯录类别!');
            }
        } else {
            Ext.MessageBox.alert('错误', '请选择一个通讯录类别!');
        }
    },

    /**
     * 上传模版文件, 用于批量导入通讯录
     */
    uploadFile: function () {
        // var window = Ext.getCmp('contactsImportWindowView');
        var form = Ext.getCmp('contactsImportWindowView').down('#contactsImportForm').getForm();
        if (form.isValid()) {
            form.submit({
                waitMsg: '上传数据文件中...',
                success: function (form, action) {
                    Ext.example.msg('上传成功', action.result.msg);

                    var button = Ext.getCmp('contactsImportWindowView').down('#startImportContacts');
                    button.setDisabled(false);
                },
                failure: function (form, action) {
                    Ext.MessageBox.alert('上传失败', action.result.msg);
                }
            });
        }
    },

    /**
     * 开始导入通讯录
     */
    startImportContacts: function () {
        var tree = Ext.getCmp('contactsTypeTreeView');
        var node = tree.getSelectionModel().getSelection()[0];
        //在导入窗口打开之前已经进行了node的判断，此处省略

        var progress = Ext.MessageBox.wait('正在导入通讯录', '导入', {
            text: '导入中...'
        });

        Ext.Ajax.request({
            url: '/newsPaper/contacts/batchImportContacts',
            method: 'post',
            params: {
                id: node.data.id
            },
            success: function (response) {
                progress.close();
                Ext.getCmp('contactsImportWindowView').close();
                var result = Ext.JSON.decode(response.responseText);
                if (result.success) {
                    Ext.example.msg('导入成功', result.msg);
                    var gridStore = Ext.getCmp('contactsGridView').getStore();
                    gridStore.reload();
                } else {
                    Ext.MessageBox.alert('导入失败', result.msg)
                }
            },
            failure: function (response) {
                progress.close();
                Ext.getCmp('contactsImportWindowView').close();
                var result = Ext.JSON.decode(response.responseText);
                Ext.MessageBox.alert('导入失败', result.msg)
            }
        });
    },

    /**
     * 下载模板文件
     */
    downloadTemplate: function () {
        window.open('/newsPaper/contacts/downloadTemplate?fileName=通讯录模板.xls');
    }
});

/**
 * 刷新通讯录类别树形结构
 * @param store
 * @param tree
 */
function treeRefresh(store, tree) {
    store.reload();
    // 刷新tree,先全部收起,再全部展开
    tree.collapseAll(function () {
        tree.expandAll();
    });
}

/**
 * 增加通讯录类别
 */
function addContactsType() {
    var tree = Ext.getCmp('contactsTypeTreeView');
    var node = tree.getSelectionModel().getSelection()[0];
    if (node) {
        var progress = Ext.MessageBox.wait('正在添加通讯录类别', '添加', {
            text: '添加中...'
        });
        var store = tree.store;
        Ext.Ajax.request({
            url: '/newsPaper/contactsType/addChild',
            method: 'post',
            params: {
                id: node.data.id,
                text: '新添加'
            },
            success: function (response) {
                progress.close();
                var result = Ext.JSON.decode(response.responseText);
                if (result.success) {
                    Ext.example.msg('添加成功', result.msg);
                    treeRefresh(store, tree);
                } else {
                    Ext.MessageBox.alert('添加失败', result.msg);
                }
            },
            failure: function (response) {
                progress.close();
                var result = Ext.JSON.decode(response.responseText);
                Ext.MessageBox.alert('添加失败', result.msg);
            }
        });
    } else {
        Ext.MessageBox.alert('错误', '请选择一个节点！');
    }
}

/**
 * 删除通讯录类别
 */
function removeContactsType() {
    var tree = Ext.getCmp('contactsTypeTreeView');
    var node = tree.getSelectionModel().getSelection()[0];
    if (node) {
        Ext.MessageBox.confirm('确认删除', '确定删除此节点?', function (btn) {
            if (btn == 'yes') {
                if (node.data.id == -1) {
                    Ext.MessageBox.alert('错误', '不能删除根节点!');
                    return;
                }
                var progress = Ext.MessageBox.wait('正在删除通讯录类别', '删除', {
                    text: '删除中...'
                });
                var store = tree.store;
                var gridStore = Ext.getCmp('contactsGridView').getStore();

                Ext.Ajax.request({
                    url: '/newsPaper/contactsType/removeContactsType',
                    method: 'post',
                    params: {
                        id: node.data.id
                    },
                    success: function (response) {
                        progress.close();
                        var result = Ext.JSON.decode(response.responseText);
                        if (result.success) {
                            Ext.example.msg('删除成功', result.msg);
                        } else {
                            Ext.MessageBox.alert('删除失败', result.msg);
                        }

                        // 删除后刷新contactsType树,选中根节点,加载contacts
                        treeRefresh(store, tree);
                        tree.getSelectionModel().select(tree.getRootNode());
                        gridStore.loadPage(1);
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
        Ext.MessageBox.alert('错误', '请选择一个节点！');
    }
}

/**
 * 删除通讯录
 */
function removeContacts() {
    var grid = Ext.getCmp('contactsGridView');
    var record = grid.getSelectionModel().getSelection()[0];
    if (record) {
        Ext.MessageBox.confirm('确认删除', '确定删除此通讯录人员?', function (btn) {
            if (btn == 'yes') {
                var store = grid.getStore();
                var progress = Ext.MessageBox.wait('正在删除通讯录', '删除', {
                    text: '删除中...'
                });
                Ext.Ajax.request({
                    url: '/newsPaper/contacts/removeContacts',
                    method: 'post',
                    params: {
                        id: record.get('id')  // 或者record.data.id
                    },
                    success: function (response) {
                        progress.close();
                        var result = Ext.JSON.decode(response.responseText);
                        if (result.success) {
                            Ext.example.msg('删除成功', result.msg);
                            store.loadPage(1);
                        } else {
                            Ext.MessageBox.alert('删除失败', result.msg);
                        }
                    },
                    failure: function (response) {
                        progress.close();
                        var result = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.alert('删除失败', result.msg);
                    }
                });
            }
        });
    } else {
        Ext.MessageBox.alert('错误', '请选择一条记录！');
    }
}