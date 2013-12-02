/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:17
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.store.ContactsTypeTreeStore', {
    extend: 'Ext.data.TreeStore',
    defaultRoodId: 'root',
    model: 'NewsPaper.model.ContactsTypeTreeModel',

    proxy: {
        type: 'ajax',
        url: './data/contactsTypeTree.json',
        reader: 'json',
        autoLoad: true
    }
});