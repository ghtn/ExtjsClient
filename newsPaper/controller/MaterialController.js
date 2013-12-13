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
                render: this.materialImageGridRender,
                itemcontextmenu: this.showImageGridMenu,
                itemdblclick: this.showMaterialImageEditWindow
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
            '#materialImageEditFormSubmit': {
                click: this.materialImageEditFormSubmit
            },
            '#materialImageEditFormReset': {
                click: this.materialImageEditFormReset
            },
            '#addImageUpload': {
                change: this.addImageUpload
            },
            '#editImageUpload': {
                change: this.editImageUpload
            },
            '#textTagCheckGroup': {
                render: this.textTagCheckGroupRender
            }
        })
    },

    /**
     * 增加素材类别
     */
    addMaterialTypeClick: function () {
        addMaterialType();
    },

    /**
     * 删除素材类别
     */
    removeMaterialTypeClick: function () {
        removeMaterialType();
    },

    /**
     * 编辑素材类别
     * @param editor
     * @param e
     */
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

    /**
     * 显示素材类别的右键菜单
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

    /**
     * 显示文本素材的右键菜单
     * @param view
     * @param record
     * @param item
     * @param index
     * @param e
     */
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

    /**
     * 显示图片素材的右键菜单
     * @param view
     * @param record
     * @param item
     * @param index
     * @param e
     */
    showImageGridMenu: function (view, record, item, index, e) {
        e.preventDefault();
        e.stopEvent();

        var menu = Ext.create('Ext.menu.Menu', {
            items: [
                {
                    text: '删除',
                    iconCls: 'Delete',
                    handler: function () {
                        removeMaterial('图片');
                    }
                }
            ]
        });
        menu.showAt(e.getXY());
    },

    /**
     * 选中素材类别时,展示对应的文本素材和图片素材
     */
    showMaterial: function () {
        var textStore = Ext.data.StoreManager.lookup('MaterialTextGridStore');
        var imageStore = Ext.data.StoreManager.lookup('MaterialImageGridStore');
        textStore.loadPage(1);
        imageStore.loadPage(1);
    },

    /**
     * 文本素材分页显示增加过滤参数
     * @param grid
     */
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

    /**
     * 图片素材分页显示增加过滤参数
     * @param grid
     */
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

    /**
     * 打开增加文本素材的form窗口
     */
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

    /**
     * 删除文本素材
     */
    removeMaterialTextClick: function () {
        removeMaterial('文本');
    },

    /**
     * 打开图片素材的form窗口
     */
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

    /**
     * 删除图片素材
     */
    removeMaterialImageClick: function () {
        removeMaterial('图片');
    },

    /**
     * 提交增加文本素材的form
     */
    materialTextAddFormSubmit: function () {
        var form = Ext.getCmp('materialTextAddWindowView').down('#materialTextAddForm').getForm();
        if (form.isValid()) {
            var window = Ext.getCmp('materialTextAddWindowView');
            var id = Ext.getCmp('materialTypeTreeView').getSelectionModel().getSelection()[0].get('id');
            form.submit({
                params: {
                    'materialTypeId': id,
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

    /**
     * 重置增加文本素材的form
     */
    materialTextAddFormReset: function () {
        Ext.getCmp('materialTextAddWindowView').down('#materialTextAddForm').getForm().reset();
    },

    /**
     * 打开编辑文本素材的form窗口
     * @param view
     * @param record
     * @param item
     * @param index
     * @param e
     * @param eOpts
     */
    showMaterialTextEditWindow: function (view, record, item, index, e, eOpts) {
        var window = Ext.create('NewsPaper.view.MaterialTextEditWindowView').show();
        window.down('form').loadRecord(record);
    },

    /**
     * 提交编辑文本素材的form
     */
    materialTextEditFormSubmit: function () {
        var record = Ext.getCmp('materialTextGridView').getSelectionModel().getSelection()[0];
        var window = Ext.getCmp('materialTextEditWindowView');
        var form = window.down('#materialTextEditForm').getForm();
        if (form.isValid()) {
            form.submit({
                params: {
                    'id': record.get('id')
                },
                waitMsg: '正在编辑文本素材...',
                success: function (form, action) {
                    Ext.example.msg('编辑成功', action.result.msg);
                    window.close();
                    var textStore = Ext.getCmp('materialTextGridView').getStore();
                    textStore.loadPage(1);
                    var imageStore = Ext.getCmp('materialImageGridView').getStore();
                    imageStore.loadPage(1);
                },
                failure: function (form, action) {
                    Ext.MessageBox.alert('编辑失败', action.result.msg);
                    window.close();
                }
            });
        }
    },

    /**
     * 重置编辑文本素材的form
     */
    materialTextEditFormReset: function () {
        Ext.getCmp('materialTextEditWindowView').down('#materialTextEditForm').getForm().reset();
    },

    /**
     * 提交增加图片素材的form
     */
    materialImageAddFormSubmit: function () {
        var window = Ext.getCmp('materialImageAddWindowView')
        var form = window.down('#materialImageAddForm').getForm();
        if (form.isValid()) {
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
                    //imageStore.loadPage(1);
                    var textStore = Ext.getCmp('materialTextGridView').getStore();
                    //textStore.reload();
                    textStore.loadPage(1);
                },
                failure: function (form, action) {
                    Ext.MessageBox.alert('添加失败', action.result.msg);
                    window.close();
                }
            });
        }
    },

    /**
     * 重置增加图片素材的form
     */
    materialImageAddFormReset: function () {
        Ext.getCmp('materialImageAddWindowView').down('#materialImageAddForm').getForm().reset();
    },

    /**
     * 增加图片素材时上传图片素材
     * @param field
     * @param value
     */
    addImageUpload: function (field, value) {
        var window = Ext.getCmp('materialImageAddWindowView');
        var form = window.down('#addImageForm').getForm();
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
    },
    /**
     * 编辑图片素材时上传图片素材
     * @param field
     * @param value
     */
    editImageUpload: function (field, value) {
        var record = Ext.getCmp('materialImageGridView').getSelectionModel().getSelection()[0];
        var window = Ext.getCmp('materialImageEditWindowView');
        var form = window.down('#editImageForm').getForm();
        if (form.isValid()) {
            form.submit({
                params: {
                    'id': record.get('id')
                },
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
    },

    /**
     * 打开编辑图片素材的form窗口
     * @param view
     * @param record
     */
    showMaterialImageEditWindow: function (view, record) {
        var window = Ext.create('NewsPaper.view.MaterialImageEditWindowView').show();
        window.down('#materialImageEditForm').loadRecord(record);
        window.down('#imageView').setSrc(record.get('image'));
        window.down('#editImageUpload').setRawValue(record.get('image'));
    },

    /**
     * 提交编辑图片素材的form
     */
    materialImageEditFormSubmit: function () {
        var record = Ext.getCmp('materialImageGridView').getSelectionModel().getSelection()[0];
        var window = Ext.getCmp('materialImageEditWindowView');
        var form = window.down('#materialImageEditForm').getForm();
        if (form.isValid()) {
            form.submit({
                params: {
                    'id': record.get('id')
                },
                waitMsg: '正在编辑图片素材...',
                success: function (form, action) {
                    Ext.example.msg('编辑成功', action.result.msg);
                    window.close();
                    var imageStore = Ext.getCmp('materialImageGridView').getStore();
                    imageStore.loadPage(1);
                    var textStore = Ext.getCmp('materialTextGridView').getStore();
                    textStore.loadPage(1);
                },
                failure: function (form, action) {
                    Ext.MessageBox.alert('编辑失败', action.result.msg);
                    window.close();
                }
            });
        }
    },

    /**
     * 重置编辑图片素材的form
     */
    materialImageEditFormReset: function () {
        Ext.getCmp('materialImageEditWindowView').down('#materialImageEditForm').getForm().reset();
    },

    textTagCheckGroupRender: function (checkGroup) {
        // 从服务器取得标签数据
        Ext.Ajax.request({
            url: '/newsPaper/tag/listTag',
            method: 'post',
            success: function (response) {
                var result = Ext.JSON.decode(response.responseText);
                if (result && result.length > 0) {
                    var items = [];
                    for (var i = 0; i < result.length; i++) {
                        var item = {name: 'tagIds', boxLabel: result[i].text, inputValue: result[i].id};
                        items.push(item);
                    }
                    checkGroup.add(items);
                } else {
                    Ext.MessageBox.alert('获取数据失败', '获取标签数据失败!!');
                }
            },
            failure: function (response) {
                var result = Ext.JSON.decode(response.responseText);
                Ext.MessageBox.alert('获取数据失败', result.msg);
            }
        });
    }
})

/**
 * 增加素材类别的业务方法
 */
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

/**
 * 删除素材类别的业务方法
 */
function removeMaterialType() {
    var tree = Ext.getCmp('materialTypeTreeView');
    var node = tree.getSelectionModel().getSelection()[0];

    if (node) {
        Ext.MessageBox.confirm('确认删除', '确认删除此节点?', function (btn) {
            if (btn == 'yes') {
                if (node.data.id == -1) {
                    Ext.MessageBox.alert('错误', '不能删除根节点!');
                    return;
                }
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

/**
 * 删除素材的业务方法
 * @param type 素材类型,'文本'或者'图片'
 */
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
                Ext.Ajax.request({
                    url: '/newsPaper/material/removeMaterial',
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