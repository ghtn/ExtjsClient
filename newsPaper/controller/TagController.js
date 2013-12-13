/**
 * Created by Administrator on 13-12-9.
 */
Ext.define('NewsPaper.controller.TagController', {
    extend: 'Ext.app.Controller',
    views: ['TagBaseContainer', 'TagTreeView'],
    stores: ['TagTreeStore'],
    models: ['TagTreeModel'],

    init: function () {
        this.control({
            '#addTag': {
                click: this.addTagClick
            },
            '#removeTag': {
                click: this.removeTagClick
            },
            'tagTreeView': {
                edit: this.editTag,
                itemcontextmenu: this.showTreeMenu
//                itemclick: this.showMaterial
            }
        });
    },

    addTagClick: function () {
        addTag();
    },
    removeTagClick: function () {
        removeTag();
    },
    editTag: function (editor, e) {
        var tree = Ext.getCmp('tagTreeView');
        var store = tree.store;
        var newValue = e.value.trim();
        var oldValue = e.originalValue.trim();
        if (newValue != oldValue) {
            var id = e.record.get('id');
            //alert('newValue = ' + newValue + ", id = " + id);
            var progress = Ext.MessageBox.wait('正在编辑标签名称', '编辑', {
                text: '编辑中...'
            });
            Ext.Ajax.request({
                url: '/newsPaper/tag/updateTag',
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
                        store.reload();
                    } else {
                        Ext.MessageBox.alert('编辑失败', result.msg);
                    }
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
     * 显示素材类别的右键菜单
     * @param view
     * @param record
     * @param item
     * @param index
     * @param e
     */
    showTreeMenu: function (view, record, item, index, e) {
        e.preventDefault();
        e.stopEvent();

        var menu = Ext.create('Ext.menu.Menu', {
            items: [
                {
                    text: '增加',
                    iconCls: 'Add',
                    handler: function () {
                        addTag();
                    }
                },
                {
                    text: '删除',
                    iconCls: 'Delete',
                    handler: function () {
                        removeTag();
                    }
                }
            ]
        });
        menu.showAt(e.getXY());
    }
});

function addTag() {
    var progress = Ext.MessageBox.wait('正在添加标签', '添加', {
        text: '添加中...'
    });
    Ext.Ajax.request({
        url: '/newsPaper/tag/addTag',
        method: 'post',
        params: {
            name: '新添加'
        },
        success: function (response) {
            progress.close();
            var result = Ext.JSON.decode(response.responseText);
            if (result.success) {
                Ext.example.msg('添加成功', result.msg);
                var store = Ext.data.StoreManager.lookup('TagTreeStore');
                store.reload();
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
}

function removeTag() {
    var tree = Ext.getCmp('tagTreeView');
    var node = tree.getSelectionModel().getSelection()[0];
    if (node) {
        Ext.MessageBox.confirm('确认删除', '确认删除此节点?', function (btn) {
            if (btn == 'yes') {
                if (node.data.id == -1) {
                    Ext.MessageBox.alert('错误', '不能删除根节点!');
                    return;
                }
                var progress = Ext.MessageBox.wait('正在删除标签', '删除', {
                    text: '删除中...'
                });

                Ext.Ajax.request({
                    url: '/newsPaper/tag/removeTag',
                    method: 'post',
                    params: {
                        id: node.get('id')
                    },
                    success: function (response) {
                        progress.close();
                        var result = Ext.JSON.decode(response.responseText);
                        if (result.success) {
                            Ext.example.msg('删除成功', result.msg);
                            var store = Ext.data.StoreManager.lookup('TagTreeStore');
                            store.reload();

                            /* tree.getSelectionModel().select(tree.getRootNode());
                             var textGridStore = Ext.getCmp('materialTextGridView').getStore();
                             textGridStore.loadPage(1);

                             var imageGridStore = Ext.getCmp('materialImageGridView').getStore();
                             imageGridStore.loadPage(1);*/
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
        Ext.MessageBox.alert('错误', '请选择一条记录!!');
    }
}