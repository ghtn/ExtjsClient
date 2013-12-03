/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:18
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.model.ContactsTypeTreeModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'text', type: 'string'},
        {name: 'url', type: 'string'}
    ],
    proxy: {
        type: 'ajax',
        reader: 'json',

        api: {
            create: '/newsPaper/contactsType/addChild',
            read: '/newsPaper/contactsType/getContactsTypeTree',
            update: './data/contactsTypeTree.json',
            destroy: './data/contactsTypeTree.json'
        },
        writer: {
            type: 'json'
        }
    }
});