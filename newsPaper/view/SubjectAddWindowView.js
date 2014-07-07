/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.SubjectAddWindowView', {
    extend: 'Ext.window.Window',
    id: 'subjectAddWindowView',
    title: '增加试题',
    modal: true,
    width: 600,
    height: 550,
    autoScroll: true,
    closable: true,
    layout: 'fit',
    items: {
        xtype: 'form',
        itemId: 'subjectAddForm',
        bodyPadding: 5,
        url: '/InformationSystemService/subject/add',

        defaultType: 'textfield',
        items: [
            {
                xtype: 'radiogroup',
                fieldLabel: '试题类型',
                defaultType: 'radiofield',
                defaults: {
                    flex: 1
                },
                itemId: 'subjectTypeRadio',
                layout: 'hbox',
                items: [
                    {
                        boxLabel: '选择题',
                        itemId: 'typeRadio1',
                        name: 'type',
                        inputValue: 0,
                        checked: true
                    },
                    {
                        boxLabel: '判断题',
                        itemId: 'typeRadio2',
                        name: 'type',
                        inputValue: 1
                    }
                ]
            },
            {
                fieldLabel: '分值',
                name: 'mark',
                allowBlank: false,
                blankText: '分值不能为空!',
                regex: /^[1-9][0-9]*$/,
                regexText: '分值必须为正整数!'
            },
            {
                xtype: 'textareafield',
                fieldLabel: '题目描述',
                name: 'description',
                height: 150,
                allowBlank: false,
                blankText: '题目描述不能为空!',
                anchor: '100%'
            },
            {
                xtype: 'grid',
                itemId: 'subjectChoice',
                title: '答案',
                height: 230,
                name: 'choice',
                store: 'SubjectAnswerStore',
                columns: [
                    {
                        header: '描述',
                        dataIndex: 'answerDesc',
                        editor: {
                            xtype: 'textfield',
                            allowBlank: false
                        },
                        flex: 1
                    },
                    {
                        xtype: 'checkcolumn',
                        dataIndex: 'correct',
                        text: '正确答案'
                    }
                ],
                selType: 'cellmodel',
                plugins: [
                    Ext.create('Ext.grid.plugin.CellEditing', {
                        clicksToEdit: 1
                    })
                ],
                tbar: [
                    { itemId: 'addSubjectChoice', xtype: 'button', text: '增加', iconCls: 'Add' },
                    { itemId: 'removeSubjectChoice', xtype: 'button', text: '删除', iconCls: 'Delete' }
                ]
            },
            {
                xtype: 'radiogroup',
                fieldLabel: '判断结果',
                itemId: 'judgeRadioGroup',
                defaultType: 'radiofield',
                defaults: {
                    flex: 1
                },
                layout: 'hbox',
                items: [
                    {
                        itemId: 'judgeTrue',
                        boxLabel: '正确',
                        name: 'correct',
                        inputValue: 1,
                        checked: true
                    },
                    {
                        itemId: 'judgeFalse',
                        boxLabel: '错误',
                        name: 'correct',
                        inputValue: 0
                    }
                ]
            }
        ],
        buttons: [
            {
                itemId: 'subjectAddFormSubmit',
                text: '提交',
                formBind: true,
                disabled: true
            },
            {
                itemId: 'subjectAddFormReset',
                text: '重置'
            }
        ]
    }

});