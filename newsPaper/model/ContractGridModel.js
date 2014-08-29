/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:18
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.model.ContractGridModel', {
    extend: 'Ext.data.Model',
    fields: [	
        {name: 'id', type: 'int'},				// ID
   		{name: 'number', type: 'string'},		// 证书编号
        {name: 'empNumber', type: 'string'},	// 员工号
        {name: 'name', type: 'string'},			// 姓名
        {name: 'card', type: 'string'},			// 身份证号
        {name: 'entryDate', type: 'string'},	// 录入时间
        {name: 'type', type: 'string'},			// 证书类型
        {name: 'path', type: 'string'},			// 证书保存路径
        {name: 'warn', type: 'string'}			// 预警
    ]
});