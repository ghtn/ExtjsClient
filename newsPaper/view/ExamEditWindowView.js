/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.ExamEditWindowView', {
    extend: 'Ext.window.Window',
    id: 'examEditWindowView',
    title: '编辑考试',
    modal: true,
    width: 600,
    bodyPadding: 10,
    closable: true,
    layout: 'fit',
    items: {
        xtype: 'form',
        itemId: 'examEditForm',
        bodyPadding: 5,
        url: '/InformationSystemService/exam/update',

        defaultType: 'textfield',
        items: [
            {
                name: 'id',
                hidden: true
            },
            {
                fieldLabel: '考试名称',
                name: 'name',
                allowBlank: false,
                blankText: '考试名称不能为空!',
                anchor: '100%'
            },
            {
                xtype: 'combo',
                fieldLabel: '选择试卷',
                store: 'PaperPublishStore',
                name: 'paperId',
                allowBlank: false,
                blankText: '试卷不能为空!',
                editable: false,
                valueField: 'id',
                displayField: 'name',
                anchor: '100%'
            },
            {
                fieldLabel: '考试地点',
                name: 'place',
                anchor: '100%'
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                fieldLabel: '考试时间',
                anchor: '100%',
                items: [
                    {
                        xtype: 'datefield',
                        itemId: 'examDate',
                        allowBlank: false,
                        blankText: '考试时间不能为空!',
                        format: 'Y-m-d',
                        editable: false
                    },
                    {
                        xtype: 'timefield',
                        itemId: 'examTime',
                        minValue: '8:00',
                        maxValue: '20:00',
                        increment: 30,
                        allowBlank: false,
                        blankText: '考试时间不能为空!',
                        format: 'H:i:s',
                        editable: false
                    }
                ]
            },
            {
                xtype: 'grid',
                itemId: 'examEmpGrid',
                title: '考试人员',
                height: 300,
                name: 'choice',
                store: 'ExamEmpGridStore',
                selModel: {
                    selType: 'checkboxmodel',
                    mode: 'SIMPLE'
                },
                columns: [
                    {xtype: 'rownumberer'},
                    {
                        text: 'id', dataIndex: 'id', flex: 1
                    },
                    {
                        text: '部门',
                        dataIndex: 'deptName',
                        flex: 3
                    },
                    {
                        text: '身份证号',
                        dataIndex: 'card',
                        flex: 3
                    },

                    {
                        text: '姓名',
                        dataIndex: 'name',
                        flex: 2
                    },
                    {
                        text: '年龄',
                        dataIndex: 'age',
                        flex: 1
                    }
                ],
                tbar: [
                    {
                        xtype: 'textfield',
                        itemId: 'idCard',
                        fieldLabel: '&nbsp身份证号',
                        labelWidth: 60
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'name',
                        fieldLabel: '&nbsp姓名',
                        labelWidth: 40
                    },
                    {
                        itemId: 'editFilterExamEmp', xtype: 'button', text: '过滤', iconCls: 'Arrowrefresh'
                    }
                ]
            }
        ],
        buttons: [
            {
                itemId: 'examEditFormSubmit',
                text: '提交',
                formBind: true,
                disabled: true
            }
        ]
    }

});