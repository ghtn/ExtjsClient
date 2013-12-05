/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-4
 * Time: 下午4:44
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.store.ContactsGridStore', {
    extend: 'Ext.data.Store',
    model: 'NewsPaper.model.ContactsGridModel',
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: '/newsPaper/contacts/getContactsByPage',
        reader: {
            type: 'json',
            root: 'items',
            totalProperty: 'total'
        }
    }
    //autoLoad: true
});