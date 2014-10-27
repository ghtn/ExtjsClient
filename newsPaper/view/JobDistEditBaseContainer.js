/**
 * Created by lihe on 14-6-23.
 */
Ext.define('NewsPaper.view.JobDistEditBaseContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobDistEditBaseContainer',
    layout: 'border',
    items: [
        {
            region: 'center',
            autoScroll: true,
            items: [
                {
                    xtype: 'jobDistEditPanelContainer'
                }
            ]
        }
    ]
});