/**
 * Created by lihe on 14-6-23.
 */
Ext.define('NewsPaper.view.JobTitleEditBaseContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.jobTitleEditBaseContainer',
    layout: 'border',
    items: [
        {
            region: 'center',
            autoScroll: true,
            items: [
                {
                    xtype: 'jobTitleEditPanelContainer'
                }
            ]
        }
    ]
});