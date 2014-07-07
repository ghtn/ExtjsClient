/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.ExamAddWindowView', {
    extend: 'Ext.window.Window',
    id: 'examAddWindowView',
    title: '增加考试',
    modal: true,
    width: 500,
    bodyPadding: 10,
    closable: true,
    layout: 'fit',
    items: {
        xtype: 'form',
        itemId: 'examAddForm',
        bodyPadding: 5,
        url: '/InformationSystemService/exam/add',

        defaultType: 'textfield',
        items: [
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
                        blankText: '考试时间不能为空!'
                    }
                ]
            }

        ],
        buttons: [
            {
                itemId: 'examAddFormSubmit',
                text: '提交',
                formBind: true,
                disabled: true
            }
        ]
    }

});