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
    model: 'NewsPaper.model.ContactsTypeTreeModel',

    autoLoad: true
    //autoSync: true
});