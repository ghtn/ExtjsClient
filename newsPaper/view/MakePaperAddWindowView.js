/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.MakePaperAddWindowView', {
    extend: 'Ext.window.Window',
    id: 'makePaperAddWindowView',
    title: '生成试卷',
    modal: true,
    width: 400,
    bodyPadding: 10,
    closable: true,
    layout: 'fit',
    items: {
        xtype: 'form',
        itemId: 'makePaperAddForm',
        bodyPadding: 5,
        url: '/InformationSystemService/paper/add',

        defaultType: 'textfield',
        items: [
            {
                xtype: 'combo',
                fieldLabel: '部门',
                name: 'deptId',
                store: 'DepartmentStore',
                editable: false,
                valueField: 'id',
                displayField: 'name',
                anchor: '100%',
                allowBlank: false,
                blankText: '必须选择部门!'
            },
            {
                fieldLabel: '试卷名称',
                name: 'name',
                allowBlank: false,
                blankText: '试卷名称不能为空!',
                anchor: '100%'
            },
            {
                fieldLabel: '满分',
                name: 'fullScore',
                allowBlank: false,
                blankText: '分值不能为空!',
                regex: /^[1-9][0-9]*$/,
                regexText: '分值必须为正整数!'
            },
            {
                fieldLabel: '及格分',
                name: 'passScore',
                allowBlank: false,
                blankText: '分值不能为空!',
                regex: /^[1-9][0-9]*$/,
                regexText: '分值必须为正整数!'
            },
            {
                fieldLabel: '考试时长(分钟)',
                name: 'examTime',
                allowBlank: false,
                blankText: '考试时长不能为空!',
                regex: /^[1-9][0-9]*$/,
                regexText: '考试时长必须为正整数!'
            }
        ],
        buttons: [
            {
                itemId: 'makePaperAddFormSubmit',
                text: '提交',
                formBind: true,
                disabled: true
            }
        ]
    }

});