/**
 * Created by lihe on 14-6-23.
 */
Ext.define('NewsPaper.view.TransferEmployeeBaseContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.transferEmployeeBaseContainer',
    layout: 'border',
    items: [
        {
            region: 'center',
            autoScroll: true,
            items: [
                {
                    xtype: 'transferEmployeeGridContainer'
                }
            ]
        }
    ]
});