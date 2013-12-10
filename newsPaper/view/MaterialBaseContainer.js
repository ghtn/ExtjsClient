/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:09
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.view.MaterialBaseContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.materialBaseContainer',
    layout: 'border',
    items: [
        {
            region: 'west',
            title: '素材类别',
            animCollapse: true,
            width: 150,
            minWidth: 120,
            maxWidth: 400,
            split: true,
            collapsible: true,
            autoScroll: true,
            items: [
                {
                    xtype: 'materialTypeTreeView'
                }
            ]
        },
        {
            region: 'center',
            title: '素材列表',
            layout: 'accordion',
            items: [
                {
                    xtype: 'materialTextGridView'
                },
                {
                    xtype: 'materialImageGridView'
                }
            ]
        }
    ]
});