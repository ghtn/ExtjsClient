/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:18
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.model.MaterialImageGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'title', type: 'string'},
        {name: 'type', type: 'string'},
        {name: 'image', type: 'string'},
        {name: 'parentId', type: 'int'},
        {name: 'parentTitle', type: 'string'},
        {name: 'tagNameStr', type: 'string'},
        {name: 'tagIds', type: 'auto'}
    ]

});