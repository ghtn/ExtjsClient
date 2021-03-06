/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:18
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.model.MaterialTextGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'title', type: 'string'},
        {name: 'type', type: 'string'},
        {name: 'text', type: 'string'},
        {name: 'childCount', type: 'int'},
        {name: 'tagNameStr', type: 'string'},
        {name: 'tagIds', type: 'auto'},
        {name: 'materialTypeId', type: 'int'},
        {name: 'materialTypeName', type: 'string'}
    ]

});