/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:18
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.model.ScoreGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'idCard', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'deptId', type: 'int'},
        {name: 'deptName', type: 'string'},
        {name: 'empNumber', type: 'string'},
        {name: 'examId', type: 'int'},
        {name: 'examName', type: 'string'},
        {name: 'fullScore', type: 'int'},
        {name: 'passScore', type: 'int'},
        {name: 'examScore', type: 'int'},
        {name: 'pass', type: 'int'},
        {name: 'passDesc', type: 'string'},
        {name: 'errorCount', type: 'int'}
    ]

});