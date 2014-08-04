/**
 * Created by lihe on 14-6-23.
 */
Ext.define('NewsPaper.view.DimissionBaseContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.dimissionBaseContainer',
    layout: 'border',
    items: [
        {
            region: 'center',
            autoScroll: true,
            items: [
                {
                    xtype: 'dimissionGridContainer'
                }
            ]
        }
    ]
});