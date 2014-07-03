/**
 * Created by lihe on 14-6-23.
 */
Ext.define('NewsPaper.view.PaperBaseContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.paperBaseContainer',
    layout: 'border',
    items: [
        {
            region: 'center',
            title: '试卷列表',
            autoScroll: true,
            items: [
                {
                    xtype: 'paperGridContainer'
                }
            ]
        }
    ]
});