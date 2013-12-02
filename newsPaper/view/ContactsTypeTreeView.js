/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:15
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.view.ContactsTypeTreeView', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.contactsTypeTreeView',
    title: '通讯录类别',
    rootVisible: false,
    border: false,
    store: 'ContactsTypeTreeStore'
});