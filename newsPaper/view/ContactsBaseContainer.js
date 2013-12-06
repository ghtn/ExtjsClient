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
    layout: 'border',
    items: [
        {
            region: 'west',
            title: '通讯录类别',
            animCollapse: true,
            width: 200,
            minWidth: 150,
            maxWidth: 400,
            split: true,
            collapsible: true,
            autoScroll: true,
            items: [
                {
                    xtype: 'contactsTypeContainer'
                }
            ]
        },
        {
            region: 'center',
            title: '通讯录列表',
            autoScroll: true,
            items: [
                {
                    xtype: 'contactsContainer'
                }
            ]
        }
    ]
    /*border: 5,
     style: {
     borderColor: 'red',
     borderStyle: 'solid'
     }*/
});