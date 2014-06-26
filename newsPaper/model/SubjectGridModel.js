/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:18
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.model.SubjectGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'deptId', type: 'int'},
        {name: 'deptName', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'mark', type: 'int'},
        {name: 'type', type: 'int'},
        {name: 'typeDesc', type: 'string'},
        {name: 'correct', type: 'int'},
        {name: 'creator', type: 'string'},
        {name: 'creatTime', type: 'string'}
    ]

});