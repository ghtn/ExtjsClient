/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.MakePaperGenWindowView', {
    extend: 'Ext.window.Window',
    id: 'makePaperGenWindowView',
    title: '生成试卷',
    modal: true,
    width: 400,
    bodyPadding: 10,
    closable: true,
    layout: 'fit',
    items: {
        xtype: 'form',
        itemId: 'makePaperGenForm',
        bodyPadding: 5,
        url: '/InformationSystemService/paper/gen',
        defaultType: 'textfield',
        items: [
            {
                xtype: 'datefield',
                fieldLabel: '题库开始日期',
                name: 'startDate',
                format: 'Y-m-d'
            },
            {
                xtype: 'datefield',
                fieldLabel: '题库截止日期',
                name: 'endDate',
                maxValue: new Date(),
                format: 'Y-m-d'
            },
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
                fieldLabel: '选择题数量',
                name: 'choiceSubNum',
                value: 0,
                regex: /^(0|[1-9][0-9]*)$/,
                regexText: '数量必须为非负整数!'
            },
            {
                fieldLabel: '判断题数量',
                name: 'judgeSubNumber',
                value: 0,
                regex: /^(0|[1-9][0-9]*)$/,
                regexText: '数量必须为非负整数!'
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
                itemId: 'makePaperGenFormSubmit',
                text: '提交',
                formBind: true,
                disabled: true
            }
        ]
    }

});