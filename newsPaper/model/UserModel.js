/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:18
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.model.UserModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},					// ID
        {name: 'account', type: 'string'},			// 账号
        {name: 'grade', type: 'string'},			// 权限
        {name: 'type', type: 'string'}				// 类型
    ]

});