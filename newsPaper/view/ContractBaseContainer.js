/**
 * Created by lihe on 14-6-23.
 */
Ext.define('NewsPaper.view.ContractBaseContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.contractBaseContainer',
    layout: 'border',
    items: [
        {
            region: 'center',
            autoScroll: true,
            items: [
                {
                    xtype: 'contractGridContainer'
                }
            ]
        }
    ]
});