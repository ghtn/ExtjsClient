/**
 * Created by lihe on 14-6-23.
 */
Ext.define('NewsPaper.view.ExamBaseContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.examBaseContainer',
    layout: 'border',
    items: [
        {
            region: 'center',
            title: '考试列表',
            autoScroll: true,
            items: [
                {
                    xtype: 'examGridContainer'
                }
            ]
        }
    ]
});