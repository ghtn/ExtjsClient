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
            }
        })
    },

    addContactsTypeClick: function () {
        // alert('add');
        var tree = Ext.getCmp('contactsTypeTreeView');
        var node = tree.getSelectionModel().getSelection()[0];
        if (node) {
            alert(node.data.id);
            var newNode = Ext.create('NewsPaper.model.ContactsTypeTreeModel', {
                id: node.data.id,
                text: '新添加',
                leaf: true
            });
            /* var proxy = newNode.getProxy();
             proxy.create(new Ext.data.Operation({
             action: 'create',
             params: [
             {id: 1, text: 'yyy'}
             ]
             }));*/
              node.appendChild(newNode);
              var store = tree.store;
             //store.add(newNode);
             //store.sync();
            //newNode.save();
            /*var store = tree.store;
            node.insertChild(newNode);*/
            store.sync();
        } else {
            Ext.MessageBox.alert('错误', '请选择一个节点！');
        }
        //alert(node.root);

    },
    removeContactsTypeClick: function () {
        alert('remove');
    }
});