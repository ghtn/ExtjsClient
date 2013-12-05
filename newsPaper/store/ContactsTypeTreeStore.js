/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:17
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.store.ContactsTypeTreeStore', {
    extend: 'Ext.data.TreeStore',
    id: 'contactsTypeTreeStore',
    defaultRoodId: 'root',
    root: {
        id: '-1',
        expanded: true,
        text: '通讯录类别'
    },

    model: 'NewsPaper.model.ContactsTypeTreeModel',
    proxy: {
        type: 'ajax',
        reader: 'json',
        url: '/newsPaper/contactsType/getContactsTypeTree'
    },
    autoLoad: true
    //autoSync: true
});