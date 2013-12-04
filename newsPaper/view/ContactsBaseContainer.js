/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:09
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.view.ContactsBaseContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.contactsBaseContainer',
    layout: 'column',
    items: [
        {
            xtype: 'contactsTypeContainer'
        }
    ],
    border: 5,
    style: {
        borderColor: 'red',
        borderStyle: 'solid'
    }
});