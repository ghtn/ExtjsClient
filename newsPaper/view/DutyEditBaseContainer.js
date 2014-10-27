/**
 * Created by lihe on 14-6-23.
 */
Ext.define('NewsPaper.view.DutyEditBaseContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.dutyEditBaseContainer',
    layout: 'border',
    items: [
        {
            region: 'center',
            autoScroll: true,
            items: [
                {
                    xtype: 'dutyEditPanelContainer'
                }
            ]
        }
    ]
});