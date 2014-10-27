/**
 * Created by lihe on 14-6-23.
 */
Ext.define('NewsPaper.view.SourceEditBaseContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.sourceEditBaseContainer',
    layout: 'border',
    items: [
        {
            region: 'center',
            autoScroll: true,
            items: [
                {
                    xtype: 'sourceEditPanelContainer'
                }
            ]
        }
    ]
});