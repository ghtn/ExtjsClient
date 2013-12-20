/**
 * 标签controller
 * Created by Administrator on 13-12-9.
 */
Ext.define('NewsPaper.controller.TagController', {
    extend: 'Ext.app.Controller',
    views: ['TagBaseContainer', 'TagTreeView', 'TagMaterialTextGridView', 'TagMaterialImageGridView'],
    stores: ['TagTreeStore', 'TagMaterialTextGridStore', 'TagMaterialImageGridStore'],
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
                itemcontextmenu: this.showTreeMenu,
                itemclick: this.showMaterial
            },
            'tagMaterialTextGridView': {
                render: this.tagMaterialTextGridRender,
                itemcontextmenu: this.showTextGridMenu,
                itemdblclick: this.showTagMaterialTextEditWindow
            },
            'tagMaterialImageGridView': {
                render: this.tagMaterialImageGridRender,
                itemcontextmenu: this.showImageGridMenu,
                itemdblclick: this.showTagMaterialImageEditWindow
            },
            '#addTagMaterialText': {
                click: this.addTagMaterialTextClick
            },
            '#tagMaterialTextAddFormSubmit': {
                click: this.tagMaterialTextAddFormSubmit
            },
            '#tagMaterialTextEditFormSubmit': {
                click: this.tagMaterialTextEditFormSubmit
            },
            '#removeTagMaterialText': {
                click: this.removeTagMaterialTextClick
            },
            '#addTagMaterialImage': {
                click: this.addTagMaterialImageClick
            },
            '#removeTagMaterialImage': {
                click: this.removeTagMaterialImageClick
            },
            '#tagMaterialImageAddFormSubmit': {
                click: this.tagMaterialImageAddFormSubmit
            },
            '#addTagImageUpload': {
                change: this.addTagImageUpload
            },
            '#tagMaterialImageEditFormSubmit': {
                click: this.tagMaterialImageEditFormSubmit
            },
            '#tagMaterialTextAddFormReset': {
                click: this.tagMaterialTextAddFormReset
            },
            '#tagMaterialTextEditFormReset': {
                click: this.tagMaterialTextEditFormReset
            },
            '#tagMaterialImageAddFormReset': {
                click: this.tagMaterialImageAddFormReset
            },
            '#tagMaterialImageEditFormReset': {
                click: this.tagMaterialImageEditFormReset
            }
        });
    },

    /**
     * 点击增加标签按钮
     */
    addTagClick: function () {
        addTag();
    },

    /**
     * 点击删除标签按钮
     */
    removeTagClick: function () {
        removeTag();
    },

    /**
     * 编辑标签
     * @param editor 编辑器
     * @param e 选中的记录
     */
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
    },

    /**
     * 点击素材类别时, 分页展示文本素材和图片素材
     */
    showMaterial: function () {
        var textStore = Ext.data.StoreManager.lookup('TagMaterialTextGridStore');
        var imageStore = Ext.data.StoreManager.lookup('TagMaterialImageGridStore');
        textStore.loadPage(1);
        imageStore.loadPage(1);
    },

    /**
     * 文本素材分页显示增加过滤参数
     * @param grid 文本素材grid
     */
    tagMaterialTextGridRender: function (grid) {
        var store = grid.getStore();
        store.on('beforeload', function () {
            var params;
            var tree = Ext.getCmp('tagTreeView');
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
     * @param grid 图片素材grid
     */
    tagMaterialImageGridRender: function (grid) {
        var store = grid.getStore();
        store.on('beforeload', function () {
            var params;
            var tree = Ext.getCmp('tagTreeView');
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
     * 点击增加文本素材按钮
     */
    addTagMaterialTextClick: function () {
        var window = Ext.create('NewsPaper.view.TagMaterialTextAddWindowView').show();

        var tree = Ext.getCmp('tagTreeView');
        var node = tree.getSelectionModel().getSelection()[0];
        var checkGroup = window.down('#textTagCheckGroup');

        // 从服务器取得标签数据
        Ext.Ajax.request({
            url: '/newsPaper/tag/listTag',
            method: 'post',
            success: function (response) {
                var result = Ext.JSON.decode(response.responseText);
                if (result && result.length > 0) {
                    var items = [];
                    var item;
                    // 如果选中一个具体的标签, 在初始化checkGroup时自动勾选对应的标签
                    if (node && node.get('leaf')) {
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].id == node.get('id')) {
                                item = {name: 'tagIds', boxLabel: result[i].text, inputValue: result[i].id, checked: true};
                            } else {
                                item = {name: 'tagIds', boxLabel: result[i].text, inputValue: result[i].id};
                            }
                            items.push(item);
                        }
                    } else {
                        for (var i = 0; i < result.length; i++) {
                            item = {name: 'tagIds', boxLabel: result[i].text, inputValue: result[i].id};
                            items.push(item);
                        }
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
    },

    /**
     * 提交增加文本素材的form
     */
    tagMaterialTextAddFormSubmit: function () {
        var window = Ext.getCmp('tagMaterialTextAddWindowView');
        var form = window.down('#materialTextAddForm').getForm();
        if (form.isValid()) {
            form.submit({
                params: {
                    'type': '文本'
                },
                waitMsg: '正在添加文本素材...',
                success: function (form, action) {
                    Ext.example.msg('添加成功', action.result.msg);
                    window.close();
                    var store = Ext.getCmp('tagMaterialTextGridView').getStore();
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
     * 显示编辑文本素材的窗口
     * @param view
     * @param record 选中的记录
     */
    showTagMaterialTextEditWindow: function (view, record) {
        var window = Ext.create('NewsPaper.view.TagMaterialTextEditWindowView').show();
        window.down('form').loadRecord(record);
        var checkGroup = window.down('#textTagCheckGroup');

        // 从服务器取得标签数据
        Ext.Ajax.request({
            url: '/newsPaper/tag/listTag',
            method: 'post',
            success: function (response) {
                var result = Ext.JSON.decode(response.responseText);
                if (result && result.length > 0) {
                    var items = [];
                    var tagIds = record.get('tagIds');
                    for (var i = 0; i < result.length; i++) {
                        var item;
                        if (tagIds && tagIds.length > 0 && tagIds.indexOf(result[i].id) >= 0) {
                            item = {name: 'tagIds', boxLabel: result[i].text, inputValue: result[i].id, checked: true};
                        } else {
                            item = {name: 'tagIds', boxLabel: result[i].text, inputValue: result[i].id};
                        }

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
    },

    /**
     * 提交编辑文本素材的form
     */
    tagMaterialTextEditFormSubmit: function () {
        var record = Ext.getCmp('tagMaterialTextGridView').getSelectionModel().getSelection()[0];
        var window = Ext.getCmp('tagMaterialTextEditWindowView');
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
                    var textStore = Ext.getCmp('tagMaterialTextGridView').getStore();
                    textStore.loadPage(1);
//                    var imageStore = Ext.getCmp('materialImageGridView').getStore();
//                    imageStore.loadPage(1);
                },
                failure: function (form, action) {
                    Ext.MessageBox.alert('编辑失败', action.result.msg);
                    window.close();
                }
            });
        }
    },

    /**
     * 点击删除文本素材的按钮
     */
    removeTagMaterialTextClick: function () {
        removeTagMaterial('文本');
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
        e.preventDefault();
        e.stopEvent();

        var menu = Ext.create('Ext.menu.Menu', {
            items: [
                {
                    text: '删除',
                    iconCls: 'Delete',
                    handler: function () {
                        removeTagMaterial('文本');
                    }
                }
            ]
        });
        menu.showAt(e.getXY());
    },

    /**
     * 点击增加图片素材的按钮
     */
    addTagMaterialImageClick: function () {
        var window = Ext.create('NewsPaper.view.TagMaterialImageAddWindowView').show();

        var tree = Ext.getCmp('tagTreeView');
        var node = tree.getSelectionModel().getSelection()[0];
        var checkGroup = window.down('#imageTagCheckGroup');

        // 从服务器取得标签数据
        Ext.Ajax.request({
            url: '/newsPaper/tag/listTag',
            method: 'post',
            success: function (response) {
                var result = Ext.JSON.decode(response.responseText);
                if (result && result.length > 0) {
                    var items = [];
                    var item;
                    // 如果选中一个具体的标签, 在初始化checkGroup时自动勾选对应的标签
                    if (node && node.get('leaf')) {
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].id == node.get('id')) {
                                item = {name: 'tagIds', boxLabel: result[i].text, inputValue: result[i].id, checked: true};
                            } else {
                                item = {name: 'tagIds', boxLabel: result[i].text, inputValue: result[i].id};
                            }
                            items.push(item);
                        }
                    } else {
                        for (var i = 0; i < result.length; i++) {
                            item = {name: 'tagIds', boxLabel: result[i].text, inputValue: result[i].id};
                            items.push(item);
                        }
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
    },

    /**
     * 点击删除图片素材的按钮
     */
    removeTagMaterialImageClick: function () {
        removeTagMaterial('图片');
    },

    /**
     * 提交增加图片素材的form
     */
    tagMaterialImageAddFormSubmit: function () {
        var window = Ext.getCmp('tagMaterialImageAddWindowView')
        var form = window.down('#materialImageAddForm').getForm();
        if (form.isValid()) {
            form.submit({
                params: {
                    'type': '图片'
                },
                waitMsg: '添加图片素材中...',
                success: function (form, action) {
                    Ext.example.msg('添加成功', action.result.msg);
                    window.close();
                    var imageStore = Ext.getCmp('tagMaterialImageGridView').getStore();
                    imageStore.reload();
                    //imageStore.loadPage(1);
                    var textStore = Ext.getCmp('tagMaterialTextGridView').getStore();
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
     * 上传图片, 用于增加图片素材
     * @param field
     * @param value
     */
    addTagImageUpload: function (field, value) {
        var window = Ext.getCmp('tagMaterialImageAddWindowView');
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
     * 显示图片素材的编辑窗口
     * @param view
     * @param record
     */
    showTagMaterialImageEditWindow: function (view, record) {
        var window = Ext.create('NewsPaper.view.TagMaterialImageEditWindowView').show();
        window.down('#materialImageEditForm').loadRecord(record);

        // 设置图片预览
        window.down('#imageView').setSrc(record.get('image'));

        // 设置fileinput的值
        window.down('#editImageUpload').setRawValue(record.get('image'));

        // 初始化标签checkgroup,并设置他们的选中状态
        var checkGroup = window.down('#imageTagCheckGroup');

        // 从服务器取得标签数据
        Ext.Ajax.request({
            url: '/newsPaper/tag/listTag',
            method: 'post',
            success: function (response) {
                var result = Ext.JSON.decode(response.responseText);
                if (result && result.length > 0) {
                    var items = [];
                    var tagIds = record.get('tagIds');
                    for (var i = 0; i < result.length; i++) {
                        var item;
                        if (tagIds && tagIds.length > 0 && tagIds.indexOf(result[i].id) >= 0) {
                            item = {name: 'tagIds', boxLabel: result[i].text, inputValue: result[i].id, checked: true};
                        } else {
                            item = {name: 'tagIds', boxLabel: result[i].text, inputValue: result[i].id};
                        }

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
    },

    /**
     * 提交编辑图片素材的form
     */
    tagMaterialImageEditFormSubmit: function () {
        var record = Ext.getCmp('tagMaterialImageGridView').getSelectionModel().getSelection()[0];
        var window = Ext.getCmp('tagMaterialImageEditWindowView');
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
                    var imageStore = Ext.getCmp('tagMaterialImageGridView').getStore();
                    imageStore.loadPage(1);
                    var textStore = Ext.getCmp('tagMaterialTextGridView').getStore();
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
                        removeTagMaterial('图片');
                    }
                }
            ]
        });
        menu.showAt(e.getXY());
    },

    /**
     * 重置增加文本素材的form
     */
    tagMaterialTextAddFormReset: function () {
        Ext.getCmp('tagMaterialTextAddWindowView').down('#materialTextAddForm').getForm().reset();
    },

    /**
     * 重置编辑文本素材的form
     */
    tagMaterialTextEditFormReset: function () {
        Ext.getCmp('tagMaterialTextEditWindowView').down('#materialTextEditForm').getForm().reset();
    },

    /**
     * 重置增加图片素材的form
     */
    tagMaterialImageAddFormReset: function () {
        Ext.getCmp('tagMaterialImageAddWindowView').down('#materialImageAddForm').getForm().reset();
    },

    /**
     * 重置编辑图片素材的form
     */
    tagMaterialImageEditFormReset: function () {
        Ext.getCmp('tagMaterialImageEditWindowView').down('#materialImageEditForm').getForm().reset();
    }
});

/**
 * 增加标签的逻辑
 */
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

/**
 * 删除标签的逻辑
 */
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

/**
 * 删除素材的业务方法
 * @param type 素材类型,'文本'或者'图片'
 */
function removeTagMaterial(type) {
    var textGrid = Ext.getCmp('tagMaterialTextGridView')
    var imageGrid = Ext.getCmp('tagMaterialImageGridView')
    var record;
    if (type == '文本') {
        record = textGrid.getSelectionModel().getSelection()[0];
    } else if (type == '图片') {
        record = imageGrid.getSelectionModel().getSelection()[0];
    } else {
        Ext.MessageBox.alert('错误', '参数错误!');
        return;
    }

    if (record) {
        if (record.get('type') != type) {
            Ext.MessageBox.alert('错误', '素材类型和传入的参数不匹配!!素材类型为 : ' + record.get('type')
                + ",传入的参数为 : " + type);
            return;
        }

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