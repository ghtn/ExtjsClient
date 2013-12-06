/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午2:52
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.view.ContactsTypeContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.contactsTypeContainer',
    items: [
        {
            xtype: 'contactsTypeTreeView'
        }
    ]
});