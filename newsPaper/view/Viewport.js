/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-29
 * Time: 下午3:28
 * 主页面
 */
Ext.define('NewsPaper.view.Viewport', {
    extend: 'Ext.container.Viewport',
    id: 'viewport',

    layout: {
        type: 'border',
        padding: '0 5 5 5'
    },

    items: [
        {
            id: 'viewport-header',
            xtype: 'box',
            region: 'north',
            height: 50,
            html: '手机报系统'
        },
        {
            region: 'center',
            title: '主页面',
            autoScroll: true,
            items: [
                {
                    xtype: 'mainTabpanelView'
                }
            ]
        },
        {
            region: 'west',
            width: 100,
            title: '功能区',
            animCollapse: true,
            width: 200,
            minWidth: 150,
            maxWidth: 400,
            split: true,
            collapsible: true,
            autoScroll: true,
            items: [
                {
                    xtype: 'mainTreeView'
                }
            ]
        },
        {
            region: 'east',
            width: 100,
            title: '说明',
            animCollapse: true,
            width: 200,
            minWidth: 150,
            maxWidth: 400,
            split: true,
            collapsible: true
        }
    ]
});