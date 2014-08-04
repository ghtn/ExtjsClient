/**
 * Created by lihe on 14-6-23.
 */
Ext.define('NewsPaper.view.TransferBaseContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.transferBaseContainer',
    layout: 'border',
    items: [
        {
            region: 'center',
            autoScroll: true,
            items: [
                {
                    xtype: 'transferGridContainer'
                }
            ]
        }
    ]
});