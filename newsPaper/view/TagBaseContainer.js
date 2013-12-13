/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:09
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.view.TagBaseContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.tagBaseContainer',
    layout: 'border',
    items: [
        {
            region: 'west',
            title: '标签列表',
            animCollapse: true,
            width: 150,
            minWidth: 120,
            maxWidth: 400,
            split: true,
            collapsible: true,
            autoScroll: true,
            items: [
                {
                    xtype: 'tagTreeView'
                }
            ]
        },
        {
            region: 'center',
            title: '内容列表',
            layout: 'accordion'
        }
    ]
});