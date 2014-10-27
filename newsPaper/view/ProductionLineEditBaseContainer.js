/**
 * Created by lihe on 14-6-23.
 */
Ext.define('NewsPaper.view.ProductionLineEditBaseContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.productionLineEditBaseContainer',
    layout: 'border',
    items: [
        {
            region: 'center',
            autoScroll: true,
            items: [
                {
                    xtype: 'productionLineEditPanelContainer'
                }
            ]
        }
    ]
});