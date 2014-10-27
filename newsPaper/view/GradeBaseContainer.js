/**
 * Created by lihe on 14-6-23.
 */
Ext.define('NewsPaper.view.GradeBaseContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.gradeBaseContainer',
    layout: 'border',
    items: [
        {
            region: 'center',
            autoScroll: true,
            items: [
                {
                    xtype: 'gradeGridContainer'
                }
            ]
        }
    ]
});