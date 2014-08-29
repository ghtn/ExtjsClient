/**
 * Created by lihe on 14-6-23.
 */
Ext.define('NewsPaper.view.ContractQueryBaseContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.contractQueryBaseContainer',
    layout: 'border',
    items: [
        {
            region: 'center',
            autoScroll: true,
            items: [
                {
                    xtype: 'contractQueryGridContainer'
                }
            ]
        }
    ]
});