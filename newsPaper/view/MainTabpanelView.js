/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 上午10:19
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.view.MainTabpanelView', {
    extend: 'Ext.tab.Panel',
    id: 'mainTabpanelView',
    alias: 'widget.mainTabpanelView',
    plain: true,
    border:false,
    items: [
        {
            id: "tab1",
            title: '普通Tab',
            xtype:'contactsBaseContainer',
            closable: true                  //这个tab可以被关闭
        },
        {
            id: "tab2",
            title: '内容来至div'
        },
        {
            id: "tab3",
            title: 'Ajax Tab'
        },
        {
            id: "tab4",
            title: '事件Tab',
            html: "带事件的Tab。"
        },
        {
            id: "tab5",
            title: '不可用Tab',
            disabled: true,
            html: "不可用的Tab，你是看不到我的。"
        }
    ]
});