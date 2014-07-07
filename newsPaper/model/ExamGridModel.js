/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:18
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.model.ExamGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'deptId', type: 'int'},
        {name: 'deptName', type: 'string'},
        {name: 'paperId', type: 'int'},
        {name: 'paperName', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'place', type: 'string'},
        {name: 'examTime', type: 'string'},
        {name: 'creator', type: 'int'},
        {name: 'creatorName', type: 'string'},
        {name: 'createTime', type: 'string'},
        {name: 'editor', type: 'int'},
        {name: 'editorName', type: 'string'},
        {name: 'editTime', type: 'string'}
    ]
});