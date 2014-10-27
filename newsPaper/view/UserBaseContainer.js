/**
 * Created by lihe on 14-6-23.
 */
Ext.define('NewsPaper.view.UserBaseContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.userBaseContainer',
    layout: 'border',
    items: [
        {
            region: 'center',
            autoScroll: true,
            items: [
                {
                    xtype: 'userGridContainer'
                }
            ]
        }
    ]
});