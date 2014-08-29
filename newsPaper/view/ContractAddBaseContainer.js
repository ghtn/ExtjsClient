/**
 * Created by lihe on 14-6-23.
 */
Ext.define('NewsPaper.view.ContractAddBaseContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.contractAddBaseContainer',
    layout: 'border',
    items: [
        {
            region: 'center',
            autoScroll: true,
            items: [
                {
                    xtype: 'contractAddPanelContainer'
                }
            ]
        }
    ]
});