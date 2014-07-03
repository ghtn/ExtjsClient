/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:18
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.model.PaperGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'fullScore', type: 'int'},
        {name: 'passScore', type: 'int'},
        {name: 'deptId', type: 'int'},
        {name: 'deptName', type: 'string'},
        {name: 'examTime', type: 'int'},
        {name: 'creator', type: 'string'},
        {name: 'createTime', type: 'string'},
        {name: 'subNum', type: 'int'},
        {name: 'status', type: 'int'},
        {name: 'statusDesc', type: 'string'}
    ]

});