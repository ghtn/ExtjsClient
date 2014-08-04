/**
 * Created by lihe on 14-6-23.
 */
Ext.define('NewsPaper.view.RestoralBaseContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.restoralBaseContainer',
    layout: 'border',
    items: [
        {
            region: 'center',
            autoScroll: true,
            items: [
                {
                    xtype: 'restoralGridContainer'
                }
            ]
        }
    ]
});