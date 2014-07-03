/**
 * Created by lihe on 14-6-23.
 */
Ext.define('NewsPaper.view.MakePaperContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.makePaperContainer',
    layout: 'border',
    items: [
        {
            region: 'center',
            title: '试题列表',
            autoScroll: true,
            items: [
                {
                    xtype: 'makePaperSubjectGridContainer'
                }
            ]
        }
    ]
});