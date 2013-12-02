/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-29
 * Time: 下午3:44
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.model.MainTreeModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'text', type: 'string'},
        {name: 'url', type: 'string'}
    ]
});