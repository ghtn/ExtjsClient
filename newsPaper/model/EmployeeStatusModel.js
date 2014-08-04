/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:18
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.model.EmployeeStatusModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'value', type: 'int'},
        {name: 'disp', type: 'string'}
    ]

});