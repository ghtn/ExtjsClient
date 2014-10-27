/**
 * Created by lihe on 14-6-23.
 */
Ext.define('NewsPaper.view.JobTypeEditBaseContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobTypeEditBaseContainer',
    layout: 'border',
    items: [
        {
            region: 'center',
            autoScroll: true,
            items: [
                {
                    xtype: 'jobTypeEditPanelContainer'
                }
            ]
        }
    ]
});