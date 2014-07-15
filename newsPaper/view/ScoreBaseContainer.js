/**
 * Created by lihe on 14-6-23.
 */
Ext.define('NewsPaper.view.ScoreBaseContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.scoreBaseContainer',
    layout: 'border',
    items: [
        {
            region: 'center',
            title: '试卷列表',
            autoScroll: true,
            items: [
                {
                    xtype: 'scoreGridContainer'
                }
            ]
        }
    ]
});