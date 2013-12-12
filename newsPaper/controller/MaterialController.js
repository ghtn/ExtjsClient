/**
 * Created by Administrator on 13-12-9.
 */
Ext.define('NewsPaper.controller.MaterialController', {
    extend: 'Ext.app.Controller',
    views: ['MaterialBaseContainer', 'MaterialTypeTreeView', 'MaterialTextGridView', 'MaterialImageGridView'],
    stores: ['MaterialTypeTreeStore', 'MaterialTextGridStore', 'MaterialImageGridStore'],
    models: ['MaterialTypeTreeModel', 'MaterialTextGridModel', 'MaterialImageGridModel'],

    init: function () {
        this.control({
            '#addMaterialType': {
                click: this.addMaterialTypeClick
            },
            '#removeMaterialType': {
                click: this.removeMaterialTypeClick
            },
            'materialTypeTreeView': {
                edit: this.editMaterialType,
                itemcontextmenu: this.showTreeMenu,
                itemclick: this.showMaterial
            },
            'materialTextGridView': {
                render: this.materialTextGridRender,
                itemcontextmenu: this.showTextGridMenu,
                itemdblclick: this.showMaterialTextEditWindow
            },
            'materialImageGridView': {
                render: this.materialImageGridRender
            },
            '#addMaterialText': {
                click: this.addMaterialTextClick
            },
            '#removeMaterialText': {
                click: this.removeMaterialTextClick
            },
            '#addMaterialImage': {
                click: this.addMaterialImageClick
            },
            '#removeMaterialImage': {
                click: this.removeMaterialImageClick
            },
            '#materialTextAddFormSubmit': {
                click: this.materialTextAddFormSubmit
            },
            '#materialTextAddFormReset': {
                click: this.materialTextAddFormReset
            },
            '#materialTextEditFormSubmit': {
                click: this.materialTextEditFormSubmit
            },
            '#materialTextEditFormReset': {
                click: this.materialTextEditFormReset
            },
            '#materialImageAddFormSubmit': {
                click: this.materialImageAddFormSubmit
            },
            '#materialImageAddFormReset': {
                click: this.materialImageAddFormReset
            },
            '#imageUpload': {
                change: this.imageUpload
            }
        })
    },

    addMaterialTypeClick: function () {
        addMaterialType();
    },
    removeMaterialTypeClick: function () {
        removeMaterialType();
    },
    editMaterialType: function (editor, e) {
        var tree = Ext.getCmp('materialTypeTreeView');
        var store = tree.store;
        var newValue = e.value.trim();
        var oldValue = e.originalValue.trim();
        if (newValue != oldValue) {
            var id = e.record.get('id');
            //alert('newValue = ' + newValue + ", id = " + id);
            var progress = Ext.MessageBox.wait('正在编辑素材类别', '编辑', {
                text: '编辑中...'
            });
            Ext.Ajax.request({
                url: '/newsPaper/materialType/updateMaterialType',
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
                        addMaterialType();
                    }
                },
                {
                    text: '删除',
                    iconCls: 'Delete',
                    handler: function () {
                        removeMaterialType();
                    }
                }
            ]
        });
        menu.showAt(e.getXY());
    },
    showTextGridMenu: function (view, record, item, index, e) {
        // 这两个很重要，否则点击鼠标右键还是会出现浏览器的选项
        e.preventDefault();
        e.stopEvent();

        var menu = Ext.create('Ext.menu.Menu', {
            items: [
                {
                    text: '删除',
                    iconCls: 'Delete',
                    handler: function () {
                        removeMaterial('文本');
                    }
                }
            ]
        });
        menu.showAt(e.getXY());
    },
    showMaterial: function () {
        var textStore = Ext.data.StoreManager.lookup('MaterialTextGridStore');
        var imageStore = Ext.data.StoreManager.lookup('MaterialImageGridStore');
        textStore.loadPage(1);
        imageStore.loadPage(1);
    },
    materialTextGridRender: function (grid) {
        var store = grid.getStore();
        store.on('beforeload', function () {
            var params;
            var tree = Ext.getCmp('materialTypeTreeView');
            var node = tree.getSelectionModel().getSelection()[0];
            if (node) {
                var id = node.data.id;
                if (id == -1) {
                    id = 0;
                }
                params = {id: id, type: '文本'};
            } else {
                params = {type: '文本'};
            }
            Ext.apply(store.proxy.extraParams, params);
        })
    },
    materialImageGridRender: function (grid) {
        var store = grid.getStore();
        store.on('beforeload', function () {
            var params;
            var tree = Ext.getCmp('materialTypeTreeView');
            var node = tree.getSelectionModel().getSelection()[0];
            if (node) {
                var id = node.data.id;
                if (id == -1) {
                    id = 0;
                }
                params = {id: id, type: '图片'};
            } else {
                params = {type: '图片'};
            }
            Ext.apply(store.proxy.extraParams, params);
        })
    },
    addMaterialTextClick: function () {
        var tree = Ext.getCmp('materialTypeTreeView');
        var node = tree.getSelectionModel().getSelection()[0];
        if (node) {
            if (node.data.leaf == true) {
                Ext.create('NewsPaper.view.MaterialTextAddWindowView').show();
            } else {
                Ext.MessageBox.alert('错误', '请选择一个具体的素材类别!');
            }
        } else {
            Ext.MessageBox.alert('错误', '请选择一个素材类别!');
        }
    },
    removeMaterialTextClick: function () {
        removeMaterial('文本');
    },
    addMaterialImageClick: function () {
        var tree = Ext.getCmp('materialTypeTreeView');
        var node = tree.getSelectionModel().getSelection()[0];
        if (node) {
            if (node.data.leaf == true) {
                Ext.create('NewsPaper.view.MaterialImageAddWindowView').show();
            } else {
                Ext.MessageBox.alert('错误', '请选择一个具体的素材类别!');
            }
        } else {
            Ext.MessageBox.alert('错误', '请选择一个素材类别!');
        }
    },
    removeMaterialImageClick: function () {
        removeMaterial('图片');
    },
    materialTextAddFormSubmit: function () {
        var form = Ext.getCmp('materialTextAddWindowView').down('#materialTextAddForm').getForm();
        if (form.isValid()) {
            var window = Ext.getCmp('materialTextAddWindowView');
            var id = Ext.getCmp('materialTypeTreeView').getSelectionModel().getSelection()[0].get('id');
            form.submit({
                params: {
                    'materialType.id': id,
                    'type': '文本'
                },
                waitMsg: '正在添加文本素材...',
                success: function (form, action) {
                    Ext.example.msg('添加成功', action.result.msg);
                    window.close();
                    var store = Ext.getCmp('materialTextGridView').getStore();
                    store.reload();
                },
                failure: function (form, action) {
                    Ext.MessageBox.alert('添加失败', action.result.msg);
                    window.close();
                }
            });
        }
    },
    materialTextAddFormReset: function () {
        Ext.getCmp('materialTextAddWindowView').down('#materialTextAddForm').getForm().reset();
    },
    showMaterialTextEditWindow: function (view, record, item, index, e, eOpts) {
        var window = Ext.create('NewsPaper.view.MaterialTextEditWindowView').show();
        window.down('form').loadRecord(record);
    },
    materialTextEditFormSubmit: function () {
        var record = Ext.getCmp('materialTextGridView').getSelectionModel().getSelection()[0];
        var form = Ext.getCmp('materialTextEditWindowView').down('#materialTextEditForm').getForm();
        if (form.isValid()) {
            var window = Ext.getCmp('materialTextEditWindowView');
            form.submit({
                params: {
                    'id': record.get('id')
                },
                waitMsg: '正在编辑文本素材...',
                success: function (form, action) {
                    Ext.example.msg('编辑成功', action.result.msg);
                    window.close();
                    var store = Ext.getCmp('materialTextGridView').getStore();
                    store.reload();
                },
                failure: function (form, action) {
                    Ext.MessageBox.alert('编辑失败', action.result.msg);
                    window.close();
                }
            });
        }
    },
    materialTextEditFormReset: function () {
        Ext.getCmp('materialTextEditWindowView').down('#materialTextEditForm').getForm().reset();
    },
    materialImageAddFormSubmit: function () {
        var window = Ext.getCmp('materialImageAddWindowView')
        var form = window.down('#materialImageAddForm').getForm();
        if (form.isValid()) {
            var window = Ext.getCmp('materialImageAddWindowView');
            var id = Ext.getCmp('materialTypeTreeView').getSelectionModel().getSelection()[0].get('id');
            form.submit({
                params: {
                    'materialType.id': id,
                    'type': '图片'
                },
                waitMsg: '添加图片素材中...',
                success: function (form, action) {
                    Ext.example.msg('添加成功', action.result.msg);
                    window.close();
                    var imageStore = Ext.getCmp('materialImageGridView').getStore();
                    imageStore.reload();
                    var textStore = Ext.getCmp('materialTextGridView').getStore();
                    textStore.reload();
                },
                failure: function (form, action) {
                    Ext.MessageBox.alert('添加失败', action.result.msg);
                    window.close();
                }
            });
        }
    },
    materialImageAddFormReset: function () {
        Ext.getCmp('materialImageAddWindowView').down('#materialImageAddForm').getForm().reset();
    },
    imageUpload: function (field, value) {
        var window = Ext.getCmp('materialImageAddWindowView');
        var form = window.down('#imageForm').getForm();
        if (form.isValid()) {
            form.submit({
                waitMsg: '上传图片素材中...',
                success: function (form, action) {
                    Ext.example.msg('上传成功', action.result.msg);

                    // 显示图片预览
                    window.down('#imageView').setSrc(action.result.imagePath);

                    // 图片上传之后,filefield中的值会被清空,需要重新设置
                    // 否则不能通过空值验证
                    field.setRawValue(value);
                },
                failure: function (form, action) {
                    Ext.MessageBox.alert('上传失败', action.result.msg);
                }
            });
        }
    }
})

