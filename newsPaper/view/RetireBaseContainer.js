/**
 * Created by lihe on 14-6-23.
 */
Ext.define('NewsPaper.view.RetireBaseContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.retireBaseContainer',
    layout: 'border',
    items: [
        {
            region: 'center',
            autoScroll: true,
            items: [
                {
                    xtype: 'retireGridContainer'
                }
            ]
        }
    ]
});