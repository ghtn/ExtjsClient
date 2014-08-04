/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:18
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.model.StudentGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},					// ID
        {name: 'number', type: 'string'},			// 学号
        {name: 'name', type: 'string'},				// 姓名
        {name: 'sex', type: 'string'},				// 性别
        {name: 'birthday', type: 'string'},			// 出身日期
        {name: 'card', type: 'string'},				// 身份证号
        {name: 'room', type: 'string'},				// 寝室号
        {name: 'job', type: 'string'},				// 职务
        {name: 'politicsStatus', type: 'string'},	// 政治面貌
        {name: 'address', type: 'string'},			// 家庭住址
        {name: 'postCode', type: 'string'},			// 邮政编码
        {name: 'telphone', type: 'string'},			// 联系电话
        {name: 'comment', type: 'string'}			// 备注
    ]

});