/**
 * Created by lihe on 14-6-23.
 */
Ext.define('NewsPaper.view.ContractRemoveBaseContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.contractRemoveBaseContainer',
    layout: 'border',
    items: [
        {
            region: 'center',
            autoScroll: true,
            items: [
                {
                    xtype: 'contractRemoveGridContainer'
                }
            ]
        }
    ]
});