function addMaterialType() {
    var progress = Ext.MessageBox.wait('正在添加素材类别', '添加', {
        text: '添加中...'
    });
    Ext.Ajax.request({
        url: '/newsPaper/materialType/addMaterialType',
        method: 'post',
        params: {
            name: '新添加'
        },
        success: function (response) {
            progress.close();
            var result = Ext.JSON.decode(response.responseText);
            if (result.success) {
                Ext.example.msg('添加成功', result.msg);
                var store = Ext.data.StoreManager.lookup('MaterialTypeTreeStore');
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

function removeMaterialType() {
    var tree = Ext.getCmp('materialTypeTreeView');
    var node = tree.getSelectionModel().getSelection()[0];

    if (node) {
        Ext.MessageBox.confirm('确认删除', '确认删除此节点?', function (btn) {
            if (btn == 'yes') {
                var progress = Ext.MessageBox.wait('正在删除素材类别', '删除', {
                    text: '删除中...'
                });

                Ext.Ajax.request({
                    url: '/newsPaper/materialType/removeMaterialType',
                    method: 'post',
                    params: {
                        id: node.get('id')
                    },
                    success: function (response) {
                        progress.close();
                        var result = Ext.JSON.decode(response.responseText);
                        if (result.success) {
                            Ext.example.msg('删除成功', result.msg);
                            var store = Ext.data.StoreManager.lookup('MaterialTypeTreeStore');
                            store.reload();

                            tree.getSelectionModel().select(tree.getRootNode());
                            var textGridStore = Ext.getCmp('materialTextGridView').getStore();
                            textGridStore.loadPage(1);

                            var imageGridStore = Ext.getCmp('materialImageGridView').getStore();
                            imageGridStore.loadPage(1);
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
        })
    } else {
        Ext.MessageBox.alert('错误', '请选择一个节点！');
    }
}

function removeMaterial(type) {
    var textGrid = Ext.getCmp('materialTextGridView')
    var imageGrid = Ext.getCmp('materialImageGridView')
    var record;
    if (type == '文本') {
        record = textGrid.getSelectionModel().getSelection()[0];
    } else if (type == '图片') {
        record = imageGrid.getSelectionModel().getSelection()[0];
    } else {
        Ext.MessageBox.alert('错误', '参数错误!');
        return;
    }

    if (record.get('type') != type) {
        Ext.MessageBox.alert('错误', '素材类型和传入的参数不匹配!!素材类型为 : ' + record.get('type')
            + ",传入的参数为 : " + type);
        return;
    }

    if (record) {
        Ext.MessageBox.confirm('确认删除', '确定删除此素材?', function (btn) {
            if (btn == 'yes') {
                var progress = Ext.MessageBox.wait('正在删除素材', '删除', {
                    text: '删除中...'
                });
                var url;
                if (type == '文本') {
                    url = '/newsPaper/material/removeMaterialText'
                } else if (type == '图片') {
                    url = '/newsPaper/material/removeMaterialImage'
                } else {
                    Ext.MessageBox.alert('错误',
                        '素材类型错误,素材类型必须为"文本"或"图片",当前素材类型为 : ' + record.get('type'))
                    return;
                }
                Ext.Ajax.request({
                    url: url,
                    method: 'post',
                    params: {
                        id: record.get('id')  // 或者record.data.id
                    },
                    success: function (response) {
                        progress.close();
                        var result = Ext.JSON.decode(response.responseText);
                        if (result.success) {
                            Ext.example.msg('删除成功', result.msg);
                            textGrid.getStore().loadPage(1);
                            imageGrid.getStore().loadPage(1);
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