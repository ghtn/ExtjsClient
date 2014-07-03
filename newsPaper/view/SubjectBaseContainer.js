/**
 * Created by lihe on 14-6-23.
 */
Ext.define('NewsPaper.view.SubjectBaseContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.subjectBaseContainer',
    layout: 'border',
    items: [
        {
            region: 'west',
            title: '试题类型',
            animCollapse: true,
            width: 150,
            minWidth: 120,
            maxWidth: 400,
            split: true,
            collapsible: true,
            autoScroll: true,
            items: [
                {
                    xtype: 'subjectTypeTreeView'
                }
            ]
        },
        {
            region: 'center',
            title: '试题列表',
            autoScroll: true,
            items: [
                {
                    xtype: 'subjectGridContainer'
                }
            ]
        }
    ]
});