/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:18
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.model.ExamEmpGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'deptId', type: 'int'},
        {name: 'deptName', type: 'string'},
        {name: 'card', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'age', type: 'int'}
    ]
});